// Anime Detail Page Functionality

let currentAnimeId = null;
let currentUserId = 'user_' + Math.random().toString(36).substr(2, 9); // Generate random user ID
let selectedRating = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadAnimeDetails();
    setupEventListeners();
});

// Load anime details from URL parameter
function loadAnimeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = parseInt(urlParams.get('id'));
    
    if (!animeId) {
        showError('No anime specified');
        return;
    }
    
    currentAnimeId = animeId;
    const anime = allAnimeData.find(a => a.id === animeId);
    
    if (!anime) {
        showError('Anime not found');
        return;
    }
    
    displayAnimeDetails(anime);
    loadReviews();
}

// Display anime details
function displayAnimeDetails(anime) {
    const detailSection = document.getElementById('anime-detail');
    
    // Calculate average rating from reviews
    const avgRating = calculateAverageRating(anime.id) || anime.rating;
    const reviewCount = getReviewCount(anime.id);
    
    detailSection.innerHTML = `
        <div class="anime-hero" style="background-image: linear-gradient(to bottom, rgba(13, 13, 13, 0.3), rgba(13, 13, 13, 0.95)), url('${anime.image}');">
            <div class="anime-hero-content">
                <div class="anime-poster">
                    <img src="${anime.image}" alt="${anime.title}">
                    <div class="anime-rating-badge">
                        <svg class="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                        </svg>
                        <span>${avgRating}</span>
                    </div>
                </div>
                <div class="anime-info">
                    <h1 class="anime-title">${anime.title}</h1>
                    <div class="anime-meta">
                        <span class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            ${anime.year}
                        </span>
                        <span class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                            </svg>
                            ${anime.episodes} Episodes
                        </span>
                        <span class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                            </svg>
                            ${reviewCount} Reviews
                        </span>
                    </div>
                    <div class="anime-categories">
                        ${anime.categories.map(cat => `<span class="category-badge">${cat}</span>`).join('')}
                    </div>
                    <p class="anime-description">${anime.description}</p>
                    <div class="anime-actions">
                        <button class="action-btn primary-btn">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                            </svg>
                            Watch Now
                        </button>
                        <button class="action-btn secondary-btn">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 2h12v20l-6-4-6 4V2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                            </svg>
                            Add to Watchlist
                        </button>
                        <button class="action-btn secondary-btn">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show review section
    document.getElementById('review-section').style.display = 'block';
}

// Load and display reviews
function loadReviews(sortBy = 'helpful') {
    const reviews = getAnimeReviews(currentAnimeId, sortBy);
    const avgRating = calculateAverageRating(currentAnimeId);
    const reviewCount = reviews.length;
    
    // Update rating overview
    document.getElementById('avg-rating').textContent = avgRating ? avgRating.toFixed(1) : 'N/A';
    document.getElementById('review-count').textContent = reviewCount;
    generateRatingStars(avgRating || 0);
    generateRatingDistribution();
    
    // Display reviews
    const container = document.getElementById('reviews-container');
    const noReviews = document.getElementById('no-reviews');
    
    if (reviews.length === 0) {
        container.style.display = 'none';
        noReviews.style.display = 'flex';
    } else {
        container.style.display = 'block';
        noReviews.style.display = 'none';
        container.innerHTML = reviews.map(review => createReviewHTML(review)).join('');
        
        // Add event listeners to helpful buttons
        document.querySelectorAll('.helpful-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                handleHelpfulClick(userId);
            });
        });
    }
}

// Create review HTML
function createReviewHTML(review) {
    const timeAgo = getTimeAgo(review.timestamp);
    const stars = generateStarsHTML(review.rating);
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.username.charAt(0).toUpperCase()}</div>
                    <div>
                        <div class="reviewer-name">${review.username}</div>
                        <div class="review-date">${timeAgo}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${stars}
                    <span class="rating-number">${review.rating}/10</span>
                </div>
            </div>
            <p class="review-comment">${review.comment}</p>
            <div class="review-footer">
                <button class="helpful-btn" data-user-id="${review.userId}">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22V11M2 13v6c0 1.1.9 2 2 2h3M17 8V2L11 8h6l-1 8h4c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Helpful (${review.helpful})
                </button>
            </div>
        </div>
    `;
}

// Generate rating stars HTML
function generateStarsHTML(rating) {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<span class="star filled">★</span>';
        } else if (i === fullStars && halfStar) {
            starsHTML += '<span class="star half">★</span>';
        } else {
            starsHTML += '<span class="star">★</span>';
        }
    }
    
    return starsHTML;
}

// Generate rating stars for average
function generateRatingStars(rating) {
    const container = document.getElementById('rating-stars');
    container.innerHTML = generateStarsHTML(rating);
}

// Generate rating distribution bars
function generateRatingDistribution() {
    const distribution = getRatingDistribution(currentAnimeId);
    const container = document.getElementById('rating-distribution');
    
    if (!distribution) {
        container.innerHTML = '<p style="color: var(--text-light); font-size: 0.9rem;">No ratings yet</p>';
        return;
    }
    
    const total = Object.values(distribution).reduce((a, b) => a + b, 0);
    let html = '';
    
    for (let i = 10; i >= 1; i--) {
        const count = distribution[i];
        const percentage = total > 0 ? (count / total) * 100 : 0;
        html += `
            <div class="rating-bar">
                <span class="rating-label">${i}</span>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="rating-count">${count}</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Setup event listeners
function setupEventListeners() {
    // Write review button
    document.getElementById('write-review-btn').addEventListener('click', function() {
        document.getElementById('review-form-container').style.display = 'block';
        this.style.display = 'none';
        document.getElementById('review-form-container').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Cancel review button
    document.getElementById('cancel-review-btn').addEventListener('click', function() {
        document.getElementById('review-form-container').style.display = 'none';
        document.getElementById('write-review-btn').style.display = 'flex';
        resetReviewForm();
    });
    
    // Star rating input
    const stars = document.querySelectorAll('.star-input');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            document.getElementById('rating-value').value = selectedRating;
            updateStarRating(selectedRating);
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateStarRating(rating);
        });
    });
    
    document.getElementById('star-rating-input').addEventListener('mouseleave', function() {
        updateStarRating(selectedRating);
    });
    
    // Review form submission
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleReviewSubmission();
    });
    
    // Sort reviews
    document.getElementById('sort-reviews').addEventListener('change', function(e) {
        loadReviews(e.target.value);
    });
}

// Update star rating display
function updateStarRating(rating) {
    const stars = document.querySelectorAll('.star-input');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Handle review submission
function handleReviewSubmission() {
    const username = document.getElementById('review-username').value.trim();
    const rating = parseInt(document.getElementById('rating-value').value);
    const comment = document.getElementById('review-comment').value.trim();
    
    if (!username || !rating || !comment) {
        alert('Please fill in all fields');
        return;
    }
    
    const result = addReview(currentAnimeId, currentUserId, username, rating, comment);
    
    if (result.success) {
        // Hide form, show success message
        document.getElementById('review-form-container').style.display = 'none';
        document.getElementById('write-review-btn').style.display = 'none';
        resetReviewForm();
        
        // Reload reviews
        loadReviews();
        
        // Show success message
        showSuccessMessage('Review submitted successfully!');
    } else {
        alert(result.message);
    }
}

// Handle helpful click
function handleHelpfulClick(userId) {
    const result = markReviewHelpful(currentAnimeId, userId);
    
    if (result.success) {
        // Reload reviews to update counts
        loadReviews(document.getElementById('sort-reviews').value);
    } else {
        alert(result.message);
    }
}

// Reset review form
function resetReviewForm() {
    document.getElementById('review-form').reset();
    selectedRating = 0;
    updateStarRating(0);
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span>${message}</span>
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Show error
function showError(message) {
    const detailSection = document.getElementById('anime-detail');
    detailSection.innerHTML = `
        <div class="error-message">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
            <h2>${message}</h2>
            <a href="anime.html" class="back-link">Browse Anime</a>
        </div>
    `;
}

// Get time ago string
function getTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return then.toLocaleDateString();
}
