@echo off
echo ======================================
echo    AnimeTube - Local Web Server
echo ======================================
echo.
echo Starting local web server...
echo.
echo The server will open in your default browser.
echo Press Ctrl+C to stop the server.
echo.
echo ======================================
echo.

cd public

:: Try Python 3 first
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server with Python 3...
    start http://localhost:8000
    python -m http.server 8000
    goto :eof
)

:: Try py command (Python launcher)
py --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server with Python launcher...
    start http://localhost:8000
    py -m http.server 8000
    goto :eof
)

:: If no Python found
echo ERROR: Python is not installed or not in PATH.
echo.
echo Please install Python from https://www.python.org/downloads/
echo Or open 'public/index.html' directly in your browser.
echo.
pause
