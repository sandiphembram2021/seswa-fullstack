# SESWA Development Environment Startup Script
Write-Host "🚀 Starting SESWA Development Environment" -ForegroundColor Green
Write-Host ""

# Check project structure
Write-Host "📁 Checking project structure..." -ForegroundColor Yellow
if (-not (Test-Path "backend")) {
    Write-Host "❌ Backend folder not found!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path "frontend")) {
    Write-Host "❌ Frontend folder not found!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Project structure verified" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "🔧 Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend dependency installation failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location ..\frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend dependency installation failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Start servers
Write-Host "🚀 Starting development servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 Backend will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 Frontend will run on: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Press Ctrl+C to stop the servers" -ForegroundColor Yellow
Write-Host ""

# Start both servers
try {
    # Start backend in background
    Write-Host "🔧 Starting backend server..." -ForegroundColor Cyan
    $backendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD\backend
        node test-server.js
    }
    
    Start-Sleep -Seconds 3
    
    # Start frontend
    Write-Host "🎨 Starting frontend server..." -ForegroundColor Cyan
    Set-Location frontend
    npm run dev
}
catch {
    Write-Host "❌ Error starting servers: $_" -ForegroundColor Red
}
finally {
    # Cleanup
    if ($backendJob) {
        Stop-Job $backendJob
        Remove-Job $backendJob
    }
}
