// Valentine's Day Website Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded successfully!');
    
    initializeFloatingHearts();
    initializeMessageCreator();
    initializeImageGallery();
    initializeScrollAnimations();
    initializeConfetti();
});


// Create floating hearts animation
function initializeFloatingHearts() {
    console.log('Initializing floating hearts...');
    const floatingHearts = document.querySelector('.floating-hearts');
    
    if (!floatingHearts) {
        console.log('Floating hearts container not found!');
        return;
    }
    
    // Create additional floating hearts
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 2 + 1}rem;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
        `;
        floatingHearts.appendChild(heart);
    }
    console.log('Floating hearts created!');
}

// Initialize image gallery with enhanced features
function initializeImageGallery() {
    const imageCards = document.querySelectorAll('.image-card');
    
    imageCards.forEach(card => {
        // Lightbox functionality
        card.addEventListener('click', function(e) {
            // Don't open lightbox if clicking on action buttons
            if (e.target.classList.contains('action-btn')) return;
            
            const img = this.querySelector('img');
            const overlay = this.querySelector('.image-overlay p').textContent;
            createLightbox(img.src, overlay);
        });
        
        // Like button functionality
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('liked');
                
                if (this.classList.contains('liked')) {
                    showNotification('Added to favorites! ❤️', 'success');
                    // Create floating heart animation
                    createFloatingHeart(this);
                } else {
                    showNotification('Removed from favorites', 'info');
                }
            });
        }
        
        // Share button functionality
        const shareBtn = card.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const img = card.querySelector('img');
                const title = card.querySelector('.image-overlay p').textContent;
                
                if (navigator.share) {
                    navigator.share({
                        title: 'Valentine\'s Day Image',
                        text: `Check out this beautiful moment: ${title}`,
                        url: window.location.href
                    });
                } else {
                    // Fallback: copy to clipboard
                    const dummy = document.createElement('input');
                    document.body.appendChild(dummy);
                    dummy.value = window.location.href;
                    dummy.select();
                    document.execCommand('copy');
                    document.body.removeChild(dummy);
                    showNotification('Link copied to clipboard! 🔗', 'success');
                }
            });
        }
    });
}

// Create floating heart animation
function createFloatingHeart(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: absolute;
        font-size: 2rem;
        left: ${element.offsetLeft}px;
        top: ${element.offsetTop}px;
        pointer-events: none;
        animation: floatUp 2s ease-out forwards;
        z-index: 1000;
    `;
    
    element.parentElement.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

// Initialize gallery filters
function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const imageCards = document.querySelectorAll('.image-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter images
            const filter = this.dataset.filter;
            imageCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Initialize love calculator
function initializeLoveCalculator() {
    const calculateBtn = document.getElementById('calculateLove');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const loveResult = document.getElementById('loveResult');
    const lovePercentage = document.getElementById('lovePercentage');
    const resultMessage = document.getElementById('resultMessage');
    
    calculateBtn.addEventListener('click', function() {
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();
        
        if (!name1 || !name2) {
            showNotification('Please enter both names!', 'error');
            return;
        }
        
        // Calculate love percentage (fun algorithm)
        const loveScore = calculateLoveScore(name1, name2);
        
        // Animate the percentage
        animatePercentage(loveScore);
        
        // Set message based on score
        let message = '';
        if (loveScore >= 90) {
            message = 'Perfect match! Made for each other! 💕';
        } else if (loveScore >= 70) {
            message = 'Great chemistry! Love is in the air! 💕';
        } else if (loveScore >= 50) {
            message = 'Good potential! Keep the love growing! 💕';
        } else {
            message = 'Love needs work, but anything is possible! 💕';
        }
        
        resultMessage.textContent = message;
        loveResult.classList.remove('hidden');
        
        // Add hearts rain animation
        createHeartsRain();
    });
    
    // Input validation
    [name1Input, name2Input].forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    });
}

// Calculate love score
function calculateLoveScore(name1, name2) {
    const combined = (name1 + name2).toLowerCase();
    let score = 0;
    
    // Add points for common letters
    for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i);
    }
    
    // Add some randomness for fun
    score += Math.random() * 20;
    
    // Normalize to 0-100
    score = score % 100;
    
    // Ensure minimum of 30 and maximum of 99
    return Math.max(30, Math.min(99, Math.floor(score)));
}

// Animate percentage counting
function animatePercentage(targetScore) {
    const percentageElement = document.getElementById('lovePercentage');
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        percentageElement.textContent = Math.floor(currentScore) + '%';
    }, 30);
}

// Initialize playlist
function initializePlaylist() {
    console.log('Initializing playlist...');
    const playBtns = document.querySelectorAll('.play-btn');
    let currentlyPlaying = null;
    let currentAudio = null;
    
    if (playBtns.length === 0) {
        console.log('No play buttons found!');
        return;
    }
    
    console.log(`Found ${playBtns.length} play buttons`);
    
    playBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const playlistItem = this.closest('.playlist-item');
            const songTitle = playlistItem.querySelector('h3').textContent;
            
            console.log(`Clicked play button for: ${songTitle}`);
            
            // If clicking currently playing button, stop it
            if (currentlyPlaying === this) {
                this.classList.remove('playing');
                this.textContent = '▶️';
                currentlyPlaying = null;
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio = null;
                }
                showNotification(`Paused: ${songTitle}`, 'info');
                return;
            }
            
            // If another song is playing, stop it first
            if (currentlyPlaying) {
                currentlyPlaying.classList.remove('playing');
                currentlyPlaying.textContent = '▶️';
            }
            
            // Stop current audio if exists
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            
            // Create audible tone using Web Audio API
            this.classList.add('playing');
            this.textContent = '⏸️';
            currentlyPlaying = this;
            
            showNotification(`Now playing: ${songTitle}`, 'success');
            
            // Create simple audible tone
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                // Different frequencies for different songs
                const frequencies = [440, 494, 523, 587, 659]; // A4, B4, C5, D5, E5
                oscillator.frequency.setValueAtTime(frequencies[index % frequencies.length], audioContext.currentTime);
                oscillator.type = 'sine';
                
                // Connect nodes
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Set volume
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                
                // Play the tone
                oscillator.start();
                currentAudio = { stop: () => oscillator.stop() };
                
                // Auto-stop after 10 seconds
                setTimeout(() => {
                    if (currentlyPlaying === this) {
                        this.classList.remove('playing');
                        this.textContent = '▶️';
                        currentlyPlaying = null;
                        if (currentAudio) {
                            currentAudio.stop();
                            currentAudio = null;
                        }
                        showNotification(`Finished: ${songTitle}`, 'info');
                    }
                }, 10000);
                
            } catch (error) {
                console.log('Audio error:', error);
                showNotification('Audio not supported in this browser', 'error');
                // Fallback: just visual feedback
                setTimeout(() => {
                    if (currentlyPlaying === this) {
                        this.classList.remove('playing');
                        this.textContent = '▶️';
                        currentlyPlaying = null;
                        showNotification(`Finished: ${songTitle}`, 'info');
                    }
                }, 30000);
            }
        });
    });
    console.log('Playlist initialized!');
}

// Create hearts rain effect
function createHeartsRain() {
    const heartsRain = document.querySelector('.hearts-rain');
    if (!heartsRain) return;
    
    // Clear existing hearts
    heartsRain.innerHTML = '';
    
    // Create multiple hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 1 + 1}rem;
                animation: heartsFall ${Math.random() * 2 + 2}s ease-out forwards;
                pointer-events: none;
            `;
            heartsRain.appendChild(heart);
            
            setTimeout(() => heart.remove(), 4000);
        }, i * 200);
    }
}

// Create lightbox for image viewing
function createLightbox(imageSrc, caption) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${caption}">
            <p class="lightbox-caption">${caption}</p>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    const captionElement = lightbox.querySelector('.lightbox-caption');
    captionElement.style.cssText = `
        color: white;
        margin-top: 15px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: none;
        border: none;
        transition: transform 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    document.body.appendChild(lightbox);
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.message-card, .image-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#ffe0f0', '#ff1493', '#ff69b4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random() * 0.8 + 0.2};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
            z-index: 999;
            pointer-events: none;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Initialize confetti animation styles
function initializeConfetti() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize message creator functionality
function initializeMessageCreator() {
    const generateBtn = document.getElementById('generateMessage');
    const recipientInput = document.getElementById('recipientName');
    const messageInput = document.getElementById('customMessage');
    const generatedCard = document.getElementById('generatedCard');
    const cardRecipient = document.getElementById('cardRecipient');
    const cardMessage = document.getElementById('cardMessage');

    generateBtn.addEventListener('click', function() {
        const recipient = recipientInput.value.trim();
        const message = messageInput.value.trim();

        if (!recipient || !message) {
            showNotification('Please fill in both the name and message fields!', 'error');
            return;
        }

        // Generate the card with animation
        cardRecipient.textContent = `Dear ${recipient},`;
        cardMessage.textContent = message;
        
        generatedCard.classList.remove('hidden');
        generatedCard.style.animation = 'none';
        setTimeout(() => {
            generatedCard.style.animation = 'slideInUp 0.5s ease-out';
        }, 10);

        // Add confetti effect
        createConfetti();
        
        showNotification('Valentine card created successfully! 💕', 'success');
    });

    // Add input validation
    recipientInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    messageInput.addEventListener('input', function() {
        const remaining = 200 - this.value.length;
        updateCharacterCount(remaining);
    });
}

// Add float up animation
const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Update character count for message textarea
function updateCharacterCount(remaining) {
    let counter = document.getElementById('charCounter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'charCounter';
        counter.style.cssText = `
            text-align: right;
            color: #666;
            font-size: 0.9rem;
            margin-top: -10px;
            margin-bottom: 10px;
        `;
        document.getElementById('customMessage').parentNode.insertBefore(counter, document.getElementById('customMessage').nextSibling);
    }
    
    counter.textContent = `${remaining} characters remaining`;
    counter.style.color = remaining < 20 ? '#ff6b9d' : '#666';
}

// Add slide animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.remove();
        }
    }
});

// Show notification message
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    let bgColor = '#4CAF50';
    if (type === 'error') bgColor = '#f44336';
    else if (type === 'info') bgColor = '#2196F3';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
