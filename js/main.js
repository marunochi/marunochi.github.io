/**
 * Main JavaScript for Leo Chen Portfolio Website
 * Handles interactions, animations, and smooth transitions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigationTransitions();
    initializeMosaicInteractions();
    initializeScrollAnimations();
});

/**
 * Initialize entrance animations for page elements
 */
function initializeAnimations() {
    // Animate grid items on homepage
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animate detail page sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';

        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

/**
 * Smooth page transitions when navigating
 */
function initializeNavigationTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only apply transition for internal navigation
            if (href && (href.endsWith('.html') || href === 'index.html')) {
                e.preventDefault();

                // Fade out current page
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';

                // Navigate after fade
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

/**
 * Enhanced mosaic grid interactions
 */
function initializeMosaicInteractions() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        // Track hover state
        item.addEventListener('mouseenter', function() {
            // Scale effect on hover
            this.style.transform = 'scale(1.03)';

            // Dim other items slightly
            gridItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';

            // Restore opacity of all items
            gridItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });

        // Add ripple effect on click
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(93, 173, 226, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Scroll-triggered animations for detail pages
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe cards and timeline items
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Smooth scroll to top functionality
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // ESC key to go back on detail pages
    if (e.key === 'Escape') {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.click();
        }
    }

    // Arrow keys for grid navigation on homepage
    const gridItems = Array.from(document.querySelectorAll('.grid-item'));
    const focusedItem = document.activeElement;

    if (gridItems.includes(focusedItem)) {
        const currentIndex = gridItems.indexOf(focusedItem);
        let nextIndex = currentIndex;

        switch(e.key) {
            case 'ArrowRight':
                nextIndex = Math.min(currentIndex + 1, gridItems.length - 1);
                break;
            case 'ArrowLeft':
                nextIndex = Math.max(currentIndex - 1, 0);
                break;
            case 'ArrowDown':
                nextIndex = Math.min(currentIndex + 2, gridItems.length - 1);
                break;
            case 'ArrowUp':
                nextIndex = Math.max(currentIndex - 2, 0);
                break;
        }

        if (nextIndex !== currentIndex) {
            e.preventDefault();
            gridItems[nextIndex].focus();
        }
    }
});

/**
 * Add CSS animation for ripple effect
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(40);
            opacity: 0;
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Smooth focus styles for accessibility */
    .grid-item:focus {
        outline: 3px solid var(--accent-powder);
        outline-offset: 4px;
    }

    .back-button:focus,
    .cta-button:focus {
        outline: 3px solid var(--accent-powder);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

/**
 * Performance optimization: Debounce scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Track page views (placeholder for analytics)
 */
function trackPageView() {
    const pageName = document.title;
    console.log('Page view:', pageName);
    // Add your analytics tracking code here (Google Analytics, etc.)
}

// Track initial page view
trackPageView();

/**
 * Handle responsive navigation on mobile
 */
function handleMobileNavigation() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // Adjust animations for mobile
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });

            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

// Initialize mobile handling
handleMobileNavigation();

// Re-initialize on window resize
window.addEventListener('resize', debounce(handleMobileNavigation, 250));

/**
 * Add loading state management
 */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Remove any loading indicators
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
});

/**
 * Console message for developers
 */
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #5DADE2;');
console.log('%cInterested in the code? This site was built with vanilla HTML, CSS, and JavaScript.', 'font-size: 14px; color: #2C3E50;');
console.log('%cFeel free to reach out: leo.chen@dauphine.eu', 'font-size: 14px; color: #27AE60;');

/**
 * Accessibility: Skip to main content
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-navy);
        color: var(--off-white);
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add skip link for accessibility
addSkipLink();

/**
 * Lazy load images when they come into viewport
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

/**
 * Print optimization
 */
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToTop,
        debounce,
        trackPageView
    };
}
