// Enhanced JavaScript Scroll Animations - Updated for Index Page
// Skill cards remain visible, only section-level animations

document.addEventListener('DOMContentLoaded', function() {
    // Reduced initial blank screen to 0.5 seconds
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in-out';
        document.body.style.opacity = '1';
    }, 500);
    
    // Enhanced animation functions with more pronounced effects
    function scaleFromCenter(element, duration = 900) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.3)';
        element.style.transformOrigin = 'center center';
        
        let start = performance.now();
        
        function animate(currentTime) {
            let elapsed = currentTime - start;
            let progress = Math.min(elapsed / duration, 1);
            
            // More dramatic easing function (ease-out-back)
            let easeOut = 1 - Math.pow(1 - progress, 3);
            
            element.style.opacity = progress;
            element.style.transform = `scale(${0.3 + (0.7 * easeOut)})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = 'scale(1)'; // Ensure final state
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    function slideAndScale(element, fromDirection = 'left', duration = 1100) {
        const distance = fromDirection === 'left' ? -80 : 80;
        element.style.opacity = '0';
        element.style.transform = `translateX(${distance}px) scale(0.7)`;
        element.style.transformOrigin = 'center center';
        
        let start = performance.now();
        
        function animate(currentTime) {
            let elapsed = currentTime - start;
            let progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing (no elastic/overshoot)
            let easeOut = 1 - Math.pow(1 - progress, 3);
            
            element.style.opacity = easeOut;
            element.style.transform = `translateX(${distance - (distance * easeOut)}px) scale(${0.7 + (0.3 * easeOut)})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = 'translateX(0) scale(1)';
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Exit animation functions - stylish fade-out effects
    function shrinkToCenter(element, duration = 600) {
        let start = performance.now();
        const initialOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
        const initialScale = 1;
        
        function animate(currentTime) {
            let elapsed = currentTime - start;
            let progress = Math.min(elapsed / duration, 1);
            
            // Ease-in for exit (opposite of entrance)
            let easeIn = progress * progress * progress;
            
            element.style.opacity = initialOpacity * (1 - easeIn);
            element.style.transform = `scale(${initialScale * (1 - easeIn * 0.8)})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    function slideAndShrink(element, toDirection = 'left', duration = 600) {
        let start = performance.now();
        const distance = toDirection === 'left' ? -60 : 60;
        const initialOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
        
        function animate(currentTime) {
            let elapsed = currentTime - start;
            let progress = Math.min(elapsed / duration, 1);
            
            let easeIn = progress * progress;
            
            element.style.opacity = initialOpacity * (1 - easeIn);
            element.style.transform = `translateX(${distance * easeIn}px) scale(${1 - easeIn * 0.3})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Enhanced Intersection Observer - ONLY FOR MAIN SECTIONS (not individual cards)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                // Element is entering viewport - apply entrance animations
                if (element.classList.contains('tomGriffin')) {
                    scaleFromCenter(element, 1200);
                } else if (element.id === 'webDevelopment') {
                    slideAndScale(element, 'left', 1100);
                } else if (element.id === 'cyberSecurity') {
                    slideAndScale(element, 'right', 1100);
                }
            } else {
                // Element is leaving viewport - apply exit animation
                if (element.classList.contains('tomGriffin')) {
                    shrinkToCenter(element, 700);
                } else if (element.id === 'webDevelopment') {
                    slideAndShrink(element, 'left', 650);
                } else if (element.id === 'cyberSecurity') {
                    slideAndShrink(element, 'right', 650);
                }
            }
        });
    }, observerOptions);
    
    // Only animate the MAIN SECTIONS - NOT the individual listBox cards
    const sectionsToAnimate = [
        document.querySelector('.tomGriffin'),
        document.querySelector('#webDevelopment'),
        document.querySelector('#cyberSecurity')
    ].filter(el => el !== null);
    
    // Set up observer for main sections only
    sectionsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        
        setTimeout(() => {
            element.style.visibility = 'visible';
            observer.observe(element);
        }, 700 + (index * 30));
    });
    
    // Make sure listBox cards are always visible (no animations)
    const allListBoxes = document.querySelectorAll('.listBox');
    allListBoxes.forEach(box => {
        box.style.opacity = '1';
        box.style.visibility = 'visible';
        box.style.transform = 'none';
    });
    
    // Header and footer stay fixed - just fade in once
    const fixedElements = [
        document.querySelector('header'),
        document.querySelector('footer')
    ].filter(el => el !== null);
    
    fixedElements.forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease-out';
            element.style.opacity = '1';
        }, 600 + (index * 200));
    });
    
    // Enhanced smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 120;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function smoothScroll(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    const ease = progress < 0.5 ? 
                        2 * progress * progress : 
                        1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < 1) {
                        requestAnimationFrame(smoothScroll);
                    }
                }
                
                requestAnimationFrame(smoothScroll);
            }
        });
    });
});

// Subtle link animations and styling
document.addEventListener('DOMContentLoaded', function() {
    // Style all links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // Remove default underline
        link.style.textDecoration = 'none';
        link.style.transition = 'all 0.3s ease';
        link.style.position = 'relative';
        
        // Add subtle hover effects
        link.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline';
            this.style.transform = 'translateY(-1px)';
            this.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
            this.style.transform = 'translateY(0)';
            this.style.textShadow = 'none';
        });
    });
    
    // Enhanced hover effects for list boxes - moderate lift and scale
    const listBoxes = document.querySelectorAll('.listBox');
    listBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            animateHover(this, 'translateY(-6px) scale(1.02)', 220);
        });
        
        box.addEventListener('mouseleave', function() {
            animateHover(this, 'translateY(0) scale(1)', 220);
        });
    });
    
    function animateHover(element, targetTransform, duration) {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            if (progress < 1) {
                const translateY = targetTransform.includes('-6px') ? -6 * easeOut : 6 * (1 - easeOut);
                const scale = targetTransform.includes('1.02') ? 1 + (0.02 * easeOut) : 1.02 - (0.02 * (1 - easeOut));
                
                element.style.transform = `translateY(${translateY}px) scale(${scale})`;
                requestAnimationFrame(animate);
            } else {
                element.style.transform = targetTransform;
            }
        }
        
        requestAnimationFrame(animate);
    }
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hireMeBtn = document.getElementById('hireMeBtn');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Open modal when Hire Me button is clicked
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
// Modal functionality for "Hire Me" button
document.addEventListener('DOMContentLoaded', function() {
    
    // Get modal elements
    const modal = document.getElementById('contactModal');
    const hireMeBtn = document.getElementById('hireMeBtn');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when "Hire Me" button is clicked
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Form submission handling (optional - for better UX)
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Netlify will handle the actual submission
            // This is just for user feedback
            console.log('Form submitted');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't smooth scroll if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
});
