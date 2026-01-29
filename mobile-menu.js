/* ========================================
   MOBILE MENU - COMPLETE FIX
   ======================================== */

/* CRITICAL: Add .active state for hamburger button */
.mobile-menu-btn.active {
    color: var(--color-primary) !important;
    transform: scale(1.1) !important;
}

/* CRITICAL: Ensure nav-links.active works correctly */
.nav-links.active {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
}

/* ========================================
   JAVASCRIPT - CORRECTED VERSION
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // ========================================
    // 1. TOGGLE MOBILE MENU
    // ========================================
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // ========================================
    // 2. CLOSE MENU WHEN CLICKING OUTSIDE
    // ========================================
    document.addEventListener('click', function(e) {
        // Check if menu is open
        if (navLinks && navLinks.classList.contains('active')) {
            // Check if click is outside nav and button
            const isClickInsideNav = navLinks.contains(e.target);
            const isClickOnButton = mobileMenuBtn && mobileMenuBtn.contains(e.target);
            
            // Close if clicked outside
            if (!isClickInsideNav && !isClickOnButton) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
                body.style.overflow = 'auto';
            }
        }
    });

    // ========================================
    // 3. CLOSE MENU WHEN CLICKING ON LINK
    // ========================================
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this is a dropdown toggle
            const parentLi = this.parentElement;
            const hasDropdown = parentLi && parentLi.classList.contains('has-dropdown');
            
            // If it's NOT a dropdown, close the menu
            if (!hasDropdown && navLinks && mobileMenuBtn) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
            
            // If it IS a dropdown, toggle it
            if (hasDropdown) {
                e.preventDefault();
                parentLi.classList.toggle('active');
            }
        });
    });

    // ========================================
    // 4. HANDLE DROPDOWN MENUS
    // ========================================
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on mobile/tablet (≤ 1024px)
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // ========================================
    // 5. CLOSE MENU ON RESIZE TO DESKTOP
    // ========================================
    window.addEventListener('resize', function() {
        // If resizing to desktop, close mobile menu
        if (window.innerWidth > 1024) {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            body.style.overflow = 'auto';
            
            // Remove active state from dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // ========================================
    // 6. CLOSE MENU ON ESCAPE KEY
    // ========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            body.style.overflow = 'auto';
            
            // Focus back on button for accessibility
            if (mobileMenuBtn) {
                mobileMenuBtn.focus();
            }
        }
    });

    // ========================================
    // 7. CLOSE MENU ON SCROLL (50px threshold)
    // ========================================
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only close if scrolled significantly (avoid micro-scrolls)
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
                body.style.overflow = 'auto';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ========================================
    // 8. HEADER GLASS MORPH ON SCROLL (from original)
    // ========================================
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                // Account for fixed header height
                const headerHeight = window.innerWidth <= 768 ? 70 : 80;
                const offsetTop = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('active');
                    }
                    body.style.overflow = 'auto';
                }
            }
        });
    });
});

// ========================================
// HELPER FUNCTION: Close menu programmatically
// ========================================
function closeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
}

// ========================================
// HELPER FUNCTION: Open menu programmatically
// ========================================
function openMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks) {
        navLinks.classList.add('active');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}
