const projetos = [
  {
    titulo: 'Neurocor',
    tipo: 'Clínica médica',
    dominio: 'neurocor',
    video: './assets/videos/neurocor-1.mp4',
    poster: './assets/videos/posters/neurocor-1.jpg',
    descricao: 'Site institucional para uma clínica especializada em Lages, apresentando a equipe médica, as especialidades atendidas e a história da clínica, com foco em transmitir confiança e acolhimento.',
    tags: ['WordPress', 'Institucional', 'Saúde'],
    url: null
  },
  {
    titulo: 'Recicla Lages',
    tipo: 'Setor público',
    dominio: 'reciclalages',
    video: './assets/videos/recicla-lages.mp4',
    poster: './assets/videos/posters/recicla-lages.jpg',
    descricao: 'Site da iniciativa da Semasa para modernizar a coleta seletiva em Lages, valorizando os recicladores e informando a população sobre rotas de coleta e notícias do programa.',
    tags: ['WordPress', 'Governo', 'Sustentabilidade'],
    url: null
  },
  {
    titulo: 'Espaço Opção',
    tipo: 'Loja de moda',
    dominio: 'espacoopcao',
    video: './assets/videos/loja-opcao.mp4',
    poster: './assets/videos/posters/loja-opcao.jpg',
    descricao: 'Loja virtual de moda com catálogo de roupas, calçados e artigos em couro, carrinho de compras, busca de produtos e banners de coleção em destaque.',
    tags: ['WordPress', 'E-commerce', 'Varejo'],
    url: null
  },
  {
    titulo: 'Expedições',
    tipo: 'Turismo de aventura',
    dominio: 'expedicoes',
    video: './assets/videos/expedicoes.mp4',
    poster: './assets/videos/posters/expedicoes.jpg',
    descricao: 'Site para uma empresa de expedições nacionais e internacionais, com vitrine de roteiros, agenda de saídas, galeria, depoimentos e perguntas frequentes.',
    tags: ['WordPress', 'Turismo', 'Institucional'],
    url: null
  },
  {
    titulo: 'Orquestra',
    tipo: 'Projeto cultural',
    dominio: 'orquestra',
    video: './assets/videos/orquestra.mp4',
    poster: './assets/videos/posters/orquestra.jpg',
    descricao: 'Site de um projeto de orquestra com páginas para a instituição, programação pedagógica e artística, impacto social, patrocinadores e mídia.',
    tags: ['WordPress', 'Cultura', 'Institucional'],
    url: null
  },
  {
    titulo: 'ASFAG Controle de Pragas',
    tipo: 'Prestação de serviços',
    dominio: 'asfag',
    video: './assets/videos/asfag-controle-pragas.mp4',
    poster: './assets/videos/posters/asfag-controle-pragas.jpg',
    descricao: 'Site para uma empresa de controle de pragas, com apresentação dos serviços, produtos, parceiros, um guia de insetos e dicas de prevenção.',
    tags: ['WordPress', 'Serviços', 'Institucional'],
    url: null
  },
  {
    titulo: 'Plano Funeral',
    tipo: 'Planos funerários',
    dominio: 'planofuneral',
    video: './assets/videos/plano-funeral.mp4',
    poster: './assets/videos/posters/plano-funeral.jpg',
    descricao: 'Site para uma empresa de planos funerários, com comunicação acolhedora, apresentação dos serviços e contato rápido via WhatsApp.',
    tags: ['WordPress', 'Serviços', 'Institucional'],
    url: null
  },
];

const papeis = [
  'Desenvolvedor de Jogos · Lua',
  'Desenvolvedor Web · WordPress',
  'Estudante Full-stack · C# e .NET'
];

const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const semHover = window.matchMedia('(hover: none)').matches;

function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');

  toast.textContent = mensagem;
  toast.classList.add('visivel');

  clearTimeout(mostrarToast.timer);
  mostrarToast.timer = setTimeout(() => toast.classList.remove('visivel'), 2600);
}

/* ---------- Navegação ---------- */
function iniciarMenu() {
  const btnMenu = document.getElementById('btnMenu');
  const menu = document.getElementById('menu');

  function alternarMenu(abrir) {
    menu.classList.toggle('aberto', abrir);
    btnMenu.setAttribute('aria-expanded', abrir);
  }

  btnMenu.addEventListener('click', () => alternarMenu(!menu.classList.contains('aberto')));

  for (let link of menu.querySelectorAll('a'))
    link.addEventListener('click', () => alternarMenu(false));
}

function iniciarScroll() {
  const topo = document.getElementById('topo');
  const progresso = document.getElementById('progressoScroll');

  function atualizar() {
    const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight;

    topo.classList.toggle('rolado', window.scrollY > 20);
    progresso.style.transform = `scaleX(${alturaRolavel > 0 ? window.scrollY / alturaRolavel : 0})`;
  }

  window.addEventListener('scroll', atualizar, { passive: true });
  atualizar();

  const linksMenu = document.querySelectorAll('.nav-links a');

  const observador = new IntersectionObserver((entradas) => {
    for (let entrada of entradas) {
      if (!entrada.isIntersecting)
        continue;

      for (let link of linksMenu)
        link.classList.toggle('ativo', link.getAttribute('href') === `#${entrada.target.id}`);
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  for (let secao of document.querySelectorAll('main section[id]'))
    observador.observe(secao);
}

/* ---------- Hero ---------- */
function iniciarDigitacao() {
  const alvo = document.getElementById('textoDigitado');

  if (semMovimento) {
    alvo.textContent = papeis[0];
    return;
  }

  let indicePapel = 0;
  let indiceLetra = 0;
  let apagando = false;

  function passo() {
    const papel = papeis[indicePapel];

    indiceLetra += apagando ? -1 : 1;
    alvo.textContent = papel.slice(0, indiceLetra);

    let espera = apagando ? 35 : 70;

    if (!apagando && indiceLetra === papel.length) {
      apagando = true;
      espera = 1800;
    } else if (apagando && indiceLetra === 0) {
      apagando = false;
      indicePapel = (indicePapel + 1) % papeis.length;
      espera = 400;
    }

    setTimeout(passo, espera);
  }

  passo();
}

function iniciarCanvasPixels() {
  const canvas = document.getElementById('canvasPixels');
  const contexto = canvas.getContext('2d');
  const cores = ['#ff3ea5', '#a855f7', '#22d3ee', '#a3e635'];
  const mouse = { x: 0, y: 0 };

  let pixels = [];
  let largura = 0;
  let altura = 0;
  let visivel = true;

  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    largura = canvas.offsetWidth;
    altura = canvas.offsetHeight;
    canvas.width = largura * dpr;
    canvas.height = altura * dpr;
    contexto.setTransform(dpr, 0, 0, dpr, 0, 0);

    const quantidade = Math.round((largura * altura) / 16000);

    pixels = Array.from({ length: quantidade }, () => ({
      x: Math.random() * largura,
      y: Math.random() * altura,
      tamanho: 2 + Math.floor(Math.random() * 4),
      velocidade: .15 + Math.random() * .45,
      profundidade: .2 + Math.random() * .8,
      fase: Math.random() * Math.PI * 2,
      cor: cores[Math.floor(Math.random() * cores.length)]
    }));
  }

  function desenhar(tempo) {
    contexto.clearRect(0, 0, largura, altura);

    for (let pixel of pixels) {
      if (!semMovimento) {
        pixel.y -= pixel.velocidade;

        if (pixel.y < -10) {
          pixel.y = altura + 10;
          pixel.x = Math.random() * largura;
        }
      }

      const deslocX = mouse.x * 18 * pixel.profundidade;
      const deslocY = mouse.y * 18 * pixel.profundidade;

      contexto.globalAlpha = .25 + Math.abs(Math.sin(tempo / 1200 + pixel.fase)) * .6;
      contexto.fillStyle = pixel.cor;
      contexto.fillRect(Math.round(pixel.x + deslocX), Math.round(pixel.y + deslocY), pixel.tamanho, pixel.tamanho);
    }

    if (visivel && !semMovimento)
      requestAnimationFrame(desenhar);
  }

  window.addEventListener('resize', redimensionar);
  window.addEventListener('mousemove', (evento) => {
    mouse.x = evento.clientX / window.innerWidth - .5;
    mouse.y = evento.clientY / window.innerHeight - .5;
  }, { passive: true });

  new IntersectionObserver(([entrada]) => {
    const estavaVisivel = visivel;
    visivel = entrada.isIntersecting;

    if (visivel && !estavaVisivel && !semMovimento)
      requestAnimationFrame(desenhar);
  }).observe(canvas);

  redimensionar();
  requestAnimationFrame(desenhar);
}

/* ---------- Animações de entrada ---------- */
function iniciarReveal() {
  const observador = new IntersectionObserver((entradas) => {
    for (let entrada of entradas) {
      if (!entrada.isIntersecting)
        continue;

      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  }, { threshold: .15 });

  for (let elemento of document.querySelectorAll('.reveal'))
    observador.observe(elemento);
}

function iniciarSpotlightSkills() {
  for (let card of document.querySelectorAll('.skill-card')) {
    card.addEventListener('pointermove', (evento) => {
      const area = card.getBoundingClientRect();

      card.style.setProperty('--mx', `${evento.clientX - area.left}px`);
      card.style.setProperty('--my', `${evento.clientY - area.top}px`);
    });
  }
}

/* ---------- Projetos ---------- */
function criarCardProjeto(projeto) {
  const card = document.createElement('article');

  card.className = 'projeto-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Abrir projeto ${projeto.titulo}`);

  const midia = projeto.video
    ? `<video muted loop playsinline preload="none" poster="${projeto.poster}" src="${projeto.video}"></video>`
    : `<img src="${projeto.imagem}" alt="" loading="lazy" />`;

  card.innerHTML = `
    <div class="browser-barra">
      <span class="ponto vermelho"></span><span class="ponto amarelo"></span><span class="ponto verde"></span>
      <span class="browser-url">${projeto.dominio}</span>
    </div>
    <div class="projeto-midia">
      ${midia}
      <span class="projeto-play">▶ ${semHover ? 'Toque para ver' : 'Passe o mouse'}</span>
    </div>
    <div class="projeto-info">
      <span class="projeto-tipo">${projeto.tipo}</span>
      <h3>${projeto.titulo}</h3>
      <p>${projeto.descricao}</p>
      <ul class="tags">${projeto.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
    </div>
  `;

  const video = card.querySelector('video');
  const imagem = card.querySelector('.projeto-midia img');

  function iniciarPreview() {
    card.classList.add('tocando');

    if (video)
      video.play().catch(() => {});
    else
      imagem.src = projeto.gif;
  }

  function pararPreview() {
    card.classList.remove('tocando');

    if (video)
      video.pause();
    else
      imagem.src = projeto.imagem;
  }

  card.iniciarPreview = iniciarPreview;
  card.pararPreview = pararPreview;

  if (!semHover) {
    card.addEventListener('mouseenter', iniciarPreview);
    card.addEventListener('mouseleave', pararPreview);
  }

  card.addEventListener('click', () => abrirModalProjeto(projeto));
  card.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Enter' && evento.key !== ' ')
      return;

    evento.preventDefault();
    abrirModalProjeto(projeto);
  });

  return card;
}

function renderizarProjetos() {
  const grade = document.getElementById('gradeProjetos');

  for (let projeto of projetos)
    grade.appendChild(criarCardProjeto(projeto));

  // Em telas de toque não existe hover: o preview toca quando o card está visível
  if (semHover && !semMovimento) {
    const observador = new IntersectionObserver((entradas) => {
      for (let entrada of entradas) {
        if (entrada.isIntersecting)
          entrada.target.iniciarPreview();
        else
          entrada.target.pararPreview();
      }
    }, { threshold: .7 });

    for (let card of grade.children)
      observador.observe(card);
  }
}

function abrirModalProjeto(projeto) {
  const modal = document.getElementById('modalProjeto');
  const modalMidia = document.getElementById('modalMidia');
  const modalLinks = document.getElementById('modalLinks');

  modalMidia.innerHTML = projeto.video
    ? `<video src="${projeto.video}" poster="${projeto.poster}" autoplay muted loop playsinline controls></video>`
    : `<img src="${projeto.gif}" alt="Demonstração do projeto ${projeto.titulo}" />`;

  document.getElementById('modalTipo').textContent = projeto.tipo;
  document.getElementById('modalTitulo').textContent = projeto.titulo;
  document.getElementById('modalDescricao').textContent = projeto.descricao;
  document.getElementById('modalTags').innerHTML = projeto.tags.map((tag) => `<li>${tag}</li>`).join('');

  modalLinks.innerHTML = '';

  if (projeto.url)
    modalLinks.insertAdjacentHTML('beforeend', `<a class="btn btn-primario" href="${projeto.url}" target="_blank" rel="noopener">Visitar site</a>`);

  if (projeto.repositorio)
    modalLinks.insertAdjacentHTML('beforeend', `<a class="btn btn-secundario" href="${projeto.repositorio}" target="_blank" rel="noopener">Repositório</a>`);

  modal.showModal();
}

function iniciarModal() {
  const modal = document.getElementById('modalProjeto');

  document.getElementById('btnFecharModal').addEventListener('click', () => modal.close());

  // Clique fora do conteúdo (no backdrop) fecha o modal
  modal.addEventListener('click', (evento) => {
    if (evento.target === modal)
      modal.close();
  });

  modal.addEventListener('close', () => {
    document.getElementById('modalMidia').innerHTML = '';
  });
}

/* ---------- Contato ---------- */
function iniciarCopiarEmail() {
  const botao = document.getElementById('btnCopiarEmail');

  botao.addEventListener('click', async () => {
    const email = botao.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      mostrarToast('✔ E-mail copiado!');
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

/* ---------- Easter egg ---------- */
function iniciarKonami() {
  const sequencia = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let posicao = 0;

  document.addEventListener('keydown', (evento) => {
    const tecla = evento.key.toLowerCase();

    posicao = tecla === sequencia[posicao] ? posicao + 1 : (tecla === sequencia[0] ? 1 : 0);

    if (posicao < sequencia.length)
      return;

    posicao = 0;

    const ativo = document.body.classList.toggle('modo-retro');
    mostrarToast(ativo ? '🕹️ Modo retrô ativado! +30 vidas' : 'Modo retrô desativado');
  });
}

function main() {
  document.getElementById('anoAtual').textContent = new Date().getFullYear();

  iniciarMenu();
  iniciarScroll();
  iniciarDigitacao();
  iniciarCanvasPixels();
  renderizarProjetos();
  iniciarModal();
  iniciarReveal();
  iniciarSpotlightSkills();
  iniciarCopiarEmail();
  iniciarKonami();
}

document.addEventListener('DOMContentLoaded', main);
