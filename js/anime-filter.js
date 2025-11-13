// Anime Filter and Search Functionality

let selectedCategories = [];
let matchAllMode = false;
let searchQuery = '';
let allCategories = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on a page with anime-browse-section
    const animeBrowseSection = document.querySelector('.anime-browse-section');
    if (!animeBrowseSection) {
        console.log('Anime browse section not found, skipping anime-filter initialization');
        return;
    }
    
    console.log('DOM Content Loaded - Starting anime filter initialization');
    console.log('allAnimeData:', typeof allAnimeData !== 'undefined' ? allAnimeData.length + ' anime found' : 'NOT FOUND');
    allCategories = getAllCategories();
    console.log('allCategories:', allCategories);
    initializeCategoryDropdown();
    initializeDropdownGenres();
    loadAnimeFromURL();
    displayAllAnime();
    setupEventListeners();
    console.log('Anime filter initialization complete');
});

// Setup all event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('anime-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const matchAllToggle = document.getElementById('match-all-toggle');
    const clearCategoriesBtn = document.getElementById('clear-categories');

    // Search input - show dropdown on focus
    searchInput.addEventListener('focus', function() {
        console.log('Search input focused');
        const dropdown = document.getElementById('category-dropdown');
        console.log('Dropdown element:', dropdown);
        dropdown.classList.add('active');
        console.log('Active class added, classes:', dropdown.className);
    });

    // Search input - filter by text
    searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAnime();
        toggleClearButton();
    });

    // Clear search button
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchQuery = '';
        filterAnime();
        toggleClearButton();
    });

    // Match all toggle
    matchAllToggle.addEventListener('change', function(e) {
        matchAllMode = e.target.checked;
        filterAnime();
    });

    // Clear all categories
    clearCategoriesBtn.addEventListener('click', function() {
        selectedCategories = [];
        updateSelectedCategoriesDisplay();
        updateCategoryButtons();
        filterAnime();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('category-dropdown');
        const searchContainer = document.querySelector('.search-container');
        
        if (!searchContainer.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Initialize category dropdown with all categories
function initializeCategoryDropdown() {
    const categoryGrid = document.getElementById('category-grid');
    categoryGrid.innerHTML = '';

    allCategories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.setAttribute('data-category', category);
        categoryItem.innerHTML = `
            <span class="category-name">${category}</span>
            <span class="category-count">${getAnimeByCategoryCount(category)}</span>
        `;

        categoryItem.addEventListener('click', function() {
            toggleCategorySelection(category, this);
        });

        categoryGrid.appendChild(categoryItem);
    });
}

// Toggle category selection
function toggleCategorySelection(category, element) {
    const isSelected = element.classList.contains('selected');
    
    if (isSelected) {
        // Deselect
        element.classList.remove('selected');
        selectedCategories = selectedCategories.filter(cat => cat !== category);
    } else {
        // Select
        element.classList.add('selected');
        if (!selectedCategories.includes(category)) {
            selectedCategories.push(category);
        }
    }
    
    updateSelectedCategoriesDisplay();
    filterAnime();
}

// Initialize genres in navbar dropdown
function initializeDropdownGenres() {
    const dropdownGenresGrid = document.getElementById('dropdown-genres-grid');
    if (!dropdownGenresGrid) return;

    dropdownGenresGrid.innerHTML = '';

    // Filter to show only main genres (not dubbed categories)
    const mainGenres = allCategories.filter(cat => 
        !cat.includes('Dubbed') && !cat.includes('Hindi') && !cat.includes('Tamil') && !cat.includes('Telugu')
    );

    mainGenres.forEach(genre => {
        const genreBtn = document.createElement('a');
        genreBtn.className = 'table-btn genre-btn';
        genreBtn.textContent = genre;
        genreBtn.href = `anime.html?category=${encodeURIComponent(genre)}`;
        dropdownGenresGrid.appendChild(genreBtn);
    });
}

// Update selected categories display (chips)
function updateSelectedCategoriesDisplay() {
    const container = document.getElementById('selected-categories');
    container.innerHTML = '';

    if (selectedCategories.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';

    selectedCategories.forEach(category => {
        const chip = document.createElement('div');
        chip.className = 'category-chip';
        chip.innerHTML = `
            <span>${category}</span>
            <button class="chip-remove" data-category="${category}" aria-label="Remove ${category}">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        `;

        const removeBtn = chip.querySelector('.chip-remove');
        removeBtn.addEventListener('click', function() {
            const cat = this.getAttribute('data-category');
            selectedCategories = selectedCategories.filter(c => c !== cat);
            updateSelectedCategoriesDisplay();
            updateCategoryButtons();
            filterAnime();
        });

        container.appendChild(chip);
    });
}

// Update category button states based on selected categories
function updateCategoryButtons() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (selectedCategories.includes(category)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Get count of anime in a category
function getAnimeByCategoryCount(category) {
    return allAnimeData.filter(anime => anime.categories.includes(category)).length;
}

// Display all anime
function displayAllAnime() {
    const grid = document.getElementById('anime-grid');
    grid.innerHTML = '';

    allAnimeData.forEach(anime => {
        const card = createAnimeCard(anime);
        grid.appendChild(card);
    });

    updateResultsCount(allAnimeData.length);
}

// Create anime card HTML
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.setAttribute('data-id', anime.id);
    
    // Store categories as data attribute for filtering
    card.setAttribute('data-categories', JSON.stringify(anime.categories));
    card.setAttribute('data-title', anime.title.toLowerCase());

    // Get review count
    const reviewCount = getReviewCount ? getReviewCount(anime.id) : 0;

    card.innerHTML = `
        <a href="anime-detail.html?id=${anime.id}" class="anime-card-link">
            <div class="anime-card-image">
                <img src="${anime.image}" alt="${anime.title}" loading="lazy">
                <div class="anime-card-overlay">
                    <button class="play-btn" aria-label="Play ${anime.title}" onclick="event.preventDefault();">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                        </svg>
                    </button>
                    <button class="watchlist-btn" aria-label="Add to watchlist" onclick="event.preventDefault();">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2h12v20l-6-4-6 4V2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="anime-rating">
                    <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                    </svg>
                    <span>${anime.rating}</span>
                </div>
            </div>
            <div class="anime-card-info">
                <h3 class="anime-card-title">${anime.title}</h3>
                <div class="anime-card-meta">
                    <span class="anime-year">${anime.year}</span>
                    <span class="anime-episodes">${anime.episodes} ${anime.episodes === 1 ? 'Episode' : 'Episodes'}</span>
                    ${reviewCount > 0 ? `<span class="anime-reviews">${reviewCount} Reviews</span>` : ''}
                </div>
                <div class="anime-categories">
                    ${anime.categories.slice(0, 3).map(cat => `<span class="anime-category-tag">${cat}</span>`).join('')}
                    ${anime.categories.length > 3 ? `<span class="anime-category-more">+${anime.categories.length - 3}</span>` : ''}
                </div>
            </div>
        </a>
    `;

    return card;
}

// Filter anime based on selected categories and search query
function filterAnime() {
    const grid = document.getElementById('anime-grid');
    const noResults = document.getElementById('no-results');
    const cards = grid.querySelectorAll('.anime-card');

    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.getAttribute('data-title');
        const categories = JSON.parse(card.getAttribute('data-categories'));

        let matchesSearch = true;
        let matchesCategories = true;

        // Check search query
        if (searchQuery) {
            matchesSearch = title.includes(searchQuery);
        }

        // Check categories
        if (selectedCategories.length > 0) {
            if (matchAllMode) {
                // ALL mode: anime must have all selected categories
                matchesCategories = selectedCategories.every(cat => categories.includes(cat));
            } else {
                // ANY mode: anime must have at least one selected category
                matchesCategories = selectedCategories.some(cat => categories.includes(cat));
            }
        }

        // Show/hide card based on filters
        if (matchesSearch && matchesCategories) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'flex';
        grid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        grid.style.display = 'grid';
    }

    updateResultsCount(visibleCount);
    updateActiveFiltersText();
}

// Update results count
function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (count === 0) {
        resultsCount.textContent = 'No anime found';
    } else if (count === 1) {
        resultsCount.textContent = '1 anime';
    } else {
        resultsCount.textContent = `${count} anime`;
    }
}

// Update active filters text
function updateActiveFiltersText() {
    const activeFiltersText = document.getElementById('active-filters-text');
    
    if (selectedCategories.length === 0 && !searchQuery) {
        activeFiltersText.textContent = 'Showing all anime';
        return;
    }

    let text = 'Showing anime';
    
    if (searchQuery) {
        text += ` matching "${searchQuery}"`;
    }
    
    if (selectedCategories.length > 0) {
        if (searchQuery) text += ' and';
        text += ` in ${matchAllMode ? 'ALL' : 'ANY'} of: ${selectedCategories.join(', ')}`;
    }
    
    activeFiltersText.textContent = text;
}

// Toggle clear search button visibility
function toggleClearButton() {
    const clearBtn = document.getElementById('clear-search');
    const searchInput = document.getElementById('anime-search');
    
    if (searchInput.value.length > 0) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }
}

// Load anime from URL parameters
function loadAnimeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        // Decode and add category to selected
        const decodedCategory = decodeURIComponent(categoryParam);
        if (allCategories.includes(decodedCategory)) {
            selectedCategories = [decodedCategory];
            updateSelectedCategoriesDisplay();
            updateCategoryCheckboxes();
            
            // Show category dropdown initially if coming from a category link
            const dropdown = document.getElementById('category-dropdown');
            setTimeout(() => {
                dropdown.classList.add('active');
            }, 500);
        }
    }
}

// Sort functionality (optional - can be expanded)
const sortBtn = document.getElementById('sort-btn');
if (sortBtn) {
    sortBtn.addEventListener('click', function() {
        // TODO: Implement sort menu
        console.log('Sort functionality - to be implemented');
    });
}
