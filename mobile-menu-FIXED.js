* ========================================
   MOBILE MENU JAVASCRIPT - COMPLETE FIXED v2
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // ===== 1. HAMBURGER BUTTON TOGGLE =====
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // ===== 2. CLOSE MENU WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            const isClickInsideNav = navLinks.contains(e.target);
            const isClickOnButton = mobileMenuBtn && mobileMenuBtn.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnButton) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
                body.style.overflow = 'auto';
            }
        }
    });

    // ===== 3. HANDLE DROPDOWN MENUS & CLOSE MENU ON LINK CLICK =====
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const parentLi = this.parentElement;
            const hasDropdown = parentLi && parentLi.classList.contains('has-dropdown');
            
            // ON MOBILE: Toggle dropdown menu instead of closing
            if (hasDropdown && window.innerWidth <= 1024) {
                e.preventDefault();
                parentLi.classList.toggle('active');
            } 
            // ON MOBILE: Close menu only if not a dropdown
            else if (!hasDropdown && navLinks && mobileMenuBtn && window.innerWidth <= 1024) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    // ===== 4. DROPDOWN MENUS - CLICK TO TOGGLE ON MOBILE =====
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                // MOBILE ONLY: Click to toggle
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
                // DESKTOP: Let hover handle it
            });
        }
    });

    // ===== 5. CLOSE MENU ON WINDOW RESIZE =====
    // IMPORTANT: Keep menu closed when resizing from mobile to desktop
    let previousWidth = window.innerWidth;
    
    window.addEventListener('resize', function() {
        const currentWidth = window.innerWidth;
        
        // If resized from mobile to desktop
        if (previousWidth <= 1024 && currentWidth > 1024) {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            body.style.overflow = 'auto';
            
            // Close all dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
        
        previousWidth = currentWidth;
    });

    // ===== 6. CLOSE MENU ON ESCAPE KEY =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            body.style.overflow = 'auto';
            if (mobileMenuBtn) {
                mobileMenuBtn.focus();
            }
        }
    });

    // ===== 7. CLOSE MENU ON SCROLL (Optional - can disable if you want) =====
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only close if scrolled more than 50px
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

    // ===== 8. HEADER GLASS EFFECT ON SCROLL =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 10) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
    });

    // ===== 9. SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                // Calculate header height based on screen size
                let headerHeight = 70; // Default mobile
                if (window.innerWidth > 1024) {
                    headerHeight = 80; // Desktop
                }

                const offsetTop = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking link
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

    // ===== 10. HIDE HAMBURGER ON DESKTOP ON PAGE LOAD =====
    function checkScreenSize() {
        if (mobileMenuBtn) {
            if (window.innerWidth > 1024) {
                mobileMenuBtn.style.display = 'none';
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            } else {
                mobileMenuBtn.style.display = 'flex';
            }
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// ===== HELPER FUNCTION: Close mobile menu programmatically =====
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

// ===== HELPER FUNCTION: Open mobile menu programmatically =====
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
