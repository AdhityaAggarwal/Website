// Forgot Password JavaScript
// Pure Vanilla JavaScript with EmailJS integration

// EmailJS Configuration
// Get your EmailJS credentials from: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

// Set to false when you have configured EmailJS
const USE_DEMO_MODE = true;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Forgot password page loaded');

    // Initialize EmailJS if not in demo mode
    if (!USE_DEMO_MODE && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const resetForm = document.getElementById('reset-password-form');
    
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('reset-email').value;
            
            handlePasswordReset(email);
        });
    }
});

function handlePasswordReset(email) {
    console.log('Password reset requested for:', email);
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (USE_DEMO_MODE) {
        // Demo mode - simulate sending email
        showMessage('🎯 DEMO MODE: In production, a password reset email would be sent to ' + email, 'info');
        
        // Store reset request in localStorage for demo
        const resetRequest = {
            email: email,
            timestamp: new Date().toISOString(),
            resetToken: generateResetToken()
        };
        localStorage.setItem('password_reset_request', JSON.stringify(resetRequest));
        
        setTimeout(() => {
            showMessage('Password reset link sent! Please check your email.', 'success');
        }, 1500);
        
        // Clear the form
        document.getElementById('reset-email').value = '';
        
        // Redirect to login page after a delay
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 4000);
    } else {
        // Production mode - send actual email via EmailJS
        sendPasswordResetEmail(email);
    }
}

function sendPasswordResetEmail(email) {
    // Show loading state
    const submitBtn = document.querySelector('.auth-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    // Generate reset token
    const resetToken = generateResetToken();
    const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    // Store reset request
    const resetRequest = {
        email: email,
        timestamp: new Date().toISOString(),
        resetToken: resetToken,
        expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour expiry
    };
    localStorage.setItem('password_reset_request', JSON.stringify(resetRequest));
    
    // EmailJS template parameters
    const templateParams = {
        to_email: email,
        user_email: email,
        reset_link: resetLink,
        site_name: 'Animetube',
        expiry_time: '1 hour'
    };
    
    // Send email via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showMessage('Password reset link sent! Please check your email.', 'success');
            
            // Clear the form
            document.getElementById('reset-email').value = '';
            
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Redirect to login page after a delay
            setTimeout(() => {
                window.location.href = 'auth.html';
            }, 3000);
        }, function(error) {
            console.error('Failed to send email:', error);
            showMessage('Failed to send reset email. Please try again later.', 'error');
            
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

function generateResetToken() {
    // Generate a random token for password reset
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

function showMessage(message, type) {
    // Remove any existing messages
    const existingMsg = document.querySelector('.auth-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = `auth-message ${type}`;
    msgDiv.textContent = message;
    
    // Insert at the top of form
    const form = document.getElementById('reset-password-form');
    form.insertBefore(msgDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        msgDiv.remove();
    }, 5000);
}
