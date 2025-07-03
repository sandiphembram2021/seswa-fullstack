# 🚀 Single Platform Deployment Guide

Deploy both frontend and backend together on a single platform.

## 📁 How It Works

```
Your App Structure:
├── frontend/          ← React app (builds to frontend/dist)
├── backend/           ← Express server
├── package.json       ← Root deployment config
└── render.yaml        ← Render deployment config

Deployment Flow:
1. Build React app → frontend/dist/
2. Express server serves React files from /
3. API routes available at /api/*
4. Single URL serves everything!
```

## 🌐 Option 1: Render (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for single platform deployment"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `seswa-fullstack`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: Yes

### Step 3: Environment Variables
Add these in Render dashboard:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://seswa2003:seswa2003@cluster0.z4t8igs.mongodb.net/seswa-db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=seswa-super-secret-jwt-key-2024-production
EMAIL_USER=seswawb@gmail.com
ADMIN_EMAIL=seswawb@gmail.com
```

### Step 4: Deploy!
- Render will automatically build and deploy
- Your app will be available at: `https://your-app-name.onrender.com`
- Both frontend and API work from the same URL!

## 🔧 Option 2: Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### Step 2: Deploy
```bash
railway init
railway up
```

### Step 3: Set Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set JWT_SECRET="your-jwt-secret"
```

## ⚡ Option 3: Heroku

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Step 2: Create App
```bash
heroku create seswa-fullstack
```

### Step 3: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb+srv://seswa2003:seswa2003@cluster0.z4t8igs.mongodb.net/seswa-db?retryWrites=true&w=majority&appName=Cluster0"
heroku config:set JWT_SECRET="seswa-super-secret-jwt-key-2024-production"
```

### Step 4: Deploy
```bash
git push heroku main
```

## 🏠 Option 4: VPS/DigitalOcean

### Step 1: Server Setup
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt update && sudo apt install nginx
```

### Step 2: Deploy Code
```bash
git clone https://github.com/your-username/seswa.git
cd seswa
npm run build
```

### Step 3: Start with PM2
```bash
pm2 start backend/server.js --name "seswa-app"
pm2 save
pm2 startup
```

### Step 4: Configure Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
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

## 🧪 Testing Your Deployment

### Local Testing
```bash
# Test the production build locally
npm run build
cd backend
NODE_ENV=production npm start

# Visit http://localhost:5000
# Both frontend and API should work!
```

### Production Testing
```bash
# Test your deployed app
curl https://your-app.onrender.com/api/health
curl https://your-app.onrender.com/
```

## 📊 Deployment Benefits

### ✅ Single Platform Advantages
- **One URL**: Frontend and API on same domain
- **No CORS Issues**: Same-origin requests
- **Simpler Deployment**: One service to manage
- **Cost Effective**: Single hosting plan
- **Easy SSL**: One certificate for everything

### 🎯 Perfect for SESWA
- **Contact Forms**: Work seamlessly
- **API Calls**: No cross-origin issues
- **File Uploads**: Unified file handling
- **Authentication**: Simplified cookie handling

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check build locally first
   npm run build
   ```

2. **API Not Working**
   - Check environment variables
   - Verify MongoDB connection
   - Check server logs

3. **Frontend Not Loading**
   - Ensure `frontend/dist` exists
   - Check static file serving in server.js

4. **Database Connection**
   - Verify MongoDB URI
   - Check IP whitelist in MongoDB Atlas

### Logs
```bash
# Render: Check dashboard logs
# Heroku: heroku logs --tail
# Railway: railway logs
# PM2: pm2 logs
```

## 🎉 Success!

Once deployed, your SESWA app will be available at a single URL:
- **Homepage**: `https://your-app.com/`
- **Contact**: `https://your-app.com/contact`
- **API**: `https://your-app.com/api/health`
- **Admin**: `https://your-app.com/admin`

Everything works from one platform! 🚀
