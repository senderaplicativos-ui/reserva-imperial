/* ============================================================
   Reserva Imperial — Cleber Maciel CRECI 92622
   - mascaras de telefone e moeda
   - monta a mensagem do WhatsApp com tudo que o visitante digitou
   - menu mobile, lightbox da galeria, video facade, revelar ao rolar
   ============================================================ */
(function () {
  'use strict';

  var WHATSAPP = '5522997944778';

  /* ---------- utilidades ---------- */

  function digitos(v) {
    return (v || '').replace(/\D+/g, '');
  }

  function linkWhats(texto) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto);
  }

  function abrirWhats(texto) {
    window.open(linkWhats(texto), '_blank', 'noopener');
  }

  /* ---------- mascara de telefone: (22) 99794-4778 ---------- */

  function formataTelefone(d) {
    d = d.slice(0, 11);
    if (!d) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  function mascaraTelefone(input) {
    function aplica() {
      var noFim = input.selectionStart === input.value.length;
      input.value = formataTelefone(digitos(input.value));
      if (noFim) {
        try {
          input.selectionStart = input.selectionEnd = input.value.length;
        } catch (e) {
          /* alguns navegadores bloqueiam em tipos especificos */
        }
      }
    }
    input.addEventListener('input', aplica);
    input.addEventListener('blur', aplica);
  }

  function telefoneValido(input) {
    var d = digitos(input.value);
    return d.length === 10 || d.length === 11; // fixo ou celular, com DDD
  }

  /* ---------- mascara de moeda: R$ 1.234,56 ---------- */

  function formataMoeda(d) {
    d = d.replace(/^0+/, '');
    if (!d) return '';
    while (d.length < 3) d = '0' + d;
    var centavos = d.slice(-2);
    var reais = d.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'R$ ' + reais + ',' + centavos;
  }

  function mascaraMoeda(input) {
    function aplica() {
      input.value = formataMoeda(digitos(input.value));
      try {
        input.selectionStart = input.selectionEnd = input.value.length;
      } catch (e) {}
    }
    input.addEventListener('input', aplica);
    input.addEventListener('blur', aplica);
  }

  /* ---------- erros de validacao ---------- */

  function marcarErro(campo, msg) {
    var caixa = campo.closest('.campo');
    if (!caixa) return;
    var erro = caixa.querySelector('.erro-msg');
    if (!erro) {
      erro = document.createElement('span');
      erro.className = 'erro-msg';
      erro.id = (campo.id || campo.name) + '-erro';
      caixa.appendChild(erro);
    }
    erro.textContent = msg;
    caixa.classList.add('tem-erro');
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', erro.id);
  }

  function limparErro(campo) {
    var caixa = campo.closest('.campo');
    if (!caixa) return;
    var erro = caixa.querySelector('.erro-msg');
    if (erro) erro.textContent = '';
    caixa.classList.remove('tem-erro');
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
  }

  /* ---------- formulario "Negocie agora" ---------- */

  function initFormulario() {
    var form = document.querySelector('#form-negociar');
    if (!form) return;

    function campo(nome) {
      return form.querySelector('[name="' + nome + '"]');
    }

    var nome = campo('nome');
    var tel = campo('telefone');
    var email = campo('email');
    var orcamento = campo('orcamento');
    var mensagem = campo('mensagem');
    var armadilha = campo('site_url');
    var previa = form.querySelector('#previa-texto');
    var sucesso = form.querySelector('#form-sucesso');

    if (tel) mascaraTelefone(tel);
    if (orcamento) mascaraMoeda(orcamento);

    function marcado(nomeGrupo) {
      var el = form.querySelector('[name="' + nomeGrupo + '"]:checked');
      return el ? el.value : '';
    }

    var TEXTO_PLANO = {
      '5': 'entrada de 5% — parcelas em ate 144x, reajustadas pelo IPCA',
      '10': 'entrada de 10% — parcela fixa em ate 60x',
      duvida: 'quero entender qual dos dois planos cabe melhor no meu orcamento'
    };

    var TEXTO_PREF = {
      whatsapp: 'WhatsApp',
      ligacao: 'ligacao',
      email: 'e-mail',
      visita: 'agendar visita ao stand'
    };

    /* Monta a mensagem com tudo que a pessoa digitou. */
    function montarMensagem() {
      var l = [];
      l.push('Ola, Cleber! Vi o site do Reserva Imperial e quero mais informacoes.');
      l.push('');

      if (nome && nome.value.trim()) l.push('*Nome:* ' + nome.value.trim());
      if (tel && tel.value.trim()) l.push('*Telefone:* ' + tel.value.trim());
      if (email && email.value.trim()) l.push('*E-mail:* ' + email.value.trim());

      var plano = marcado('entrada');
      if (TEXTO_PLANO[plano]) l.push('*Plano:* ' + TEXTO_PLANO[plano]);

      if (orcamento && orcamento.value.trim()) {
        l.push('*Parcela que cabe no orcamento:* ' + orcamento.value.trim());
      }

      var pref = marcado('preferencia');
      if (TEXTO_PREF[pref]) l.push('*Prefiro contato por:* ' + TEXTO_PREF[pref]);

      if (mensagem && mensagem.value.trim()) {
        l.push('');
        l.push('*Mensagem:*');
        l.push(mensagem.value.trim());
      }

      return l.join('\n');
    }

    function atualizarPrevia() {
      if (previa) previa.textContent = montarMensagem();
    }

    form.addEventListener('input', atualizarPrevia);
    form.addEventListener('change', atualizarPrevia);
    atualizarPrevia();

    // limpa o erro assim que a pessoa corrige
    [nome, tel, email].forEach(function (c) {
      if (c) c.addEventListener('input', function () { limparErro(c); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (armadilha && armadilha.value) return; // bot preencheu campo oculto

      var primeiroErro = null;

      if (nome) {
        if (!nome.value.trim()) {
          marcarErro(nome, 'Informe seu nome.');
          primeiroErro = primeiroErro || nome;
        } else {
          limparErro(nome);
        }
      }

      if (tel) {
        if (!telefoneValido(tel)) {
          marcarErro(tel, 'Informe DDD e numero. Ex: (22) 99794-4778');
          primeiroErro = primeiroErro || tel;
        } else {
          limparErro(tel);
        }
      }

      if (email && email.value.trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
          marcarErro(email, 'E-mail invalido.');
          primeiroErro = primeiroErro || email;
        } else {
          limparErro(email);
        }
      }

      if (primeiroErro) {
        primeiroErro.focus();
        return;
      }

      abrirWhats(montarMensagem());

      if (sucesso) {
        sucesso.hidden = false;
        sucesso.setAttribute('tabindex', '-1');
        sucesso.focus();
      }
    });
  }

  /* ---------- botoes dos cartoes de plano ---------- */

  function initPlanos() {
    var textos = {
      '5': 'Ola, Cleber! Quero simular o Reserva Imperial com entrada de 5% e parcelamento em ate 144x.',
      '10': 'Ola, Cleber! Quero simular o Reserva Imperial com entrada de 10% e parcela fixa em ate 60x.'
    };

    Array.prototype.forEach.call(document.querySelectorAll('[data-plano]'), function (btn) {
      var texto = textos[btn.getAttribute('data-plano')];
      if (texto) btn.setAttribute('href', linkWhats(texto));
    });
  }

  /* ---------- menu mobile ---------- */

  function initMenu() {
    var botao = document.querySelector('.menu-btn');
    var nav = document.querySelector('#menu-principal');
    if (!botao || !nav) return;

    botao.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('aberto')) {
        nav.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
        botao.focus();
      }
    });
  }

  /* ---------- cabecalho compacto ao rolar ---------- */

  function initTopo() {
    var topo = document.querySelector('.topo');
    if (!topo) return;
    var esperando = false;
    window.addEventListener(
      'scroll',
      function () {
        if (esperando) return;
        esperando = true;
        window.requestAnimationFrame(function () {
          topo.classList.toggle('compacto', window.scrollY > 80);
          esperando = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------- galeria com lightbox ---------- */

  function initGaleria() {
    var figuras = Array.prototype.slice.call(document.querySelectorAll('.galeria figure'));
    var modal = document.querySelector('#lightbox');
    if (!figuras.length || !modal) return;

    var img = modal.querySelector('img');
    var legenda = modal.querySelector('.lightbox-legenda');
    var btnFechar = modal.querySelector('.lightbox-fechar');
    var btnAnt = modal.querySelector('.lightbox-nav.ant');
    var btnProx = modal.querySelector('.lightbox-nav.prox');
    var atual = 0;
    var focoAnterior = null;

    function mostrar(i) {
      atual = (i + figuras.length) % figuras.length;
      var fig = figuras[atual];
      var miniatura = fig.querySelector('img');
      img.src = fig.getAttribute('data-full') || miniatura.getAttribute('src');
      img.alt = miniatura.getAttribute('alt') || '';
      var cap = fig.querySelector('figcaption');
      legenda.textContent = cap ? cap.textContent : '';
    }

    function abrir(i) {
      focoAnterior = document.activeElement;
      mostrar(i);
      modal.classList.add('aberto');
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      btnFechar.focus();
    }

    function fechar() {
      modal.classList.remove('aberto');
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (focoAnterior) focoAnterior.focus();
    }

    figuras.forEach(function (fig, i) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      var cap = fig.querySelector('figcaption');
      fig.setAttribute('aria-label', 'Ampliar foto: ' + (cap ? cap.textContent : 'galeria'));

      fig.addEventListener('click', function () { abrir(i); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          abrir(i);
        }
      });
    });

    btnFechar.addEventListener('click', fechar);
    btnAnt.addEventListener('click', function () { mostrar(atual - 1); });
    btnProx.addEventListener('click', function () { mostrar(atual + 1); });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) fechar();
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('aberto')) return;
      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowLeft') mostrar(atual - 1);
      if (e.key === 'ArrowRight') mostrar(atual + 1);
    });
  }

  /* ---------- videos: iframe so no clique ---------- */

  function initVideos() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-video]'), function (caixa) {
      function tocar() {
        var id = caixa.getAttribute('data-video');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
        iframe.title = caixa.getAttribute('data-titulo') || 'Video do Reserva Imperial';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.setAttribute('allowfullscreen', '');
        caixa.innerHTML = '';
        caixa.appendChild(iframe);
        caixa.classList.add('tocando');
        caixa.removeAttribute('role');
        caixa.removeAttribute('tabindex');
      }

      caixa.setAttribute('role', 'button');
      caixa.setAttribute('tabindex', '0');
      caixa.addEventListener('click', tocar);
      caixa.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tocar();
        }
      });
    });
  }

  /* ---------- revelar secoes ao rolar ---------- */

  function initRevelar() {
    var alvos = document.querySelectorAll('.revela');
    if (!alvos.length) return;

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(alvos, function (el) { el.classList.add('visivel'); });
      return;
    }

    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            obs.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    Array.prototype.forEach.call(alvos, function (el) { obs.observe(el); });
  }

  /* ---------- ano do rodape ---------- */

  function initAno() {
    var el = document.getElementById('ano');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------ */

  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initTopo();
    initPlanos();
    initFormulario();
    initGaleria();
    initVideos();
    initRevelar();
    initAno();
  });
})();
