// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initAnimations();
    initCounters();
    initPortfolioFilter();
    initTestimonialSlider();
    initPackageBuilder();
    initConsultationForm();
    initFAQ();
    initLazyLoading();
    initSmoothScrolling();
});

// Theme Toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Animation initialization
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add CSS for AOS animations
    const style = document.createElement('style');
    style.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        [data-aos].animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos="fade-up"] {
            transform: translateY(30px);
        }
        
        [data-aos="fade-left"] {
            transform: translateX(30px);
        }
        
        [data-aos="fade-right"] {
            transform: translateX(-30px);
        }
        
        [data-aos="fade-down"] {
            transform: translateY(-30px);
        }
        
        [data-aos="zoom-in"] {
            transform: scale(0.9);
        }
        
        [data-aos].animate {
            transform: translateY(0) translateX(0) scale(1);
        }
    `;
    document.head.appendChild(style);
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);
}

// Package Builder functionality
function initPackageBuilder() {
    const serviceCheckboxes = document.querySelectorAll('input[name="package-service"]');
    const selectedServicesList = document.getElementById('selectedServicesList');
    const packageTotal = document.getElementById('packageTotal');
    const requestQuoteBtn = document.getElementById('requestQuote');
    
    let selectedServices = [];
    let totalPrice = 0;
    
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const serviceName = this.nextElementSibling.nextElementSibling.querySelector('h4').textContent;
            const servicePrice = parseInt(this.getAttribute('data-price'));
            
            if (this.checked) {
                selectedServices.push({
                    name: serviceName,
                    price: servicePrice
                });
            } else {
                selectedServices = selectedServices.filter(service => service.name !== serviceName);
            }
            
            updatePackageSummary();
        });
    });
    
    function updatePackageSummary() {
        if (selectedServices.length === 0) {
            selectedServicesList.textContent = 'No services selected';
            packageTotal.textContent = '₹0';
            return;
        }
        
        // Display selected services
        const serviceNames = selectedServices.map(service => service.name).join(', ');
        selectedServicesList.textContent = serviceNames;
        
        // Calculate total price
        totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
        
        // Apply discount for 3+ services
        if (selectedServices.length >= 3) {
            totalPrice = Math.floor(totalPrice * 0.9); // 10% discount
        }
        
        packageTotal.textContent = `₹${totalPrice.toLocaleString()}`;
    }
    
    if (requestQuoteBtn) {
        requestQuoteBtn.addEventListener('click', function() {
            if (selectedServices.length === 0) {
                showMessage('Please select at least one service', 'error');
                return;
            }
            
            // Scroll to consultation form
            document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill the services field
            const servicesSelect = document.getElementById('services');
            if (servicesSelect) {
                servicesSelect.value = 'multiple';
            }
            
            showMessage('Please fill out the consultation form below', 'success');
        });
    }
}

// Consultation Form functionality
function initConsultationForm() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(consultationForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate required fields
            const requiredFields = ['fullName', 'email', 'phone', 'services', 'consultationType', 'projectDetails'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    showFieldError(consultationForm.querySelector(`[name="${field}"]`), 'This field is required');
                }
            });
            
            // Email validation
            if (data.email && !isValidEmail(data.email)) {
                isValid = false;
                showFieldError(consultationForm.querySelector('[name="email"]'), 'Please enter a valid email address');
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = consultationForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showMessage('Thank you for your consultation request! We\'ll get back to you within 24 hours.', 'success');
                    consultationForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Log form data (in a real app, this would be sent to a server)
                    console.log('Consultation request:', data);
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = consultationForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    if (!fieldGroup) return;
    
    fieldGroup.classList.add('error');
    
    let errorElement = fieldGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: var(--error-color);
            font-size: 0.9rem;
            margin-top: 5px;
        `;
        fieldGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    if (!fieldGroup) return;
    
    fieldGroup.classList.remove('error');
    const errorElement = fieldGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        color: white;
        font-weight: 500;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageElement.style.transform = 'translateX(400px)';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
}

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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading class from body
    document.body.classList.remove('loading');
    
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// Search functionality (if search input exists)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        }, 300));
    }
}

// Initialize search
initSearch();

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics integration (placeholder)
function trackEvent(eventName, eventData) {
    // Google Analytics or other analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button')) {
        trackEvent('CTA_Click', { button: e.target.textContent });
    }
    
    if (e.target.matches('.service-link')) {
        trackEvent('Service_Click', { service: e.target.closest('.service-card').querySelector('.service-title').textContent });
    }
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Print styles optimization
window.addEventListener('beforeprint', function() {
    // Hide unnecessary elements when printing
    const elementsToHide = document.querySelectorAll('.theme-toggle, .hamburger, .animated-shapes');
    elementsToHide.forEach(el => el.style.display = 'none');
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const elementsToShow = document.querySelectorAll('.theme-toggle, .hamburger, .animated-shapes');
    elementsToShow.forEach(el => el.style.display = '');
});