document.addEventListener('DOMContentLoaded', function(){
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade')
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade')
 
    botaoDeAcessibilidade.addEventListener('click', function (){
     botaoDeAcessibilidade.classList.toggle('rotacao-botao');
     opcoesDeAcessibilidade.classList.toggle('apresenta-lista')
 
     const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
     botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado)
   
    })
 
     const aumentaFonteBotao = document.getElementById('aumentar-fonte');
     const diminuiFonteBotao = document.getElementById('diminuir-fonte');
     
     const alternaContraste = document.getElementById('alterna-contraste')
 
     let tamanhoAtualFonte = 1;
 
     aumentaFonteBotao.addEventListener('click', function(){
         tamanhoAtualFonte += 0.1;
         document.body.style.fontSize = `${tamanhoAtualFonte}rem`
 
     })
 
     diminuiFonteBotao.addEventListener('click', function(){
         tamanhoAtualFonte -= 0.1;
         document.body.style.fontSize = `${tamanhoAtualFonte}rem`
 
     })
 
     alternaContraste.addEventListener('click', function(){
         document.body.classList.toggle('alto-contraste')
     })
 
 
 })
 
 ScrollReveal().reveal('#inicio', { delay: 500 });
 ScrollReveal().reveal('#tropicalia', { delay: 500 });
 ScrollReveal().reveal('#galeria', { delay: 500 });
 ScrollReveal().reveal('#contato', { delay: 500 });

 // script.js

// Configuração do ScrollReveal.js
ScrollReveal().reveal('.animated-element', {
    delay: 200,      // Atraso antes da animação começar (em ms)
    distance: '50px', // Distância que o elemento percorre
    origin: 'bottom', // De onde a animação vem (pode ser 'top', 'left', 'right', 'bottom')
    duration: 1000,   // Duração da animação (em ms)
    easing: 'ease-out', // Tipo de transição (ex: 'ease-in', 'ease-out', 'ease-in-out')
    interval: 0,      // Intervalo entre a animação de múltiplos elementos com a mesma classe (em ms)
    reset: false      // Se a animação deve resetar ao rolar para fora da tela (true/false)
});

// Animação específica para o banner (opcional, se quiser uma diferente)
ScrollReveal().reveal('.banner', {
    delay: 100,
    duration: 1200,
    origin: 'top',
    distance: '30px',
    easing: 'ease-in-out',
    opacity: 0
});

// Você pode adicionar mais configurações específicas para outras seções se quiser:
// ScrollReveal().reveal('#inicio .inicio-fundo', {
//     delay: 300,
//     duration: 1200,
//     scale: 0.9, // Exemplo: começar menor e escalar
//     opacity: 0
// });

// ScrollReveal().reveal('#campo-cidade .campo-cidade-item', {
//     delay: 200,
//     duration: 800,
//     interval: 150, // Anima cada item da seção um após o outro
//     origin: 'left',
//     distance: '30px'
// });


// Script de acessibilidade (se você já tiver um)
document.addEventListener('DOMContentLoaded', function() {
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentarFonte = document.getElementById('aumentar-fonte');
    const diminuirFonte = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');
    const body = document.body;

    // Função para alternar visibilidade das opções de acessibilidade
    if (botaoAcessibilidade && opcoesAcessibilidade) {
        botaoAcessibilidade.addEventListener('click', function() {
            opcoesAcessibilidade.classList.toggle('apresenta-lista');
            const expanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true' || false;
            botaoAcessibilidade.setAttribute('aria-expanded', !expanded);
        });
    }

    // Função para aumentar a fonte
    if (aumentarFonte) {
        aumentarFonte.addEventListener('click', function() {
            let fontSize = parseFloat(getComputedStyle(body).fontSize);
            body.style.fontSize = (fontSize + 1) + 'px';
        });
    }

    // Função para diminuir a fonte
    if (diminuirFonte) {
        diminuirFonte.addEventListener('click', function() {
            let fontSize = parseFloat(getComputedStyle(body).fontSize);
            body.style.fontSize = (fontSize - 1) + 'px';
        });
    }

    // Função para alternar alto contraste
    if (alternaContraste) {
        alternaContraste.addEventListener('click', function() {
            body.classList.toggle('alto-contraste');
        });
    }
});