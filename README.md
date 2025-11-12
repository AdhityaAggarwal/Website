# AnimeTube# AnimeTube# AnimeTube



A modern anime streaming platform with a sleek dark theme and intuitive navigation.



## FeaturesA modern anime streaming platform with a sleek dark theme and intuitive navigation.A modern anime streaming platform with a sleek dark theme and intuitive navigation.



- Modern dark theme with orange accents  

- Responsive navbar with dropdown menus

- Grid-based genre selection## Features## Features

- Smooth hover effects and transitions

- Hero slider with automatic rotation

- Multiple content sections with horizontal scrolling

- Touch swipe support for mobile devices- Modern dark theme with orange accents- Modern dark theme with orange accents



## Technologies Used- Responsive navbar with dropdown menus- Responsive navbar with dropdown menus



- HTML5- Grid-based genre selection- Grid-based genre selection

- CSS3 (CSS Grid, Flexbox)

- **Vanilla JavaScript (ES6+)** - No frameworks!- Smooth hover effects and transitions- Smooth hover effects and transitions

- Pure static website - No backend required!

- Hero slider with automatic rotation

## Quick Start

- Multiple content sections with horizontal scrolling## Setup Instructions

**Easiest way:** Double-click `start-server.bat` (Windows) or run `./start-server.sh` (Mac/Linux)

- Touch swipe support for mobile devices

The website will open automatically at `http://localhost:8000`

### Prerequisites

## Alternative Running Options

## Technologies Used- Node.js installed on your system

### Option 1: Direct Browser

Open `public/index.html` directly (some features may be limited)



### Option 2: Python HTTP Server- HTML5### Installation

```bash

cd public- CSS3 (CSS Grid, Flexbox)

python -m http.server 8000

```- JavaScript (ES6+)1. Navigate to the project directory:

Then open `http://localhost:8000`

- jQuery 3.7.1```bash

### Option 3: VS Code Live Server

Right-click `public/index.html` → "Open with Live Server"- Pure static website - No backend framework required!cd "g:/coding/Animetube-updated - Copy"



## Project Structure```



```## Running the Website

public/          # Main website files

├── index.html   # Main page2. Install dependencies:

├── css/         # Stylesheets  

└── js/          # JavaScript filesThis is a **static website** that doesn't require Node.js or any backend framework. You have multiple options to run it:```bash

```

npm install

## Deployment

### Option 1: Simple File Browser (Quick Test)```

Works on any static hosting:

- GitHub Pages

- Netlify  

- VercelSimply open `public/index.html` directly in your web browser. This works for basic testing but some features may not work due to browser security restrictions.### Running the Server

- Cloudflare Pages



No build process needed - just upload the `public` folder!

### Option 2: Using the Provided Scripts (Recommended)Start the server with:

## Browser Support

```bash

✅ Chrome/Edge/Firefox/Safari (latest versions)  

✅ Mobile browsersThe easiest way to run the site locally with a proper server:npm start



## License```



MIT#### On Windows:


1. Double-click `start-server.bat`The server will run on `http://localhost:3000`

2. The site will automatically open in your default browser at `http://localhost:8000`

You can also specify a custom port:

#### On macOS/Linux:```bash

1. Make the script executable (first time only):PORT=8080 npm start

   ```bash```

   chmod +x start-server.sh

   ```## Project Structure

2. Run the script:

   ```bash```

   ./start-server.shAnimetube-updated - Copy/

   ```├── public/

3. Open your browser to `http://localhost:8000`│   ├── css/

│   │   └── style.css

**Note:** These scripts use Python's built-in HTTP server. Most systems have Python pre-installed. If not, download it from [python.org](https://www.python.org/downloads/).│   ├── js/

│   │   └── dropdown.js

### Option 3: Using Python HTTP Server Manually│   └── index.html

├── images/

1. Navigate to the public directory:├── server.js

   ```bash├── package.json

   cd public└── README.md

   ``````



2. Start the server:## Technologies Used

   ```bash

   # Python 3- HTML5

   python -m http.server 8000- CSS3 (CSS Grid, Flexbox)

   - JavaScript

   # Or on some systems- Node.js

   python3 -m http.server 8000- Express.js

   ```

3. Open your browser to `http://localhost:8000`

### Option 4: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `public/index.html`
3. Select "Open with Live Server"

### Option 5: Using Any Other Web Server

You can use any static file server like:
- XAMPP
- WAMP
- nginx
- Apache
- Live Server (npm package)

Simply point the server to the `public` folder.

## Project Structure

```
Animetube-updated - Copy/
├── public/                    # Main web directory
│   ├── css/
│   │   └── style.css         # All styling
│   ├── js/
│   │   ├── dropdown.js       # Navigation dropdown logic
│   │   └── content.js        # Content loading & animations
│   └── index.html            # Main HTML file
├── images/                    # Image assets
├── start-server.bat          # Windows launch script
├── start-server.sh           # Unix/Mac launch script
├── server.js                 # [DEPRECATED] Old Node.js server
├── package.json              # [DEPRECATED] Old Node.js config
└── README.md                 # This file
```

## Development Notes

### jQuery Integration

This project uses jQuery 3.7.1 for:
- DOM manipulation and traversal
- Event handling
- Animations and effects
- Cross-browser compatibility

The jQuery library is loaded via CDN in the HTML file, so no installation is needed.

### JavaScript Files

1. **dropdown.js** - Handles:
   - Category dropdown menu
   - Genre selection
   - Mobile navigation toggle
   - Click-outside-to-close functionality

2. **content.js** - Handles:
   - Hero slider auto-rotation
   - Content section population
   - Horizontal scrolling controls
   - Scroll animations
   - Parallax effects
   - Touch swipe support

### No Build Process Required

Unlike the original Node.js version, this updated version:
- ✅ No npm install needed
- ✅ No build process required
- ✅ No dependencies to manage
- ✅ Works on any static file server
- ✅ Can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend API integration for dynamic content
- User authentication and profiles
- Real anime data integration
- Video player implementation
- Watchlist persistence
- Search functionality

## License

MIT
