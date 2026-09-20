from PIL import Image

SRC = r"C:\Work2\reserva-imperial\site\images\banner.jpg"
OUT = r"C:\Work2\reserva-imperial\novo-site\assets\img\hero-mobile.jpg"

im = Image.open(SRC).convert("RGB")
w, h = im.size

# 1) corta fora a faixa de texto chapado do rodape (96x / R$ 842) -> util = 312px
USEFUL = 312
im = im.crop((0, 0, w, USEFUL))

# 2) recorte com o casal centralizado (casal ocupa x 620-910, centro ~765)
LEFT, RIGHT = 556, 984          # 428 de largura, centro 770
im = im.crop((LEFT, 0, RIGHT, USEFUL))

# 3) upscale para nao pixelar em tela retina
FATOR = 2.6
im = im.resize((int(im.width * FATOR), int(im.height * FATOR)), Image.LANCZOS)
im.save(OUT, quality=86, optimize=True, progressive=True)
print("hero-mobile", im.size)
