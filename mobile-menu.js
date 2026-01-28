/* ========================================
   MOBILE MENU JAVASCRIPT
   Handles hamburger menu functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Check if elements exist
    if (!mobileMenuBtn || !navLinks) {
        console.warn('Mobile menu elements not found. Make sure HTML has:');
        console.warn('- <button class="mobile-menu-btn">');
        console.warn('- <ul class="nav-links">');
        return;
    }

    // ========================================
    // TOGGLE MENU ON HAMBURGER CLICK
    // ========================================
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        
        // Update button appearance (optional)
        mobileMenuBtn.classList.toggle('open');
    });

    // ========================================
    // CLOSE MENU WHEN CLICKING ON LINKS
    // ========================================
    const navLinks_all = navLinks.querySelectorAll('a');
    navLinks_all.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
        });
    });

    // ========================================
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // ========================================
    document.addEventListener('click', function(e) {
        // If clicking outside menu and button, close menu
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
        }
    });

    // ========================================
    // CLOSE MENU ON ESC KEY
    // ========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
        }
    });

    // ========================================
    // HANDLE WINDOW RESIZE
    // Close menu if window is resized to desktop size
    // ========================================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // On desktop, always ensure menu is visible
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
        }
    });

    // ========================================
    // PREVENT BODY SCROLL WHEN MENU IS OPEN (Optional)
    // ========================================
    mobileMenuBtn.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            // Menu is now open
            document.body.style.overflow = 'hidden';
        } else {
            // Menu is now closed
            document.body.style.overflow = 'auto';
        }
    });

    // Restore scroll when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
            document.body.style.overflow = 'auto';
        }
    });

    console.log('✓ Mobile menu initialized successfully');
    console.log('- Hamburger button:', mobileMenuBtn);
    console.log('- Navigation menu:', navLinks);
});
