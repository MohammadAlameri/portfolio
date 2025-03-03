/**
 * Components.js
 * This file handles loading of common components like header and footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    loadHeader();
    
    // Load Footer
    loadFooter();
    
    // Apply theme based on localStorage
    applyTheme();
    
    // Set flag to indicate components.js has loaded
    window.componentsLoaded = true;
    
    initTestimonialSlider();
});

function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('components/header.html')
            .then(response => response.text())
            .then(html => {
                headerPlaceholder.innerHTML = html;
                
                // Initialize mobile menu after header is loaded
                initMobileMenu();
                
                // Initialize theme toggle after header is loaded
                initThemeToggle();
                
                // Initialize language toggle after header is loaded
                initLanguageToggle();
                
                // Set active navigation link
                setActiveNavLink();
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }
}

function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerPlaceholder.innerHTML = html;
                
                // Apply any footer-specific initializations here
                // For example, adding event listeners to footer elements
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            document.querySelector('.navigation').classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.navigation').classList.remove('active');
        });
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        
        if (currentPage === linkHref || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (link.getAttribute('href').includes('#') && window.location.href.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function initLanguageToggle() {
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        const langOptions = langToggle.querySelectorAll('.lang-option');
        const currentLang = localStorage.getItem('language') || 'en';
        
        // Set initial state
        if (currentLang === 'ar') {
            langToggle.classList.add('ar-active');
        }
        
        langOptions.forEach(option => {
            if (option.getAttribute('data-lang') === currentLang) {
                option.classList.add('active');
            }
            
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                
                // Use the forceLanguage function if available
                if (typeof window.forceLanguage === 'function') {
                    window.forceLanguage(lang);
                } else if (typeof applyLanguage === 'function') {
                    applyLanguage(lang);
                }
            });
        });
    }
}

function applyTheme() {
    if (localStorage.getItem('theme') === 'dark' || 
        (localStorage.getItem('theme') !== 'light' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    nextButton.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    slides.forEach(slide => {
        slide.addEventListener('mouseenter', stopSlideShow);
        slide.addEventListener('mouseleave', startSlideShow);
    });

    showSlide(currentSlide);
    startSlideShow();
} 