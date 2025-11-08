// Sample anime data
const animeData = {
    continueWatching: [
        {
            title: "Attack on Titan: Final Season",
            episode: "S4 E12 - Guides",
            image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
            badge: "Dubbed",
            progress: 65
        },
        {
            title: "Cyberpunk: Edgerunners",
            episode: "S1 E6 - Girl on Fire",
            image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=400",
            badge: "Premium",
            progress: 42
        },
        {
            title: "Jujutsu Kaisen",
            episode: "S2 E8 - The Shibuya Incident",
            image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400",
            badge: "Dubbed",
            progress: 78
        },
        {
            title: "Sword Art Online",
            episode: "S1 E14 - The End of the World",
            image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
            badge: "Premium",
            progress: 23
        },
        {
            title: "Tokyo Revengers",
            episode: "S1 E20 - Dead or Alive",
            image: "https://images.unsplash.com/photo-1528165228341-024f7b6f7c45?w=400",
            badge: "Dubbed",
            progress: 91
        }
    ],
    trendingNow: [
        {
            title: "Spy x Family",
            episode: "S2 E4 - The Role of a Mother",
            image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2b5?w=400",
            badge: "Dubbed"
        },
        {
            title: "One Piece",
            episode: "E1089 - Gear 5",
            image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400",
            badge: "Dubbed"
        },
        {
            title: "My Hero Academia",
            episode: "S7 E15 - All For One",
            image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400",
            badge: "Premium"
        },
        {
            title: "Chainsaw Man",
            episode: "S1 E12 - Katana vs. Chainsaw",
            image: "https://images.unsplash.com/photo-1574451495862-7bdfc75e7049?w=400",
            badge: "Premium"
        },
        {
            title: "Vinland Saga",
            episode: "S2 E18 - The Road Home",
            image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=400",
            badge: "Dubbed"
        }
    ],
    newReleases: [
        {
            title: "Frieren: Beyond Journey's End",
            episode: "S1 E8 - Frieren the Slayer",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
            badge: "Premium"
        },
        {
            title: "Mushoku Tensei",
            episode: "S2 E12 - I Want to Live",
            image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400",
            badge: "Dubbed"
        },
        {
            title: "Blue Lock",
            episode: "S1 E24 - The Time Has Come",
            image: "https://images.unsplash.com/photo-1523464862212-d6631d073194?w=400",
            badge: "Dubbed"
        },
        {
            title: "Hell's Paradise",
            episode: "S1 E13 - Dreams and Reality",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
            badge: "Premium"
        },
        {
            title: "The Eminence in Shadow",
            episode: "S2 E7 - The Final Showdown",
            image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400",
            badge: "Dubbed"
        }
    ]
};

// Function to create anime card HTML
function createAnimeCard(anime, showPlayButton = false) {
    const playButtonHTML = showPlayButton ? '<div class="card-play-btn"></div>' : '';
    const progressHTML = showPlayButton && anime.progress ? 
        `<div class="card-progress-bar">
            <div class="card-progress-fill" style="width: ${anime.progress}%"></div>
        </div>` : '';
    
    return `
        <div class="anime-card">
            <img src="${anime.image}" alt="${anime.title}" class="card-image">
            ${playButtonHTML}
            ${progressHTML}
            <div class="card-info">
                <p class="card-episode">${anime.episode}</p>
                <h3 class="card-title">${anime.title}</h3>
            </div>
        </div>
    `;
}

// Function to populate a section with anime cards
function populateSection(containerId, animeList, showPlayButton = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = animeList.map(anime => createAnimeCard(anime, showPlayButton)).join('');
}

// Initialize content when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Continue watching section has play buttons
    populateSection('continue-watching', animeData.continueWatching, true);
    populateSection('trending-now', animeData.trendingNow, false);
    populateSection('new-releases', animeData.newReleases, false);
    
    // Populate new sections with trending data (reusing for demo)
    populateSection('popular-hindi-dubbed', animeData.trendingNow, false);
    populateSection('staff-picks', animeData.trendingNow, false);
    populateSection('popular-tamil-dubbed', animeData.trendingNow, false);
    populateSection('hidden-gems', animeData.trendingNow, false);
    populateSection('popular-near-you', animeData.trendingNow, false);
    populateSection('top-picks-near-you', animeData.trendingNow, false);
    populateSection('popular-telugu-dubbed', animeData.trendingNow, false);
    populateSection('evergreen-anime', animeData.trendingNow, false);
    populateSection('popular-in-india', animeData.trendingNow, false);
    populateSection('you-may-also-like', animeData.trendingNow, false);
    populateSection('fantasy-anime', animeData.trendingNow, false);
    populateSection('adventure-anime', animeData.trendingNow, false);
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add click handlers to cards
    document.querySelectorAll('.anime-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            console.log(`Clicked on: ${title}`);
            // TODO: Navigate to anime detail page
        });
    });
    
    // Add click handlers to hero buttons
    const startWatchingBtn = document.querySelector('.btn-primary');
    const myListBtn = document.querySelector('.btn-secondary');
    
    if (startWatchingBtn) {
        startWatchingBtn.addEventListener('click', () => {
            console.log('Watch now clicked');
            // TODO: Navigate to anime player
        });
    }
    
    if (myListBtn) {
        myListBtn.addEventListener('click', () => {
            console.log('Add to watchlist clicked');
            // TODO: Add to watchlist
        });
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.4;
            const offset = scrolled * parallaxSpeed;
            
            // Apply parallax to all hero slides
            const heroSlides = document.querySelectorAll('.hero-slide');
            heroSlides.forEach(slide => {
                slide.style.setProperty('--parallax-offset', `${offset}px`);
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
        
        // Initial call
        updateParallax();
    }
});

// Apply parallax transform using CSS variable - removed as it's now handled in the scroll event

// --- Hero slider initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const dots = Array.from(document.querySelectorAll('.hero-dot'));
    const prevBtn = document.querySelector('.hero-nav-left');
    const nextBtn = document.querySelector('.hero-nav-right');
    if (slides.length === 0) return;

    let current = 0;
    const intervalMs = 5000;
    
    let timer = null;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        current = index;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Reset timer when manually selecting slide
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, intervalMs);
        });
    });

    // Handle arrow clicks
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            // Reset timer when manually navigating
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, intervalMs);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            // Reset timer when manually navigating
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, intervalMs);
        });
    }

    // Start
    showSlide(0);
    timer = setInterval(nextSlide, intervalMs);

    // Pause on hover to improve UX
    const hero = document.querySelector('.hero-section');
    hero.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); timer = null; });
    hero.addEventListener('mouseleave', () => { if (!timer) timer = setInterval(nextSlide, intervalMs); });
});

// --- Slider controls for content sections ---
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = Array.from(document.querySelectorAll('.slider-nav'));
    navButtons.forEach(btn => {
        const targetId = btn.getAttribute('data-target');
        const container = document.getElementById(targetId);
        if (!container) return;

        btn.addEventListener('click', () => {
            const scrollAmount = Math.max(container.clientWidth * 0.8, 260);
            const direction = btn.classList.contains('slider-nav-right') ? 1 : -1;
            
            // Ultra-smooth scroll with easing
            const start = container.scrollLeft;
            const target = start + (scrollAmount * direction);
            const duration = 1200; // milliseconds - longer for ultra-smooth feel
            const startTime = performance.now();
            
            function easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
            }
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutQuint(progress);
                
                container.scrollLeft = start + (target - start) * eased;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        });
    });
    
    // Add touch swipe support for mobile
    document.querySelectorAll('.cards-container').forEach(container => {
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            isDown = true;
        });
        
        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        container.addEventListener('touchend', () => {
            isDown = false;
        });
    });
});

// --- Scroll-triggered animations ---
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Don't unobserve so animation happens every time
            }
        });
    }, observerOptions);

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe anime cards
    document.querySelectorAll('.anime-card').forEach(card => {
        observer.observe(card);
    });

    // Observe footer
    const footer = document.querySelector('.site-footer');
    if (footer) {
        observer.observe(footer);
    }
}

// --- Responsive adjustments ---
document.addEventListener('DOMContentLoaded', () => {
    // Adjust hero slider speed on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate layouts after orientation change
            document.querySelectorAll('.cards-container').forEach(container => {
                container.scrollLeft = 0;
            });
        }, 100);
    });
    
    // Enhanced parallax with better performance
    const heroSection = document.querySelector('.hero-section');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBottom = heroSection ? heroSection.offsetHeight : 0;
        
        // Only apply parallax when hero is visible
        if (scrolled < heroBottom && heroSection) {
            const parallaxSpeed = isMobile() ? 0.25 : 0.4;
            const offset = scrolled * parallaxSpeed;
            
            // Apply parallax to all hero slides
            const heroSlides = document.querySelectorAll('.hero-slide');
            heroSlides.forEach(slide => {
                slide.style.setProperty('--parallax-offset', `${offset}px`);
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking && heroSection) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Initial call
    if (heroSection) {
        updateParallax();
    }
    
    // Add viewport meta tag detection for safe area insets (for notched phones)
    if (window.CSS && window.CSS.supports('padding-top: env(safe-area-inset-top)')) {
        document.body.style.paddingTop = 'calc(60px + env(safe-area-inset-top, 0px))';
    }
});