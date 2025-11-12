// Dropdown functionality for navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dropdown.js loaded');
    
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const dropdown = document.querySelector('.center-nav-dropdown');
    
    console.log('Mobile toggle element:', mobileToggle);
    console.log('Dropdown element:', dropdown);
    
    if (mobileToggle && dropdown) {
        console.log('Adding click listener to mobile toggle');
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile toggle CLICKED!');
            dropdown.classList.toggle('active');
            
            // Toggle hamburger icon animation
            this.classList.toggle('active');
            
            console.log('Mobile menu toggled:', dropdown.classList.contains('active'));
            console.log('Dropdown classes:', dropdown.className);
        });
    } else {
        console.warn('Mobile toggle or dropdown not found');
        console.log('Mobile toggle:', mobileToggle);
        console.log('Dropdown:', dropdown);
    }
    
    // Category dropdown for all category buttons
    const categoryBtns = document.querySelectorAll('.btn-category');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    console.log('Category buttons found:', categoryBtns.length);
    console.log('Dropdown content element:', dropdownContent);
    
    // Function to position dropdown below category button
    function positionDropdown(button) {
        if (!dropdownContent) return;
        
        const rect = button.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        dropdownContent.style.top = (rect.bottom + scrollTop) + 'px';
        dropdownContent.style.left = rect.left + 'px';
    }
    
    if (categoryBtns.length > 0 && dropdownContent) {
        console.log('Adding click listeners to', categoryBtns.length, 'category buttons');
        categoryBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Category button CLICKED!');
                
                // Position dropdown below the clicked button
                positionDropdown(btn);
                
                dropdownContent.classList.toggle('show');
                console.log('Category dropdown toggled:', dropdownContent.classList.contains('show'));
                console.log('Dropdown content classes:', dropdownContent.className);
            });
        });
        
        // Reposition on window resize
        window.addEventListener('resize', function() {
            if (dropdownContent.classList.contains('show')) {
                const activeBtn = document.querySelector('.btn-category');
                if (activeBtn) positionDropdown(activeBtn);
            }
        });
    } else {
        console.warn('Category buttons or dropdown content not found');
        console.log('Category buttons:', categoryBtns.length);
        console.log('Dropdown content:', dropdownContent);
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // Close category dropdown if clicking outside
        if (dropdownContent && !event.target.closest('.center-nav') && !event.target.closest('.dropdown-content')) {
            dropdownContent.classList.remove('show');
        }
        
        // Close mobile menu if clicking outside
        if (dropdown && !event.target.closest('.mobile-nav-toggle') && !event.target.closest('.center-nav-dropdown')) {
            dropdown.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        }
    });
    
    // Close dropdowns on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (dropdownContent) {
                dropdownContent.classList.remove('show');
            }
            if (dropdown) {
                dropdown.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            }
        }
    });
    
    console.log('Dropdown functionality initialized');
    
    // Check login status and update UI
    function updateLoginStatus() {
        const userData = localStorage.getItem('animetube_user');
        const profileBtn = document.getElementById('profile-btn');
        
        if (userData && profileBtn) {
            const user = JSON.parse(userData);
            // Add logged-in indicator
            profileBtn.classList.add('logged-in');
            profileBtn.title = `Logged in as ${user.name || user.email}`;
            
            // Add a small dot indicator
            if (!profileBtn.querySelector('.login-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'login-indicator';
                profileBtn.appendChild(indicator);
            }
        }
    }
    
    // Call on page load
    updateLoginStatus();
    
    // Profile button - redirect to auth page
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is already logged in
            const userData = localStorage.getItem('animetube_user');
            
            if (userData) {
                // User is logged in - show profile menu or redirect to profile page
                const user = JSON.parse(userData);
                console.log('User is logged in:', user);
                
                // For now, just log them out on click (you can create a profile page instead)
                if (confirm(`Logged in as ${user.name || user.email}\n\nDo you want to log out?`)) {
                    localStorage.removeItem('animetube_user');
                    alert('Logged out successfully!');
                    window.location.reload();
                }
            } else {
                // User not logged in - redirect to auth page
                window.location.href = 'auth.html';
            }
        });
    }
});
