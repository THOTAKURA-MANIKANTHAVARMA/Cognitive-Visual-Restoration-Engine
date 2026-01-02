// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Image Upload Preview
const imageInput = document.getElementById('image-input');
const uploadArea = document.getElementById('upload-area');
const previewContainer = document.getElementById('preview-container');
const previewImage = document.getElementById('preview-image');

if (imageInput && uploadArea) {
    // Click to upload
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // File input change
    imageInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (16MB max)
        if (file.size > 16 * 1024 * 1024) {
            alert('File size must be less than 16MB');
            return;
        }

        // Preview image with neural scan effect
        const reader = new FileReader();
        reader.onload = (e) => {
            if (previewImage) {
                previewImage.src = e.target.result;
                if (previewContainer) {
                    previewContainer.style.display = 'block';

                    // Add neural scan effect
                    previewContainer.classList.add('neural-scan');

                    // Add chromatic bloom animation
                    previewImage.classList.add('chromatic-bloom');

                    // Remove neural scan after animation completes
                    setTimeout(() => {
                        previewContainer.classList.remove('neural-scan');
                    }, 2000);
                }
            }
        };
        reader.readAsDataURL(file);

        // Set the file to the input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        imageInput.files = dataTransfer.files;
    }
}

// Form Validation
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            e.preventDefault();
            alert('Please fill in all fields');
        }
    });
}

// Auto-hide flash messages
const flashMessages = document.querySelectorAll('.alert');
flashMessages.forEach(message => {
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
});

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

// Active navigation link
const currentPath = window.location.pathname;
const navLinksElements = document.querySelectorAll('.nav-links a');
navLinksElements.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Image upload form submission with loading state
const uploadForm = document.getElementById('upload-form');
if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
        const submitBtn = uploadForm.querySelector('button[type="submit"]');
        if (submitBtn && imageInput.files.length > 0) {
            submitBtn.textContent = 'Uploading...';
            submitBtn.disabled = true;
        }
    });
}

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe glass cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ========== SCIENTIFIC MODERN ENHANCEMENTS ==========

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble effect to main headings
const scrambleElements = document.querySelectorAll('.hero h1');
scrambleElements.forEach(el => {
    const fx = new TextScramble(el);
    const originalText = el.textContent;

    // Start with scrambled text
    setTimeout(() => {
        fx.setText(originalText);
    }, 500);
});

// Magnetic Button Effect
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = x * strength * 0.3;
            const moveY = y * strength * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        }
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Processing Log Simulation
function simulateProcessingLog(container) {
    const logs = [
        'Initializing ResNet-101...',
        'Loading model weights...',
        'Extracting luminance features...',
        'Analyzing semantic content...',
        'Predicting chrominance values...',
        'Applying color mapping...',
        'Enhancing saturation...',
        'Finalizing chroma mapping...',
        'Processing complete!'
    ];

    let index = 0;
    const interval = setInterval(() => {
        if (index < logs.length) {
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            logLine.textContent = logs[index];
            logLine.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(logLine);

            // Auto-scroll to bottom
            container.scrollTop = container.scrollHeight;
            index++;
        } else {
            clearInterval(interval);

            // Add success flash
            document.body.classList.add('success-flash');
            setTimeout(() => {
                document.body.classList.remove('success-flash');
            }, 500);
        }
    }, 300);
}

// Apply gradient shimmer to headings
document.querySelectorAll('.hero h1').forEach(heading => {
    heading.classList.add('gradient-shimmer');
});

// HUD Corners for image containers
document.querySelectorAll('.image-preview').forEach(container => {
    if (!container.classList.contains('hud-container')) {
        container.classList.add('hud-container');

        // Add bottom corners
        const bottomLeft = document.createElement('div');
        bottomLeft.className = 'hud-bottom-left';
        container.appendChild(bottomLeft);

        const bottomRight = document.createElement('div');
        bottomRight.className = 'hud-bottom-right';
        container.appendChild(bottomRight);
    }
});

// Add tech labels to form labels
document.querySelectorAll('.form-group label').forEach(label => {
    label.classList.add('tech-label');
});

// ========== HOME PAGE REDESIGN FUNCTIONALITY ==========

// Before/After Comparison Slider
const comparisonHandle = document.getElementById('comparisonHandle');
const afterWrapper = document.getElementById('afterWrapper');
const comparisonSlider = document.querySelector('.comparison-slider');

if (comparisonHandle && afterWrapper && comparisonSlider) {
    let isDragging = false;

    function updateSliderPosition(clientX) {
        const rect = comparisonSlider.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        afterWrapper.style.width = `${percentage}%`;
        comparisonHandle.style.left = `${percentage}%`;
    }

    // Mouse events
    comparisonHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSliderPosition(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch events for mobile
    comparisonHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length > 0) {
            updateSliderPosition(e.touches[0].clientX);
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Click anywhere on slider to move handle
    comparisonSlider.addEventListener('click', (e) => {
        if (e.target !== comparisonHandle) {
            updateSliderPosition(e.clientX);
        }
    });
}

// Browse Button Handler
const browseBtn = document.getElementById('browseBtn');
const uploadDropzone = document.getElementById('upload-area');

if (browseBtn && imageInput) {
    browseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        imageInput.click();
    });
}

// Update drag and drop for new upload section
if (uploadDropzone && imageInput) {
    uploadDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadDropzone.style.borderColor = 'var(--accent-purple)';
        uploadDropzone.style.background = 'rgba(168, 85, 247, 0.15)';
    });

    uploadDropzone.addEventListener('dragleave', () => {
        uploadDropzone.style.borderColor = '';
        uploadDropzone.style.background = '';
    });

    uploadDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDropzone.style.borderColor = '';
        uploadDropzone.style.background = '';
        handleFiles(e.dataTransfer.files);
    });
}

// RESET Button Handler
const resetBtn = document.getElementById('resetBtn');

if (resetBtn && imageInput && previewContainer && uploadArea) {
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Clear the file input
        imageInput.value = '';

        // Hide the preview container
        previewContainer.style.display = 'none';

        // Clear the preview image
        if (previewImage) {
            previewImage.src = '';
        }

        // Show the upload area again
        uploadArea.style.display = 'block';

        // Add a subtle animation
        resetBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            resetBtn.style.transform = '';
        }, 300);
    });
}
