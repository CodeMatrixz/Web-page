// ========================================
// MOBILE MENU TOGGLE
// Standalone - Won't break existing code
// ========================================
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // Get elements
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('nav .nav-links');
        
        // Check if elements exist
        if (!mobileBtn || !navLinks) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        // Toggle menu function
        function toggleMenu() {
            navLinks.classList.toggle('active');
            
            // Change icon
            if (navLinks.classList.contains('active')) {
                mobileBtn.innerHTML = '✕';
            } else {
                mobileBtn.innerHTML = '☰';
            }
        }
        
        // Button click event
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '☰';
            }
        });
        
        console.log('✅ Mobile menu initialized');
    });
})();
