#!/bin/bash

echo "======================================"
echo "   AnimeTube - Local Web Server"
echo "======================================"
echo ""
echo "Starting local web server..."
echo ""
echo "The server will be available at:"
echo "http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server."
echo ""
echo "======================================"
echo ""

cd public

# Try Python 3
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Starting server with Python..."
    python -m http.server 8000
else
    echo "ERROR: Python is not installed."
    echo ""
    echo "Please install Python or open 'public/index.html' directly in your browser."
    echo ""
    exit 1
fi
