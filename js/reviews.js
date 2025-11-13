// Review System Data Structure
// Stores user reviews for each anime

const reviewsData = {
    // Reviews are stored by anime ID
    1: [ // Demon Slayer
        { userId: "user_001", username: "AnimeF an123", rating: 9, comment: "Amazing animation and emotional story! The fight scenes are breathtaking.", timestamp: "2024-11-10T14:30:00Z", helpful: 45 },
        { userId: "user_002", username: "OtakuKing", rating: 8, comment: "Great anime but pacing can be slow at times.", timestamp: "2024-11-08T10:15:00Z", helpful: 23 },
        { userId: "user_003", username: "SwordMaster", rating: 10, comment: "Masterpiece! Every episode is beautifully crafted.", timestamp: "2024-11-05T16:45:00Z", helpful: 67 }
    ],
    2: [ // Attack on Titan
        { userId: "user_004", username: "TitanSlayer", rating: 10, comment: "One of the best anime ever made. Mind-blowing plot twists!", timestamp: "2024-11-12T09:20:00Z", helpful: 89 },
        { userId: "user_005", username: "ErenYeager", rating: 9, comment: "Epic from start to finish. The ending was perfect.", timestamp: "2024-11-11T18:30:00Z", helpful: 56 },
        { userId: "user_006", username: "ArminFan", rating: 10, comment: "Incredible storytelling and character development.", timestamp: "2024-11-09T12:00:00Z", helpful: 72 }
    ],
    3: [ // Spy x Family
        { userId: "user_007", username: "SpyLover", rating: 9, comment: "Wholesome and hilarious! Anya is the cutest!", timestamp: "2024-11-10T20:15:00Z", helpful: 41 },
        { userId: "user_008", username: "FamilyFirst", rating: 8, comment: "Perfect blend of comedy and heartwarming moments.", timestamp: "2024-11-07T14:45:00Z", helpful: 29 }
    ],
    4: [ // One Piece
        { userId: "user_009", username: "PirateKing", rating: 10, comment: "The greatest adventure anime of all time!", timestamp: "2024-11-13T08:00:00Z", helpful: 134 },
        { userId: "user_010", username: "LuffyFan", rating: 9, comment: "Long but totally worth it. Every arc is amazing!", timestamp: "2024-11-12T16:30:00Z", helpful: 98 }
    ],
    7: [ // Death Note
        { userId: "user_011", username: "KiraLight", rating: 10, comment: "Psychological thriller masterpiece. Light vs L is legendary!", timestamp: "2024-11-11T10:20:00Z", helpful: 102 },
        { userId: "user_012", username: "DetectiveL", rating: 9, comment: "Best cat and mouse game in anime history.", timestamp: "2024-11-10T13:40:00Z", helpful: 76 }
    ]
};

// Calculate average rating for an anime
function calculateAverageRating(animeId) {
    const reviews = reviewsData[animeId];
    if (!reviews || reviews.length === 0) {
        return null; // No reviews yet
    }
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / reviews.length;
    return Math.round(average * 10) / 10; // Round to 1 decimal place
}

// Get review count for an anime
function getReviewCount(animeId) {
    const reviews = reviewsData[animeId];
    return reviews ? reviews.length : 0;
}

// Get all reviews for an anime (sorted by helpful count)
function getAnimeReviews(animeId, sortBy = 'helpful') {
    const reviews = reviewsData[animeId];
    if (!reviews) return [];
    
    const reviewsCopy = [...reviews];
    
    switch(sortBy) {
        case 'helpful':
            return reviewsCopy.sort((a, b) => b.helpful - a.helpful);
        case 'recent':
            return reviewsCopy.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        case 'rating':
            return reviewsCopy.sort((a, b) => b.rating - a.rating);
        default:
            return reviewsCopy;
    }
}

// Add a new review
function addReview(animeId, userId, username, rating, comment) {
    if (!reviewsData[animeId]) {
        reviewsData[animeId] = [];
    }
    
    // Check if user already reviewed
    const existingReview = reviewsData[animeId].find(r => r.userId === userId);
    if (existingReview) {
        return { success: false, message: "You have already reviewed this anime" };
    }
    
    const newReview = {
        userId: userId,
        username: username,
        rating: rating,
        comment: comment,
        timestamp: new Date().toISOString(),
        helpful: 0
    };
    
    reviewsData[animeId].push(newReview);
    
    // Update anime rating in allAnimeData
    const anime = allAnimeData.find(a => a.id === animeId);
    if (anime) {
        anime.rating = calculateAverageRating(animeId);
    }
    
    // Save to localStorage
    saveReviewsToLocalStorage();
    
    return { success: true, message: "Review added successfully", review: newReview };
}

// Mark review as helpful
function markReviewHelpful(animeId, userId) {
    const reviews = reviewsData[animeId];
    if (!reviews) return false;
    
    const review = reviews.find(r => r.userId === userId);
    if (review) {
        // Check if current user already marked as helpful (using localStorage)
        const helpfulKey = `helpful_${animeId}_${userId}`;
        if (localStorage.getItem(helpfulKey)) {
            return { success: false, message: "You already marked this as helpful" };
        }
        
        review.helpful++;
        localStorage.setItem(helpfulKey, 'true');
        saveReviewsToLocalStorage();
        return { success: true, helpful: review.helpful };
    }
    
    return { success: false, message: "Review not found" };
}

// Save reviews to localStorage
function saveReviewsToLocalStorage() {
    try {
        localStorage.setItem('animetube_reviews', JSON.stringify(reviewsData));
    } catch (e) {
        console.error('Error saving reviews:', e);
    }
}

// Load reviews from localStorage
function loadReviewsFromLocalStorage() {
    try {
        const saved = localStorage.getItem('animetube_reviews');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(reviewsData, parsed);
        }
    } catch (e) {
        console.error('Error loading reviews:', e);
    }
}

// Initialize reviews on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        loadReviewsFromLocalStorage();
        
        // Update anime ratings based on reviews
        allAnimeData.forEach(anime => {
            const avgRating = calculateAverageRating(anime.id);
            if (avgRating !== null) {
                anime.rating = avgRating;
            }
        });
    });
}

// Get rating distribution
function getRatingDistribution(animeId) {
    const reviews = reviewsData[animeId];
    if (!reviews || reviews.length === 0) return null;
    
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 };
    reviews.forEach(review => {
        distribution[review.rating]++;
    });
    
    return distribution;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        reviewsData,
        calculateAverageRating,
        getReviewCount,
        getAnimeReviews,
        addReview,
        markReviewHelpful,
        getRatingDistribution,
        saveReviewsToLocalStorage,
        loadReviewsFromLocalStorage
    };
}
