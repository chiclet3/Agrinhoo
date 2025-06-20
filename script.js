document.addEventListener('DOMContentLoaded', function () {
    // ... (Seu código ScrollReveal permanece o mesmo aqui) ...

    ScrollReveal({
        reset: false,
        distance: '60px',
        duration: 1500,
        easing: 'cubic-bezier(.694,0,.335,1)',
        interval: 100
    });

    ScrollReveal().reveal('.animated-element', {
        origin: 'bottom',
        opacity: 0,
        scale: 0.9
    });

    ScrollReveal().reveal('.animated-item', {
        origin: 'bottom',
        opacity: 0,
        scale: 0.9,
        interval: 200
    });

    ScrollReveal().reveal('.inicio-fundo h1', {
        origin: 'top',
        distance: '40px',
        duration: 1800,
        delay: 500,
        easing: 'ease-out',
        scale: 1
    });

    ScrollReveal().reveal('.esquerda-conteudo p', {
        origin: 'left',
        distance: '50px',
        duration: 1600,
        delay: 700,
        interval: 300
    });

    ScrollReveal().reveal('.img-inicio', {
        origin: 'right',
        distance: '50px',
        duration: 1600,
        delay: 800
    });


    // --- Funcionalidades de Acessibilidade ---
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentarFonteBtn = document.getElementById('aumentar-fonte');
    const diminuirFonteBtn = document.getElementById('diminuir-fonte');
    const lerVozAltaBtn = document.getElementById('ler-voz-alta');
    const body = document.body;

    let fontSize = 1.1;

    botaoAcessibilidade.addEventListener('click', function () {
        opcoesAcessibilidade.classList.toggle('apresenta-lista');
        const expanded = opcoesAcessibilidade.classList.contains('apresenta-lista');
        botaoAcessibilidade.setAttribute('aria-expanded', expanded);
    });

    aumentarFonteBtn.addEventListener('click', function () {
        fontSize += 0.1;
        body.style.fontSize = fontSize + 'rem';
    });

    diminuirFonteBtn.addEventListener('click', function () {
        fontSize -= 0.1;
        if (fontSize < 0.8) fontSize = 0.8;
        body.style.fontSize = fontSize + 'rem';
    });

    // --- Funcionalidade de Leitura em Voz Alta (CÓDIGO MODIFICADO) ---
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance();

        utterance.lang = 'pt-BR';

        // --- FUNÇÃO getPageText() MODIFICADA ---
        function getPageText() {
            let fullText = '';

            // Seções principais do site que contêm conteúdo textual relevante
            const sections = ['#inicio', '#tropicalia', '#campo-cidade', '#galeria', '#contato'];

            sections.forEach(sectionId => {
                const section = document.querySelector(sectionId);
                if (section) {
                    // Seleciona títulos e parágrafos dentro de cada seção
                    const textElements = section.querySelectorAll('h1, h2, h3, p');
                    textElements.forEach(element => {
                        // Certifica-se de pegar o texto visível
                        let text = element.innerText || element.textContent;

                        // Adiciona uma pequena pausa após cada parágrafo ou título
                        fullText += text.trim() + '. ';
                    });
                }
            });

            // Adiciona o texto do footer, se desejar
            const footer = document.querySelector('footer p');
            if (footer) {
                fullText += footer.innerText.trim() + '. ';
            }

            // Remove múltiplos espaços, novas linhas e "..." caso tenha truncado em outros lugares
            return fullText.replace(/\s+/g, ' ').replace(/\.\s*\.\s*\./g, '.').trim();
        }
        // --- FIM DA FUNÇÃO getPageText() MODIFICADA ---


        let isSpeaking = false;

        lerVozAltaBtn.addEventListener('click', function () {
            if (isSpeaking) {
                synth.cancel();
                isSpeaking = false;
                lerVozAltaBtn.textContent = 'Ler em voz alta';
                lerVozAltaBtn.setAttribute('aria-label', 'Ativar leitura em voz alta do conteúdo');
            } else {
                const textToSpeak = getPageText();

                if (textToSpeak) {
                    utterance.text = textToSpeak;
                    synth.speak(utterance);
                    isSpeaking = true;
                    lerVozAltaBtn.textContent = 'Parar leitura';
                    lerVozAltaBtn.setAttribute('aria-label', 'Parar leitura em voz alta');
                } else {
                    console.warn("Nenhum texto encontrado para leitura.");
                }
            }
        });

        utterance.onend = function() {
            isSpeaking = false;
            lerVozAltaBtn.textContent = 'Ler em voz alta';
            lerVozAltaBtn.setAttribute('aria-label', 'Ativar leitura em voz alta do conteúdo');
        };

        // ... (onboundary permanece o mesmo, se tiver) ...

    } else {
        lerVozAltaBtn.disabled = true;
        lerVozAltaBtn.textContent = 'Leitura não suportada';
        lerVozAltaBtn.setAttribute('title', 'Seu navegador não suporta leitura de voz alta.');
        console.warn('Web Speech API não é suportada neste navegador.');
    }
});
