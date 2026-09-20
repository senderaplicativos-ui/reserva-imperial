#!/bin/bash
BASE="https://loteamentoreservaimperial.com.br"
H="site/html/index.html"

mkdir -p site/images site/css site/js

# extract asset urls
grep -oE 'https?://loteamentoreservaimperial\.com\.br[^"'"'"' )]+\.(jpg|jpeg|png|gif|svg|webp|ico)' "$H" | sort -u > urls-img.txt
grep -oE 'https?://loteamentoreservaimperial\.com\.br[^"'"'"' )]+\.css[^"'"'"' )]*' "$H" | sed 's/?.*//' | sort -u > urls-css.txt
grep -oE 'https?://loteamentoreservaimperial\.com\.br[^"'"'"' )]+\.js[^"'"'"' )]*' "$H" | sed 's/?.*//' | sort -u > urls-js.txt

dl() {
  local list="$1" dir="$2" ok=0 fail=0
  while IFS= read -r u; do
    [ -z "$u" ] && continue
    fn=$(basename "$u")
    if curl -sfL --max-time 60 -o "$dir/$fn" "$u"; then ok=$((ok+1)); else fail=$((fail+1)); echo "FAIL $u"; fi
  done < "$list"
  echo "$dir: ok=$ok fail=$fail"
}

dl urls-img.txt site/images
dl urls-css.txt site/css
dl urls-js.txt site/js
