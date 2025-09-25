
// Global Application JavaScript

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupForms();
    setupAnimations();
    setupNotifications();
}

// Navigation Setup
function setupNavigation() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-mobile-menu-content]');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Setup
function setupForms() {
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        });
    });

    // Real-time validation
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
        } else {
            field.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// Field Validation
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('border-red-500');
        return false;
    } else {
        field.classList.remove('border-red-500');
        field.classList.add('border-green-500');
        return true;
    }
}

// Animation Setup
function setupAnimations() {
    // Fade in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
}

// Notification System
function setupNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('#notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
}

// Show Notification
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.querySelector('#notification-container');
    const notification = document.createElement('div');
    
    const typeClasses = {
        'success': 'bg-green-500 text-white',
        'error': 'bg-red-500 text-white',
        'warning': 'bg-yellow-500 text-black',
        'info': 'bg-blue-500 text-white'
    };

    notification.className = `p-4 rounded-lg shadow-lg transform transition-all duration-300 ${typeClasses[type]} max-w-sm`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-lg">&times;</button>
        </div>
    `;

    container.appendChild(notification);

    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Dashboard Functions
function updateDashboardStats() {
    // Simulate real-time data updates
    const stats = document.querySelectorAll('[data-stat]');
    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
        if (newValue > 0) {
            animateCounter(stat, currentValue, newValue);
        }
    });
}

// Counter Animation
function animateCounter(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Local Storage Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark');
    
    if (isDark) {
        body.classList.remove('dark');
        saveToLocalStorage('theme', 'light');
    } else {
        body.classList.add('dark');
        saveToLocalStorage('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = getFromLocalStorage('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

// Initialize theme on load
loadTheme();

// Export functions for global use
window.showNotification = showNotification;
window.saveToLocalStorage = saveToLocalStorage;
window.getFromLocalStorage = getFromLocalStorage;
window.toggleTheme = toggleTheme;
