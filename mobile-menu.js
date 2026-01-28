/* ========================================
   MOBILE MENU JAVASCRIPT - mobile-menu.js
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active')) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
        }
    });

    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            // If it's not a dropdown toggle, close the menu
            if (!this.parentElement.classList.contains('has-dropdown')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    // Handle dropdown menus on mobile
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on mobile/tablet
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns when screen is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.style.overflow = 'auto';
            
            // Remove active state from dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Keyboard accessibility - Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.style.overflow = 'auto';
            mobileMenuBtn.focus();
        }
    });

    // Handle scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Close mobile menu on scroll
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

// ========================================
// HELPER: Close mobile menu programmatically
// ========================================
function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
}
