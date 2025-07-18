// Service page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initServiceFAQ();
    initServiceAnimations();
    initServiceConsultationForm();
    initTechItemInteractions();
});

// FAQ functionality for service pages
function initServiceFAQ() {
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

// Service-specific animations
function initServiceAnimations() {
    // Animate service type cards
    const typeCards = document.querySelectorAll('.type-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    typeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });
    
    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-step');
            }
        });
    }, { threshold: 0.3 });
    
    processSteps.forEach(step => {
        processObserver.observe(step);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .process-step {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .process-step.animate-step {
            opacity: 1;
            transform: translateY(0);
        }
        
        .type-card:hover .type-icon {
            animation: bounce 0.6s ease;
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% {
                transform: translateY(0) scale(1.1);
            }
            40% {
                transform: translateY(-10px) scale(1.1);
            }
            80% {
                transform: translateY(-5px) scale(1.1);
            }
        }
        
        .case-study {
            transition: all 0.3s ease;
        }
        
        .case-study:hover {
            transform: translateY(-10px) scale(1.02);
        }
    `;
    document.head.appendChild(style);
}

// Service consultation form handling
function initServiceConsultationForm() {
    const consultationForm = document.getElementById('webDevConsultationForm') || 
                            document.getElementById('appDevConsultationForm') ||
                            document.getElementById('digitalMarketingConsultationForm') ||
                            document.getElementById('uiUxConsultationForm') ||
                            document.getElementById('graphicDesignConsultationForm') ||
                            document.getElementById('brandingConsultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(consultationForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate required fields
            const requiredFields = ['fullName', 'email', 'phone', 'projectType', 'consultationType', 'projectDetails'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const fieldElement = consultationForm.querySelector(`[name="${field}"]`);
                if (!data[field] && fieldElement) {
                    isValid = false;
                    showFieldError(fieldElement, 'This field is required');
                }
            });
            
            // Email validation
            if (data.email && !isValidEmail(data.email)) {
                isValid = false;
                showFieldError(consultationForm.querySelector('[name="email"]'), 'Please enter a valid email address');
            }
            
            // Phone validation
            if (data.phone && !isValidPhone(data.phone)) {
                isValid = false;
                showFieldError(consultationForm.querySelector('[name="phone"]'), 'Please enter a valid phone number');
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = consultationForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending Request...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showMessage('Thank you for your consultation request! Our expert will contact you within 24 hours to discuss your project requirements.', 'success');
                    consultationForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Clear any error states
                    const errorElements = consultationForm.querySelectorAll('.form-group.error');
                    errorElements.forEach(element => {
                        element.classList.remove('error');
                        const errorMsg = element.querySelector('.error-message');
                        if (errorMsg) errorMsg.remove();
                    });
                    
                    // Log form data (in a real app, this would be sent to a server)
                    console.log('Service consultation request:', data);
                    
                    // Track event
                    trackServiceConsultation(data.projectType || 'general');
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = consultationForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateServiceField(this);
            });
            
            input.addEventListener('input', function() {
                clearServiceFieldError(this);
            });
        });
    }
}

// Technology item interactions
function initTechItemInteractions() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            const techName = this.textContent;
            showTechInfo(techName);
        });
        
        // Add ripple effect
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Service field validation
function validateServiceField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearServiceFieldError(field);
    
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
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        field.closest('.form-group').classList.add('success');
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    if (!fieldGroup) return;
    
    fieldGroup.classList.add('error');
    fieldGroup.classList.remove('success');
    
    let errorElement = fieldGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        fieldGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearServiceFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    if (!fieldGroup) return;
    
    fieldGroup.classList.remove('error', 'success');
    const errorElement = fieldGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showTechInfo(techName) {
    const techInfo = {
        'HTML5': 'Modern markup language for structuring web content',
        'CSS3': 'Styling language for designing beautiful web interfaces',
        'JavaScript': 'Programming language for interactive web functionality',
        'React': 'Popular JavaScript library for building user interfaces',
        'Vue.js': 'Progressive JavaScript framework for web applications',
        'Angular': 'Comprehensive TypeScript framework for web apps',
        'Node.js': 'JavaScript runtime for server-side development',
        'PHP': 'Server-side scripting language for web development',
        'Python': 'Versatile programming language for web applications',
        'MySQL': 'Reliable relational database management system',
        'MongoDB': 'Flexible NoSQL database for modern applications'
    };
    
    const info = techInfo[techName] || `${techName} is a technology we use in our development process`;
    showMessage(info, 'info');
}

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    const bgColor = type === 'success' ? 'var(--success-color)' : 
                   type === 'error' ? 'var(--error-color)' : 
                   'var(--primary-color)';
    
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        color: white;
        font-weight: 500;
        background: ${bgColor};
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
    }, type === 'info' ? 2000 : 4000);
}

// Track service consultation requests
function trackServiceConsultation(serviceType) {
    // Analytics tracking
    console.log('Service consultation tracked:', serviceType);
    
    // You can integrate with Google Analytics or other tracking services here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'consultation_request', {
            'service_type': serviceType,
            'event_category': 'engagement',
            'event_label': 'Service Page Consultation'
        });
    }
}

// Case study modal functionality
function initCaseStudyModal() {
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach(study => {
        study.addEventListener('click', function() {
            const title = study.querySelector('h3').textContent;
            const description = study.querySelector('.case-description').textContent;
            const metrics = study.querySelectorAll('.metric');
            const techStack = study.querySelectorAll('.case-tech span');
            
            // Create modal content
            const modalContent = `
                <div class="modal-overlay" id="caseStudyModal">
                    <div class="modal-content">
                        <button class="modal-close" id="closeModal">&times;</button>
                        <h2>${title}</h2>
                        <p class="modal-description">${description}</p>
                        <div class="modal-metrics">
                            ${Array.from(metrics).map(metric => `
                                <div class="metric">
                                    <div class="metric-number">${metric.querySelector('.metric-number').textContent}</div>
                                    <div class="metric-label">${metric.querySelector('.metric-label').textContent}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="modal-tech">
                            <h4>Technologies Used:</h4>
                            <div class="tech-tags">
                                ${Array.from(techStack).map(tech => `<span class="tech-tag">${tech.textContent}</span>`).join('')}
                            </div>
                        </div>
                        <div class="modal-actions">
                            <a href="#consultation" class="btn btn-primary">Start Similar Project</a>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to page
            document.body.insertAdjacentHTML('beforeend', modalContent);
            
            // Add modal styles
            const modalStyles = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: var(--text-white);
                    border-radius: var(--border-radius);
                    padding: var(--spacing-xl);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    animation: slideIn 0.3s ease;
                }
                
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--text-light);
                }
                
                .modal-description {
                    margin-bottom: var(--spacing-md);
                    color: var(--text-light);
                }
                
                .modal-metrics {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: var(--spacing-md);
                    padding: var(--spacing-md);
                    background: var(--bg-light);
                    border-radius: var(--border-radius);
                }
                
                .modal-tech h4 {
                    margin-bottom: var(--spacing-sm);
                    color: var(--text-dark);
                }
                
                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-md);
                }
                
                .tech-tag {
                    background: var(--primary-color);
                    color: var(--text-white);
                    padding: 4px 8px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                }
                
                .modal-actions {
                    text-align: center;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            
            const styleElement = document.createElement('style');
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
            
            // Close modal functionality
            const modal = document.getElementById('caseStudyModal');
            const closeBtn = document.getElementById('closeModal');
            
            closeBtn.addEventListener('click', () => {
                modal.remove();
                styleElement.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    styleElement.remove();
                }
            });
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Restore body scroll when modal is closed
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.removedNodes.forEach(function(node) {
                            if (node.id === 'caseStudyModal') {
                                document.body.style.overflow = '';
                                observer.disconnect();
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, { childList: true });
        });
    });
}

// Initialize case study modal
initCaseStudyModal();