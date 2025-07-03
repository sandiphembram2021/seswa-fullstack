# SESWA Full Stack Deployment Guide

## 📁 Project Structure
```
seswa/
├── frontend/          ← React frontend (Vite)
├── server/           ← Node.js backend (Express)
├── package.json      ← Root package.json for deployment
└── DEPLOYMENT.md     ← This file
```

## 🚀 Deployment Options

### Option 1: Render (Recommended)

#### Step 1: Prepare for Deployment
1. Ensure your code is pushed to GitHub
2. Make sure `server/.env` has production values
3. Update `FRONTEND_URL` in server/.env to your deployed frontend URL

#### Step 2: Deploy Backend on Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `seswa-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (uses root)

#### Step 3: Set Environment Variables on Render
Add these environment variables in Render dashboard:
```
MONGODB_URI=mongodb+srv://seswa2003:Seswa@123@cluster0.z4t8igs.mongodb.net/seswa-db?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=seswa-super-secret-jwt-key-2024-production
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seswawb@gmail.com
EMAIL_PASS=your-app-password-here
EMAIL_FROM=noreply@seswa.org
FRONTEND_URL=https://santal-welfare-association-s6yt.vercel.app
ADMIN_EMAIL=seswawb@gmail.com
ADMIN_PASSWORD=admin123
```

#### Step 4: Deploy Frontend on Vercel (Already Done)
Your frontend is already deployed at:
`https://santal-welfare-association-s6yt.vercel.app`

#### Step 5: Update Frontend API Base URL
In your frontend, update the API base URL to point to your Render backend:
```javascript
// In frontend/src/config/api.js or similar
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-app.onrender.com/api'
  : 'http://localhost:5000/api';
```

### Option 2: Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create Heroku App
```bash
heroku create seswa-fullstack
```

#### Step 3: Set Environment Variables
```bash
heroku config:set MONGODB_URI="mongodb+srv://seswa2003:Seswa@123@cluster0.z4t8igs.mongodb.net/seswa-db?retryWrites=true&w=majority"
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=seswa-super-secret-jwt-key-2024-production
heroku config:set FRONTEND_URL=https://santal-welfare-association-s6yt.vercel.app
# Add other environment variables...
```

#### Step 4: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Option 3: VPS (DigitalOcean, AWS, etc.)

#### Step 1: Server Setup
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt update
sudo apt install nginx
```

#### Step 2: Clone and Setup
```bash
git clone https://github.com/your-username/seswa.git
cd seswa
npm run install:all
npm run build
```

#### Step 3: Configure PM2
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'seswa-backend',
    script: 'server/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx
Create `/etc/nginx/sites-available/seswa`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Serve React build files
    location / {
        root /path/to/seswa/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/seswa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Local Development

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Git

### Setup
```bash
# Clone repository
git clone https://github.com/your-username/seswa.git
cd seswa

# Install all dependencies
npm run install:all

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your values

# Start development servers
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📝 Environment Variables

### Required Variables
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

### Optional Variables
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=your-frontend-url
ADMIN_EMAIL=admin@seswa.org
```

## 🔍 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.com/api/health
```

### Frontend Check
Visit your frontend URL and verify:
- ✅ Pages load correctly
- ✅ Contact form works
- ✅ API calls succeed
- ✅ No console errors

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check CORS configuration in `server/server.js`

2. **Database Connection**
   - Verify MongoDB URI is correct
   - Check network access in MongoDB Atlas

3. **Build Failures**
   - Ensure Node.js version compatibility
   - Check for missing dependencies

4. **API Not Working**
   - Verify backend is running
   - Check environment variables
   - Review server logs

### Logs
```bash
# Heroku logs
heroku logs --tail

# PM2 logs
pm2 logs

# Render logs
Check Render dashboard
```

## 📞 Support

For deployment issues, contact:
- Email: seswawb@gmail.com
- Create an issue on GitHub repository

## 🔄 Updates

To update the deployed application:

1. **Render**: Push to GitHub (auto-deploys)
2. **Heroku**: `git push heroku main`
3. **VPS**: `git pull && npm run build && pm2 restart all`
