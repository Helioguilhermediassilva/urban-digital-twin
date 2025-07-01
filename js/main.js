// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Navigation functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Dashboard functionality
const dashboardNavItems = document.querySelectorAll('.dashboard-nav .nav-item');
const tabContents = document.querySelectorAll('.tab-content');

dashboardNavItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all nav items and tab contents
        dashboardNavItems.forEach(nav => nav.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked nav item
        item.classList.add('active');
        
        // Show corresponding tab content
        const tabId = item.getAttribute('data-tab');
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    });
});

// Animated counters for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, number);
                }
            });
        }
    });
}, observerOptions);

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// Chart.js integration for dashboard
let overviewChart;

function initializeChart() {
    const ctx = document.getElementById('overviewChart');
    if (ctx) {
        overviewChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Water Usage',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Energy Consumption',
                    data: [28, 48, 40, 19, 86, 27],
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Traffic Flow',
                    data: [45, 25, 16, 36, 67, 18],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'City Metrics Overview'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Initialize chart when dashboard tab is active
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure Chart.js is loaded
    setTimeout(initializeChart, 500);
});

// Contact form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#28a745';
            
            // Reset form
            this.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic progress circles
function updateProgressCircle(element, percentage) {
    const degrees = (percentage / 100) * 360;
    element.style.background = `conic-gradient(#667eea 0deg ${degrees}deg, #e9ecef ${degrees}deg 360deg)`;
}

// Update progress circles when they come into view
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const percentage = parseInt(circle.getAttribute('data-percentage'));
            if (percentage) {
                updateProgressCircle(circle, percentage);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-circle').forEach(circle => {
    progressObserver.observe(circle);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Floating animation for cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.area-card, .tech-card, .innovation-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize floating animations
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Real-time data simulation for dashboard
function simulateRealTimeData() {
    const metrics = document.querySelectorAll('.metric-value');
    
    setInterval(() => {
        metrics.forEach(metric => {
            const currentValue = parseFloat(metric.textContent.replace(/[^\d.]/g, ''));
            if (currentValue) {
                const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
                const newValue = currentValue * (1 + variation);
                
                if (metric.textContent.includes('M')) {
                    metric.textContent = newValue.toFixed(1) + 'M';
                } else if (metric.textContent.includes('%')) {
                    metric.textContent = Math.round(newValue) + '%';
                } else if (metric.textContent.includes('$')) {
                    metric.textContent = '$' + newValue.toFixed(1) + 'M';
                }
            }
        });
    }, 5000); // Update every 5 seconds
}

// Start real-time simulation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(simulateRealTimeData, 3000);
});

// Energy bar animation
function animateEnergyBars() {
    const energyFills = document.querySelectorAll('.energy-fill');
    
    energyFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 500);
    });
}

// Animate energy bars when tab is shown
document.addEventListener('DOMContentLoaded', () => {
    const energyTab = document.querySelector('[data-tab="energy"]');
    if (energyTab) {
        energyTab.addEventListener('click', () => {
            setTimeout(animateEnergyBars, 300);
        });
    }
});

// Scroll-triggered animations
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.area-card, .tech-card, .innovation-card, .timeline-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Theme toggle functionality (bonus feature)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #667eea;
        color: white;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', initThemeToggle);

