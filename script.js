document.addEventListener('DOMContentLoaded', function () {
    // Configuração do ScrollReveal
    // Mais informações em: https://scrollrevealjs.org/
    ScrollReveal({
        reset: false, // Define se a animação deve ser redefinida ao rolar de volta para cima
        distance: '60px', // Distância que o elemento irá "viajar"
        duration: 1500, // Duração da animação em milissegundos
        easing: 'cubic-bezier(.694,0,.335,1)', // Curva de aceleração da animação
        interval: 100 // Intervalo entre animações de múltiplos elementos com a mesma classe
    });

    // Aplica animação a elementos com a classe .animated-element
    // Estas são as seções principais que aparecerão ao rolar
    ScrollReveal().reveal('.animated-element', {
        origin: 'bottom', // A animação vem de baixo
        opacity: 0, // Começa invisível
        scale: 0.9 // Começa ligeiramente menor
    });

    // Aplica animação a elementos com a classe .animated-item
    // Usado para itens dentro das seções, como os cards e as imagens da galeria
    ScrollReveal().reveal('.animated-item', {
        origin: 'bottom', // A animação vem de baixo
        opacity: 0, // Começa invisível
        scale: 0.9, // Começa ligeiramente menor
        interval: 200 // Pequeno atraso entre cada item para um efeito em cascata
    });

    // Animação específica para o título principal no topo da página
    ScrollReveal().reveal('.inicio-fundo h1', {
        origin: 'top', // O título vem de cima
        distance: '40px',
        duration: 1800,
        delay: 500, // Um pequeno atraso para aparecer depois que a página carrega
        easing: 'ease-out',
        scale: 1
    });

    // Animação para os parágrafos dentro da seção de início
    ScrollReveal().reveal('.esquerda-conteudo p', {
        origin: 'left', // Parágrafos vêm da esquerda
        distance: '50px',
        duration: 1600,
        delay: 700, // Atraso após o título
        interval: 300 // Atraso entre cada parágrafo
    });

    // Animação para a imagem na seção de início
    ScrollReveal().reveal('.img-inicio', {
        origin: 'right', // Imagem vem da direita
        distance: '50px',
        duration: 1600,
        delay: 800
    });


    // --- Funcionalidades de Acessibilidade ---
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentarFonteBtn = document.getElementById('aumentar-fonte');
    const diminuirFonteBtn = document.getElementById('diminuir-fonte');
    const body = document.body;

    let fontSize = 1.1; // Tamanho de fonte base em 'rem'

    // Alterna a visibilidade das opções de acessibilidade
    botaoAcessibilidade.addEventListener('click', function () {
        opcoesAcessibilidade.classList.toggle('apresenta-lista');
        const expanded = opcoesAcessibilidade.classList.contains('apresenta-lista');
        botaoAcessibilidade.setAttribute('aria-expanded', expanded);
    });

    // Aumenta o tamanho da fonte
    aumentarFonteBtn.addEventListener('click', function () {
        fontSize += 0.1;
        body.style.fontSize = fontSize + 'rem';
    });

    // Diminui o tamanho da fonte
    diminuirFonteBtn.addEventListener('click', function () {
        fontSize -= 0.1;
        if (fontSize < 0.8) fontSize = 0.8; // Garante que a fonte não fique muito pequena
        body.style.fontSize = fontSize + 'rem';
    });

});
