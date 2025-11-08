document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('category');
  const dropdown = document.querySelector('.dropdown-content');
  if (!btn || !dropdown) return;

  // Apply initial inline styles
  dropdown.style.position = 'absolute';
  dropdown.style.display = 'none';
  dropdown.style.zIndex = '9999';

  function positionDropdown() {
    const rect = btn.getBoundingClientRect();
    const left = rect.left + window.pageXOffset;

    // Align to the navbar bottom so the dropdown touches the navbar
    const nav = document.querySelector('.navbar');
    const topRect = nav ? nav.getBoundingClientRect() : rect;
    const top = topRect.bottom + window.pageYOffset;

    // Override any CSS margin so it sits flush against the navbar
    dropdown.style.marginTop = '0px';

    // Place dropdown below the navbar/button
    dropdown.style.left = `${left}px`;
    dropdown.style.top = `${top}px`;

    // Keep it within viewport horizontally if possible
    const dropdownRect = dropdown.getBoundingClientRect();
    const overflowRight = dropdownRect.right - window.innerWidth;
    if (overflowRight > 0) {
      dropdown.style.left = `${Math.max(8, left - overflowRight - 8)}px`;
    }
  }

  // Track dropdown state
  let isOpen = false;

  // Toggle visibility when button is clicked
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    
    if (isOpen) {
      btn.classList.add('active');
      positionDropdown();
      dropdown.style.display = 'block';
      // Trigger animation after display block
      setTimeout(() => dropdown.classList.add('show'), 10);
    } else {
      btn.classList.remove('active');
      dropdown.classList.remove('show');
      // Wait for animation to finish before hiding
      setTimeout(() => dropdown.style.display = 'none', 300);
    }
  });

  // Hide when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && e.target !== btn && !dropdown.contains(e.target)) {
      isOpen = false;
      btn.classList.remove('active');
      dropdown.classList.remove('show');
      setTimeout(() => dropdown.style.display = 'none', 300);
    }
  });

  // Toggle genre button active state on click
  dropdown.addEventListener('click', (e) => {
    const genreBtn = e.target.closest('.genre-btn');
    if (!genreBtn) return;
    // Toggle active class
    genreBtn.classList.toggle('active');
    // Prevent clicks inside dropdown from closing it
    e.stopPropagation();
  });

  // Handle sidebar navigation buttons (Browse all, Release Calendar, Music Videos)
  dropdown.addEventListener('click', (e) => {
    const sidebarBtn = e.target.closest('.sidebar-column .table-btn');
    if (!sidebarBtn) return;
    
    // Get button text to determine which page to navigate to
    const btnText = sidebarBtn.textContent.trim();
    
    // For now, just log the navigation (you can replace this with actual navigation later)
    console.log(`Navigate to: ${btnText}`);
    
    // TODO: Add navigation logic here when pages are ready
    // Example:
    // if (btnText === 'Browse all') window.location.href = '/browse';
    // if (btnText === 'Release Calendar') window.location.href = '/calendar';
    // if (btnText === 'Music Videos and Concerts') window.location.href = '/music';
    
    // Close dropdown after click
    dropdown.style.display = 'none';
    e.stopPropagation();
  });

  // Reposition on resize/scroll when visible
  window.addEventListener('resize', () => {
    if (getComputedStyle(dropdown).display !== 'none') positionDropdown();
  });
  window.addEventListener('scroll', () => {
    if (getComputedStyle(dropdown).display !== 'none') positionDropdown();
  });

  // Mobile navigation dropdown toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const centerNavDropdown = document.querySelector('.center-nav-dropdown');
  
  if (mobileNavToggle && centerNavDropdown) {
    let mobileMenuOpen = false;
    
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Close category dropdown when opening mobile menu
      if (isOpen) {
        isOpen = false;
        btn.classList.remove('active');
        dropdown.classList.remove('show');
        setTimeout(() => dropdown.style.display = 'none', 300);
      }
      
      mobileMenuOpen = !mobileMenuOpen;
      mobileNavToggle.classList.toggle('active');
      
      if (mobileMenuOpen) {
        centerNavDropdown.style.display = 'flex';
        setTimeout(() => centerNavDropdown.classList.add('active'), 10);
      } else {
        centerNavDropdown.classList.remove('active');
        setTimeout(() => centerNavDropdown.style.display = 'none', 300);
      }
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenuOpen && !mobileNavToggle.contains(e.target) && !centerNavDropdown.contains(e.target)) {
        mobileMenuOpen = false;
        mobileNavToggle.classList.remove('active');
        centerNavDropdown.classList.remove('active');
        setTimeout(() => centerNavDropdown.style.display = 'none', 300);
      }
    });
  }
});