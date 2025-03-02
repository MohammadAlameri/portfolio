/**
 * Components.js
 * This file handles loading of common components like header and footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load the header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Set active navigation link based on current page
                const currentPage = window.location.pathname.split('/').pop();
                
                if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
                    document.getElementById('nav-home').classList.add('active');
                } else if (currentPage === 'projects.html') {
                    document.getElementById('nav-projects').classList.add('active');
                } else if (currentPage === 'privacy-policy.html') {
                    // No active link for policy pages
                } else if (currentPage === 'terms-of-service.html') {
                    // No active link for terms page
                }
                
                // Initialize mobile menu toggle
                const menuBtn = document.querySelector('.menu-btn');
                if (menuBtn) {
                    menuBtn.addEventListener('click', function() {
                        document.querySelector('.navigation').classList.toggle('active');
                    });
                }
                
                // Close menu when clicking a navigation link on mobile
                const navLinks = document.querySelectorAll('.navigation a');
                if (navLinks) {
                    navLinks.forEach(link => {
                        link.addEventListener('click', function() {
                            document.querySelector('.navigation').classList.remove('active');
                        });
                    });
                }
                
                // Initialize theme toggle
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    // Apply the saved theme or system preference on initial load
                    applyTheme();
                    
                    // Toggle theme when clicking the theme toggle button
                    themeToggle.addEventListener('click', function() {
                        document.body.classList.toggle('dark-theme');
                        
                        // Save theme preference to localStorage
                        if (document.body.classList.contains('dark-theme')) {
                            localStorage.setItem('theme', 'dark');
                        } else {
                            localStorage.setItem('theme', 'light');
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerPlaceholder.innerHTML = '<p>Error loading header</p>';
            });
    }
    
    // Load the footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerPlaceholder.innerHTML = '<p>Error loading footer</p>';
            });
    }
});

// Apply theme function
function applyTheme() {
    if (localStorage.getItem('theme') === 'dark' || 
        (localStorage.getItem('theme') !== 'light' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
} 