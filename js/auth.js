// Authentication JavaScript with Google Sign-In Integration
// Pure Vanilla JavaScript - No backend required for demo

// IMPORTANT: Replace this with your actual Google Client ID
// Get it from: https://console.cloud.google.com/
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// For demo purposes, you can use this test Client ID (limited functionality)
// Or get your own from Google Cloud Console
const USE_DEMO_MODE = true; // Set to false when you have your own Client ID

document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth page loaded');

    // Initialize Google Sign-In when the script loads
    initializeGoogleSignIn();

    // Tab Switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            if (targetTab === 'login') {
                document.getElementById('login-form').classList.add('active');
            } else {
                document.getElementById('signup-form').classList.add('active');
            }
        });
    });

    // Email/Password Login
    const loginForm = document.getElementById('email-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            handleEmailLogin(email, password, rememberMe);
        });
    }

    // Load saved credentials if remember me was checked
    loadSavedCredentials();

    // Email/Password Signup
    const signupForm = document.getElementById('email-signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const acceptTerms = document.getElementById('accept-terms').checked;
            
            handleEmailSignup(name, email, password, confirmPassword, acceptTerms);
        });
    }

    // Check if coming from a specific redirect
    const urlParams = new URLSearchParams(window.location.search);
    const redirectFrom = urlParams.get('from');
    
    if (redirectFrom) {
        showMessage('Please sign in to continue', 'info', 'login-form');
    }
});

// ============================================
// GOOGLE SIGN-IN INTEGRATION
// ============================================

function initializeGoogleSignIn() {
    // Check if Google Sign-In library is loaded
    if (typeof google === 'undefined') {
        console.warn('Google Sign-In library not loaded yet, retrying...');
        setTimeout(initializeGoogleSignIn, 500);
        return;
    }

    if (USE_DEMO_MODE) {
        console.log('Running in DEMO mode - Google Sign-In requires your own Client ID');
        showDemoGoogleButtons();
        return;
    }

    try {
        // Initialize Google Identity Services
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
            auto_select: false,
            cancel_on_tap_outside: true
        });

        // Render Sign In button
        google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            {
                theme: 'filled_blue',
                size: 'large',
                type: 'standard',
                text: 'continue_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                width: 400
            }
        );

        // Render Sign Up button (same callback, different container)
        google.accounts.id.renderButton(
            document.getElementById('google-signup-button'),
            {
                theme: 'filled_blue',
                size: 'large',
                type: 'standard',
                text: 'signup_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                width: 400
            }
        );

        console.log('Google Sign-In initialized successfully');
    } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        showDemoGoogleButtons();
    }
}

function handleGoogleSignIn(response) {
    console.log('Google Sign-In response received');
    
    try {
        // Decode the JWT token to get user info
        const userData = parseJwtToken(response.credential);
        
        console.log('User signed in with Google:', userData);
        
        // Create user object
        const user = {
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            googleId: userData.sub,
            loggedIn: true,
            loginTime: new Date().toISOString(),
            loginMethod: 'google'
        };
        
        // Store user data in localStorage
        localStorage.setItem('animetube_user', JSON.stringify(user));
        
        showMessage('Successfully signed in with Google! Redirecting...', 'success', 'login-form');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        
    } catch (error) {
        console.error('Error handling Google Sign-In:', error);
        showMessage('Error signing in with Google. Please try again.', 'error', 'login-form');
    }
}

// Parse JWT token (Google returns a JWT)
function parseJwtToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT token:', error);
        throw error;
    }
}

// Demo mode - Show custom buttons with instructions
function showDemoGoogleButtons() {
    const signInContainer = document.getElementById('google-signin-button');
    const signUpContainer = document.getElementById('google-signup-button');
    
    const demoButton = `
        <button class="google-btn demo-google-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google (Demo)</span>
        </button>
    `;
    
    if (signInContainer) {
        signInContainer.innerHTML = demoButton;
        signInContainer.querySelector('.demo-google-btn').addEventListener('click', showGoogleSetupInstructions);
    }
    
    if (signUpContainer) {
        signUpContainer.innerHTML = demoButton.replace('Continue', 'Sign up');
        signUpContainer.querySelector('.demo-google-btn').addEventListener('click', showGoogleSetupInstructions);
    }
}

function showGoogleSetupInstructions() {
    const instructions = `
To enable Google Sign-In:

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable "Google Identity Services"
4. Create OAuth 2.0 Client ID
5. Add your domain to "Authorized JavaScript origins"
6. Copy your Client ID
7. Update GOOGLE_CLIENT_ID in js/auth.js
8. Set USE_DEMO_MODE = false

For now, use email/password authentication below.
    `.trim();
    
    alert(instructions);
}

// ============================================
// EMAIL/PASSWORD AUTHENTICATION
// ============================================

function handleEmailLogin(email, password, rememberMe) {
    console.log('Login attempt:', email);
    
    // Basic validation
    if (!email || !password) {
        showMessage('Please enter both email and password', 'error', 'login-form');
        return;
    }
    
    // For demo purposes, accept any email/password
    // In production, verify with backend
    const userData = {
        email: email,
        name: email.split('@')[0],
        loggedIn: true,
        loginTime: new Date().toISOString(),
        loginMethod: 'email',
        rememberMe: rememberMe
    };
    
    // Store in localStorage
    localStorage.setItem('animetube_user', JSON.stringify(userData));
    
    // Handle Remember Me functionality
    if (rememberMe) {
        // Save email for future logins
        localStorage.setItem('animetube_remembered_email', email);
    } else {
        // Remove saved email if unchecked
        localStorage.removeItem('animetube_remembered_email');
    }
    
    showMessage('Login successful! Redirecting...', 'success', 'login-form');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function handleEmailSignup(name, email, password, confirmPassword, acceptTerms) {
    console.log('Signup attempt:', email);
    
    // Validation
    if (!acceptTerms) {
        showMessage('Please accept the terms and conditions', 'error', 'signup-form');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error', 'signup-form');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error', 'signup-form');
        return;
    }
    
    if (!name || !email) {
        showMessage('Please fill in all fields', 'error', 'signup-form');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error', 'signup-form');
        return;
    }
    
    // For demo purposes, create account
    // In production, send to backend
    const userData = {
        name: name,
        email: email,
        loggedIn: true,
        loginTime: new Date().toISOString(),
        loginMethod: 'email'
    };
    
    // Store in localStorage
    localStorage.setItem('animetube_user', JSON.stringify(userData));
    
    showMessage('Account created successfully! Redirecting...', 'success', 'signup-form');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function loadSavedCredentials() {
    const rememberedEmail = localStorage.getItem('animetube_remembered_email');
    
    if (rememberedEmail) {
        const loginEmailInput = document.getElementById('login-email');
        const rememberMeCheckbox = document.getElementById('remember-me');
        
        if (loginEmailInput) {
            loginEmailInput.value = rememberedEmail;
        }
        
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }
}

function showMessage(message, type, formId) {
    // Remove any existing messages in the specific form
    const form = document.getElementById(formId);
    if (!form) return;
    
    const existingMsg = form.querySelector('.auth-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = `auth-message ${type}`;
    msgDiv.textContent = message;
    
    // Insert at the top of form
    const formElement = form.querySelector('form') || form;
    formElement.insertBefore(msgDiv, formElement.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        msgDiv.remove();
    }, 5000);
}
