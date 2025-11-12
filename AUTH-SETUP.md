# AnimeTube Authentication Setup

## Features

✅ **Login/Signup Page** with modern UI
✅ **Google Sign-In Integration** (ready for production setup)
✅ **Email/Password Authentication** (frontend demo)
✅ **Remember Me** functionality
✅ **Profile Icon** indicator when logged in
✅ **Responsive Design** for all devices

## How It Works

### Current Implementation (Demo)
- The authentication is **client-side only** using `localStorage`
- Perfect for testing and prototyping
- User data is stored locally in the browser

### Profile Icon Behavior
- **Not logged in**: Clicking the profile icon redirects to `auth.html`
- **Logged in**: Shows a small orange dot indicator and displays user info on click
- **Logout**: Click profile icon when logged in to log out

## Files Created

```
├── auth.html          # Login/Signup page
├── css/
│   └── auth.css       # Authentication page styles
└── js/
    └── auth.js        # Authentication logic
```

## Modified Files

- `index.html` - Added ID to profile button
- `js/dropdown.js` - Added profile click handler and login status check
- `css/style.css` - Added login indicator dot styles

## Setting Up Google Authentication (Production)

To enable real Google Sign-In:

### 1. Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add your domain to "Authorized JavaScript origins"
6. Copy your Client ID

### 2. Add Google Sign-In Script
Add this to `auth.html` in the `<head>`:
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### 3. Update JavaScript
In `js/auth.js`, replace the `initGoogleAuth()` function:

```javascript
function initGoogleAuth() {
    google.accounts.id.initialize({
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        callback: handleGoogleCallback
    });
    
    google.accounts.id.renderButton(
        document.getElementById('google-signin'),
        { theme: 'filled_black', size: 'large', text: 'continue_with' }
    );
}

function handleGoogleCallback(response) {
    // response.credential contains the JWT token
    const userData = parseJwt(response.credential);
    
    // Send to your backend
    fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('animetube_user', JSON.stringify(data.user));
        window.location.href = 'index.html';
    });
}
```

### 4. Backend Setup (Required for Production)

You'll need a backend server to:
- Verify Google tokens
- Store user data in a database
- Issue session tokens/JWT
- Protect routes

Example with Node.js/Express:

```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    
    // Create or update user in database
    const user = await User.findOrCreate({
        email: payload.email,
        name: payload.name,
        googleId: payload.sub
    });
    
    // Create session
    req.session.userId = user.id;
    
    res.json({ user: user });
});
```

## Security Notes

⚠️ **Current Implementation is for DEMO ONLY**

For production:
1. ✅ Use HTTPS
2. ✅ Implement backend authentication
3. ✅ Use httpOnly cookies for tokens (not localStorage)
4. ✅ Add CSRF protection
5. ✅ Validate all inputs server-side
6. ✅ Hash passwords with bcrypt
7. ✅ Implement rate limiting
8. ✅ Add email verification
9. ✅ Implement password reset flow

## Testing

1. Open `index.html` in your browser
2. Click the profile icon
3. Try signing up with email/password
4. After login, you'll see the orange dot on the profile icon
5. Click profile icon again to log out

## Next Steps

- [ ] Create user profile page
- [ ] Add watchlist functionality (requires login)
- [ ] Add continue watching sync (requires login)
- [ ] Implement password reset
- [ ] Add email verification
- [ ] Set up backend API
- [ ] Deploy to production server
