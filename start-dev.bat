@echo off
echo 🚀 Starting SESWA Development Environment
echo.

echo 📁 Checking project structure...
if not exist "backend" (
    echo ❌ Backend folder not found!
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ❌ Frontend folder not found!
    pause
    exit /b 1
)

echo ✅ Project structure verified

echo.
echo 🔧 Installing dependencies...
echo.

echo 📦 Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Backend dependency installation failed!
    pause
    exit /b 1
)

echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ❌ Frontend dependency installation failed!
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Dependencies installed successfully!
echo.

echo 🚀 Starting development servers...
echo.
echo 📍 Backend will run on: http://localhost:5000
echo 📍 Frontend will run on: http://localhost:5173
echo.
echo 💡 Press Ctrl+C to stop the servers
echo.

REM Start both servers using concurrently
call npm run dev

pause
