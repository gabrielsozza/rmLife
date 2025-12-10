document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Controle da Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Efeito de Digitação (Typewriter) no texto do Hero
    const textElement = document.getElementById('typing-text');
    const textToType = "Excelência, ética e compromisso real com pessoas. Transformamos riscos em prevenção.";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            textElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 30); // Velocidade da digitação
        }
    }

    // Inicia a digitação com um pequeno delay para não chocar com a animação de entrada
    setTimeout(typeWriter, 1000);
});


// ... (seu código anterior do nav e typewriter) ...

    // 3. Observer para animações ao rolar a página
    const observerOptions = {
        threshold: 0.1 // Ativa quando 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: Para animar apenas uma vez, descomente a linha abaixo
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem animar
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // ... (seu código anterior do IntersectionObserver) ...

// 4. Lógica do Carrossel de Parceiros (DOM Manipulation)
// 4. Lógica do Carrossel de Parceiros (Otimizada)
function initPartnersCarousel() {
    const track = document.getElementById('slider-track');
    
    // Limpa o track caso tenha algo (evita duplicação se rodar 2x)
    track.innerHTML = '';

    const startImage = 2;
    const endImage = 12;
    
    // Lista de Imagens Originais
    let imagesList = [];
    for (let i = startImage; i <= endImage; i++) {
        imagesList.push(`IMG/${i}.png`);
    }

    // Função auxiliar para criar a tag img
    const createLogoElement = (src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Parceiro RMLife";
        img.loading = "lazy"; // Performance
        img.classList.add('partner-logo');
        return img;
    };

    // 1. Adiciona a lista ORIGINAL
    imagesList.forEach(src => {
        track.appendChild(createLogoElement(src));
    });

    // 2. Adiciona a lista CLONE (Exatamente igual a primeira)
    // Isso garante que temos conteúdo suficiente para o scroll de 50%
    imagesList.forEach(src => {
        const clone = createLogoElement(src);
        clone.setAttribute('aria-hidden', 'true'); // Acessibilidade ignora o clone
        track.appendChild(clone);
    });
}

// Chama a função
initPartnersCarousel();

// Inicializa o carrossel assim que o script rodar
initPartnersCarousel();


// ... (seu código anterior do carrossel) ...

// 5. Configuração do Footer
function initFooter() {
    // Atualiza o ano automaticamente
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Efeito Magnético Opcional nos Botões Sociais (Sênior UI Touch)
    const buttons = document.querySelectorAll('.magnetic');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;

            // Move o botão levemente em direção ao mouse
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Reseta posição quando mouse sai
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

initFooter();

// ... (seu código anterior) ...

// 6. Scroll Spy (Menu Ativo Automático)
function initScrollSpy() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Se o scroll passou de 1/3 da seção, considera ela ativa
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Verifica se o href do link corresponde à seção atual
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });
}

// Inicia o Scroll Spy junto com as outras funções
initScrollSpy();


// ... (código anterior) ...

// 7. Lógica do Modal de Contato
const contactModal = document.getElementById('contact-modal');

// Função para abrir o modal
function openModal(e) {
    if(e) e.preventDefault(); // Impede o link de pular a página
    contactModal.classList.add('active');
}

// Função para fechar o modal
function closeModal() {
    contactModal.classList.remove('active');
}

// Fecha se clicar fora do card (no fundo escuro)
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeModal();
    }
});

// Fecha com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

//Pega TODOS os botões de contato do site e aplicar a função
// Isso garante que qualquer botão que criado (header, hero, footer) funcione.
document.addEventListener('DOMContentLoaded', () => {
    
    // Lista de seletores dos botões que devem abrir o modal
    const triggers = [
        '.btn-contact',       // Botão do Menu
        '.btn-cta-glow',      // Botão do Footer
        '.btn-primary',       // Botão do Hero ("Solicitar Proposta")
        'a[href="#contato"]'  // Qualquer link apontando para #contato
    ];

    triggers.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('click', openModal);
        });
    });
});


// ... (código anterior) ...

// 8. Controle do Menu Mobile (Hamburguer)
function toggleMenu() {
    const nav = document.getElementById('nav-links');
    const icon = document.querySelector('.mobile-menu-icon');
    
    // Alterna a classe 'active' no menu e no ícone
    nav.classList.toggle('active');
    icon.classList.toggle('active');
    
    // Trava o scroll do site quando o menu está aberto (Opcional, mas recomendo)
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
}

// Fecha o menu automaticamente ao clicar em um link (UX Sênior)
document.querySelectorAll('.nav-item, .btn-contact').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('nav-links');
        const icon = document.querySelector('.mobile-menu-icon');
        
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            icon.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});