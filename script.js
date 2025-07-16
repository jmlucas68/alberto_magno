// Configuración y variables globales
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Función para el menú hamburguesa
function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Event listeners para el menú
hamburger.addEventListener('click', toggleMenu);

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Función para el cambio de navbar al hacer scroll
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Ajuste por la altura del navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Función para animaciones al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.philosophy-card, .work-item, .timeline-item, .influence-item, .theology-area, .resource-category, .video-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('fade-in-up');
        }
    });
}

// Función para resaltar el enlace activo en el navbar
function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Función para crear efectos de parallax
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Función para contador animado (si se agrega)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Función para mostrar/ocultar elementos según la posición del scroll
function toggleElementsOnScroll() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.pageYOffset > 300) {
        if (backToTop) {
            backToTop.style.display = 'block';
        }
    } else {
        if (backToTop) {
            backToTop.style.display = 'none';
        }
    }
}

// Función para crear botón de regreso al inicio
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: var(--transition);
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(backToTop);
}

// Función para crear efectos de tooltip
function createTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                white-space: nowrap;
                z-index: 1001;
                pointer-events: none;
                transform: translateX(-50%);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
}

// Función para lazy loading de imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para manejar el modo oscuro
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }
    
    // Aplicar modo oscuro guardado
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }
}

// Función para búsqueda en tiempo real
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const content = document.querySelectorAll('section p, section h3, section h4');
            
            searchResults.innerHTML = '';
            
            if (searchTerm.length > 2) {
                content.forEach(element => {
                    if (element.textContent.toLowerCase().includes(searchTerm)) {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result';
                        resultItem.innerHTML = `
                            <h4>${element.closest('section').id}</h4>
                            <p>${element.textContent.substring(0, 100)}...</p>
                        `;
                        resultItem.addEventListener('click', () => {
                            element.scrollIntoView({ behavior: 'smooth' });
                            searchResults.style.display = 'none';
                        });
                        searchResults.appendChild(resultItem);
                    }
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        });
    }
}

// Event listeners principales
window.addEventListener('scroll', () => {
    handleScroll();
    animateOnScroll();
    highlightActiveLink();
    parallaxEffect();
    toggleElementsOnScroll();
});

window.addEventListener('load', () => {
    // Crear elementos dinámicos
    createBackToTopButton();
    createTooltips();
    lazyLoadImages();
    
    // Configurar funcionalidades
    toggleDarkMode();
    setupSearch();
    
    // Animación inicial
    animateOnScroll();
});

// Función para manejar el redimensionamiento de ventana
window.addEventListener('resize', () => {
    // Cerrar menú móvil si se redimensiona
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Función para manejar clicks fuera del menú
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Función para precargar contenido crítico
function preloadContent() {
    const criticalLinks = document.querySelectorAll('a[href*="archive.org"], a[href*="youtube.com"]');
    
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'prefetch';
            preloadLink.href = link.href;
            document.head.appendChild(preloadLink);
        });
    });
}

// Función para manejo de errores
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Error capturado:', e.error);
        // Aquí se podría implementar un sistema de reportes de errores
    });
}

// Función para analytics (opcional)
function trackUserInteraction() {
    // Rastrear clicks en enlaces importantes
    const importantLinks = document.querySelectorAll('a[href*="archive.org"], a[href*="youtube.com"], .resource-link');
    
    importantLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Aquí se podría enviar datos a Google Analytics o similar
            console.log('Link clicked:', e.target.href);
        });
    });
}

// Función para accesibilidad
function enhanceAccessibility() {
    // Manejo de navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Agregar roles ARIA donde sea necesario
    const navItems = document.querySelectorAll('.nav-menu a');
    navItems.forEach(item => {
        item.setAttribute('role', 'menuitem');
    });
}

// Inicialización completa
document.addEventListener('DOMContentLoaded', () => {
    preloadContent();
    handleErrors();
    trackUserInteraction();
    enhanceAccessibility();
    
    // Mensaje de carga completada
    console.log('Sitio web de San Alberto Magno cargado completamente');
});

// Exportar funciones para uso externo si es necesario
window.albertoMagnoSite = {
    scrollToSection,
    toggleMenu,
    animateCounter
};
