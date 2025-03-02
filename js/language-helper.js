/**
 * language-helper.js
 * 
 * A utility script to ensure consistent language handling across all pages.
 * This should be included in every page before other scripts.
 */

// Immediately set the page direction based on saved language preference
(function() {
    // Get the stored language or default to English
    const storedLanguage = localStorage.getItem('language') || 'en';
    
    // Set HTML direction attribute based on language
    document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Set the lang attribute as well
    document.documentElement.lang = storedLanguage;
    
    // Add a utility function to the window object for other scripts to use
    window.ensureLanguageConsistency = function() {
        // This will be called after components are loaded
        const checkComponentsLoaded = setInterval(function() {
            if (document.getElementById('language-toggle')) {
                clearInterval(checkComponentsLoaded);
                
                // Reinitialize language functionality
                const currentLang = localStorage.getItem('language') || 'en';
                if (typeof applyLanguage === 'function') {
                    applyLanguage(currentLang);
                }
                if (typeof setupLanguageToggle === 'function') {
                    setupLanguageToggle();
                }
            }
        }, 100);
    };
    
    // Function to force a specific language
    window.forceLanguage = function(language) {
        if (language !== 'en' && language !== 'ar') {
            console.error('Invalid language specified. Only "en" and "ar" are supported.');
            return;
        }
        
        localStorage.setItem('language', language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        
        // If translations.js is loaded and components are ready
        if (typeof applyLanguage === 'function') {
            applyLanguage(language);
        } else {
            // Wait for translations.js to load
            const checkTranslationsLoaded = setInterval(function() {
                if (typeof applyLanguage === 'function') {
                    clearInterval(checkTranslationsLoaded);
                    applyLanguage(language);
                }
            }, 100);
        }
    };
    
    // When the DOM is fully loaded, set up the language consistency
    document.addEventListener('DOMContentLoaded', function() {
        window.ensureLanguageConsistency();
    });
})(); 