/* ========================================
   MOBILE MENU JAVASCRIPT - COMPLETE
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // TOGGLE MENU
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

    // CLOSE MENU WHEN CLICKING OUTSIDE
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

    // CLOSE MENU WHEN CLICKING LINK
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const parentLi = this.parentElement;
            const hasDropdown = parentLi && parentLi.classList.contains('has-dropdown');
            
            if (!hasDropdown && navLinks && mobileMenuBtn) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
            
            if (hasDropdown) {
                e.preventDefault();
                parentLi.classList.toggle('active');
            }
        });
    });

    // HANDLE DROPDOWN MENUS
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // CLOSE MENU ON WINDOW RESIZE
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            body.style.overflow = 'auto';
            
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // CLOSE MENU ON ESCAPE KEY
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            body.style.overflow = 'auto';
            if (mobileMenuBtn) mobileMenuBtn.focus();
        }
    });

    // CLOSE MENU ON SCROLL
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                body.style.overflow = 'auto';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // HEADER GLASS EFFECT ON SCROLL
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 10) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
    });

    // SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = window.innerWidth <= 480 ? 60 : (window.innerWidth <= 1024 ? 70 : 80);
                const offsetTop = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                    body.style.overflow = 'auto';
                }
            }
        });
    });
});

// HELPER: Close mobile menu programmatically
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
