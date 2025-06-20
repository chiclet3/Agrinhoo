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
    const lerVozAltaBtn = document.getElementById('ler-voz-alta'); // NOVO: Botão de leitura em voz alta
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

    // --- Funcionalidade de Leitura em Voz Alta (NOVO CÓDIGO) ---
    if ('speechSynthesis' in window) { // Verifica se a API está disponível no navegador
        const synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance();

        // Configurações iniciais do Utterance
        utterance.lang = 'pt-BR'; // Define o idioma para Português (Brasil)

        // Função para obter todo o texto visível da página
        function getPageText() {
            // Seleciona os elementos principais de conteúdo.
            // Você pode ajustar esses seletores para incluir ou excluir áreas específicas.
            const contentElements = document.querySelectorAll('h1, h2, h3, p, li, figcaption, a.nav-link, footer p');
            let fullText = '';
            contentElements.forEach(element => {
                // Adiciona o texto do elemento, tratando tags para melhor leitura
                let text = element.innerText || element.textContent; // Prefer innerText para conteúdo visível

                // Limita a quantidade de texto para cada elemento, evitando sobrecarga
                if (text.length > 500) {
                    text = text.substring(0, 500) + '...'; // Trunca textos muito longos
                }

                // Adiciona uma pequena pausa entre blocos de texto
                fullText += text.trim() + '. ';
            });
            // Remove múltiplos espaços e novas linhas
            return fullText.replace(/\s+/g, ' ').trim();
        }

        let isSpeaking = false; // Estado para controlar se está falando ou não

        lerVozAltaBtn.addEventListener('click', function () {
            if (isSpeaking) {
                // Se já estiver falando, para a fala
                synth.cancel();
                isSpeaking = false;
                lerVozAltaBtn.textContent = 'Ler em voz alta';
                lerVozAltaBtn.setAttribute('aria-label', 'Ativar leitura em voz alta do conteúdo');
            } else {
                // Se não estiver falando, inicia a fala
                const textToSpeak = getPageText(); // Obtém o texto do conteúdo principal da página

                if (textToSpeak) {
                    utterance.text = textToSpeak;
                    synth.speak(utterance);
                    isSpeaking = true;
                    lerVozAltaBtn.textContent = 'Parar leitura';
                    lerVozAltaBtn.setAttribute('aria-label', 'Parar leitura em voz alta');
                } else {
                    console.warn("Nenhum texto encontrado para leitura.");
                    // Opcional: Avisar o usuário que não há texto para ler.
                }
            }
        });

        // Evento para atualizar o estado do botão quando a fala termina (ou é cancelada)
        utterance.onend = function() {
            isSpeaking = false;
            lerVozAltaBtn.textContent = 'Ler em voz alta';
            lerVozAltaBtn.setAttribute('aria-label', 'Ativar leitura em voz alta do conteúdo');
        };

        utterance.onboundary = function(event) {
            // Opcional: Realçar o texto que está sendo lido.
            // Isso requer uma implementação mais complexa de DOM traversal.
            // Por enquanto, vamos manter simples.
        };

    } else {
        // Se a API não for suportada, desabilita ou oculta o botão
        lerVozAltaBtn.disabled = true;
        lerVozAltaBtn.textContent = 'Leitura não suportada';
        lerVozAltaBtn.setAttribute('title', 'Seu navegador não suporta leitura de voz alta.');
        console.warn('Web Speech API não é suportada neste navegador.');
    }
});
        
