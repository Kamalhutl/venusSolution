// VenusSolution - Enhanced JavaScript Functionality
// Main JavaScript file with all interactive features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTestimonialsSlider();
    initLiveChat();
    initNewsletterPopup();
    initAnimations();
    initCounterAnimation();
    initSmoothScrolling();
    initFormValidation();
    initLazyLoading();
    
    // Show newsletter popup after 5 seconds
    setTimeout(() => {
        showNewsletterPopup();
    }, 5000);
});

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Active navigation highlighting
    highlightActiveNav();
}

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}





// ===== TESTIMONIALS SLIDER =====
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (testimonialCards.length === 0) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentIndex);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
    
    // Show first testimonial
    showTestimonial(0);
}

// ===== LIVE CHAT =====
function initLiveChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatToggle || !chatWindow) return;
    
    // Toggle chat window
    chatToggle.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });
    
    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Thank you for your message! Our team will get back to you soon.",
                "That's a great question! Let me connect you with our specialist.",
                "I understand your concern. Let me help you with that.",
                "Thanks for reaching out! We're here to help."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ===== NEWSLETTER POPUP =====
function initNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (!popup) return;
    
    // Close popup
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            hideNewsletterPopup();
        });
    }
    
    // Close on outside click
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hideNewsletterPopup();
        }
    });
    
    // Handle form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Simulate subscription
                showNotification('Thank you for subscribing!', 'success');
                hideNewsletterPopup();
                this.reset();
                
                // Store subscription
                localStorage.setItem('newsletter_subscribed', 'true');
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function showNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    if (popup && !localStorage.getItem('newsletter_subscribed')) {
        popup.classList.add('active');
    }
}

function hideNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Custom scroll animations
    initScrollAnimations();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-category, .feature-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '';
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== PERFORMANCE OPTIMIZATION =====
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events efficiently
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY =====
function initAccessibility() {
    // Keyboard navigation for dropdowns
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                }
            });
        }
    });
    
    // Focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== ANALYTICS & TRACKING =====
function trackEvent(category, action, label = null) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Custom event tracking
    const event = new CustomEvent('venussolution_track', {
        detail: { category, action, label }
    });
    document.dispatchEvent(event);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
        if (target.classList.contains('cta-button')) {
            trackEvent('engagement', 'cta_click', target.textContent.trim());
        } else if (target.classList.contains('nav-link')) {
            trackEvent('navigation', 'nav_click', target.textContent.trim());
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    trackEvent('error', 'js_error', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    trackEvent('error', 'promise_rejection', e.reason);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== EXPORT FOR GLOBAL USE =====
window.VenusSolution = {
    showNotification,
    trackEvent,
    showNewsletterPopup,
    hideNewsletterPopup
};

// ===== INITIALIZATION COMPLETE =====
console.log('VenusSolution website initialized successfully! 🚀');