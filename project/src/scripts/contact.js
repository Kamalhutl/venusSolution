// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initMultiStepForm();
    initFormValidation();
    initContactAnimations();
});

// Multi-step form functionality
function initMultiStepForm() {
    const form = document.getElementById('contactForm');
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    
    let currentStep = 0;
    const totalSteps = steps.length;
    
    // Show initial step
    showStep(currentStep);
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCurrentStep()) {
            submitForm();
        }
    });
    
    function showStep(stepIndex) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
            step.setAttribute('aria-hidden', 'true');
        });
        
        // Show current step
        steps[stepIndex].classList.add('active');
        steps[stepIndex].setAttribute('aria-hidden', 'false');
        
        // Update progress bar
        const progress = ((stepIndex + 1) / totalSteps) * 100;
        progressFill.style.width = progress + '%';
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < stepIndex) {
                step.classList.add('completed');
            } else if (index === stepIndex) {
                step.classList.add('active');
            }
        });
        
        // Update button visibility
        prevBtn.style.display = stepIndex === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = stepIndex === totalSteps - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = stepIndex === totalSteps - 1 ? 'inline-block' : 'none';
        
        // Focus management
        const firstInput = steps[stepIndex].querySelector('input, textarea, select');
        if (firstInput) {
            firstInput.focus();
        }
        
        // Add step-specific animations
        steps[stepIndex].style.animation = 'fadeIn 0.5s ease-in-out';
    }
    
    function validateCurrentStep() {
        const currentStepElement = steps[currentStep];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const fieldGroup = field.closest('.field-group');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        clearFieldError(fieldGroup);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // URL validation
        if (field.type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                isValid = false;
                errorMessage = 'Please enter a valid URL';
            }
        }
        
        // Radio button validation
        if (field.type === 'radio' && field.hasAttribute('required')) {
            const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                errorMessage = 'Please select an option';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            showFieldError(fieldGroup, errorMessage);
        } else {
            fieldGroup.classList.add('success');
        }
        
        return isValid;
    }
    
    function showFieldError(fieldGroup, message) {
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
    
    function clearFieldError(fieldGroup) {
        fieldGroup.classList.remove('error', 'success');
        const errorElement = fieldGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function submitForm() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        form.classList.add('form-loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            // Hide loading state
            form.classList.remove('form-loading');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            currentStep = 0;
            showStep(currentStep);
            
            // Log form data (in a real app, this would be sent to a server)
            console.log('Form submitted:', data);
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message show';
        successMessage.innerHTML = `
            <h3>Thank you for your message!</h3>
            <p>We've received your inquiry and will get back to you within 24 hours with a detailed proposal.</p>
        `;
        
        form.parentNode.insertBefore(successMessage, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        // Scroll to top of form
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

// Real-time form validation
function initFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            const fieldGroup = this.closest('.field-group');
            if (fieldGroup.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const fieldGroup = field.closest('.field-group');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        clearFieldError(fieldGroup);
        
        // Skip validation if field is empty and not required
        if (!value && !field.hasAttribute('required')) {
            return true;
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // URL validation
        if (field.type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                isValid = false;
                errorMessage = 'Please enter a valid URL';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            showFieldError(fieldGroup, errorMessage);
        } else {
            fieldGroup.classList.add('success');
        }
        
        return isValid;
    }
    
    function showFieldError(fieldGroup, message) {
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
    
    function clearFieldError(fieldGroup) {
        fieldGroup.classList.remove('error', 'success');
        const errorElement = fieldGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Contact page animations
function initContactAnimations() {
    // Animate contact info items
    const infoItems = document.querySelectorAll('.info-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    infoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        observer.observe(item);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .service-option {
            transition: transform 0.2s ease;
        }
        
        .service-option:hover {
            transform: translateY(-2px);
        }
        
        .option-card {
            transition: all 0.3s ease;
        }
        
        .option-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Auto-save form data to localStorage
function initAutoSave() {
    const form = document.getElementById('contactForm');
    const formFields = form.querySelectorAll('input, textarea, select');
    
    // Load saved data
    loadFormData();
    
    // Save data on input
    formFields.forEach(field => {
        field.addEventListener('input', saveFormData);
        field.addEventListener('change', saveFormData);
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            clearFormData();
        }, 3000);
    });
    
    function saveFormData() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem('contactFormData', JSON.stringify(data));
    }
    
    function loadFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'radio') {
                        const radioField = form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                        if (radioField) {
                            radioField.checked = true;
                        }
                    } else {
                        field.value = data[key];
                    }
                }
            });
        }
    }
    
    function clearFormData() {
        localStorage.removeItem('contactFormData');
    }
}

// Initialize auto-save
initAutoSave();

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    const activeStep = document.querySelector('.form-step.active');
    const focusableElements = activeStep.querySelectorAll(
        'input, textarea, select, button, [tabindex="0"]'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Tab navigation within step
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    // Enter key to proceed to next step
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
        e.preventDefault();
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        if (nextBtn.style.display !== 'none') {
            nextBtn.click();
        } else if (submitBtn.style.display !== 'none') {
            submitBtn.click();
        }
    }
});