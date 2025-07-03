# 🌐 Environment Variables Deployment Guide

## 🎯 Overview

This guide shows how to deploy frontend and backend separately using environment variables for proper communication.

## 📁 Architecture

```
Deployment Architecture:
┌─────────────────────────────────────┐
│         Frontend (Vercel)           │
│    https://your-app.vercel.app      │
│                                     │
│  Environment Variables:             │
│  VITE_API_URL=backend-url/api       │
└─────────────────┬───────────────────┘
                  │ API Calls
                  ▼
┌─────────────────────────────────────┐
│         Backend (Render)            │
│   https://your-backend.onrender.com │
│                                     │
│  Environment Variables:             │
│  FRONTEND_URL=frontend-url          │
│  MONGODB_URI=atlas-connection       │
└─────────────────────────────────────┘
```

## 🚀 Step-by-Step Deployment

### Step 1: Deploy Backend to Render

#### 1.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up/login with GitHub

#### 1.2 Create Web Service
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - **Name**: `seswa-backend`
  - **Environment**: `Node`
  - **Build Command**: `cd backend && npm install`
  - **Start Command**: `cd backend && npm start`

#### 1.3 Set Environment Variables
Add these in Render dashboard:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_FROM=noreply@seswa.org

FRONTEND_URL=https://santal-welfare-association-s6yt.vercel.app

ADMIN_EMAIL=your@email.com

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

```

#### 1.4 Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Note your backend URL: `https://your-app.onrender.com`

### Step 2: Update Frontend Environment Variables

#### 2.1 Update Vercel Environment Variables
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Open your frontend project
- Go to: **Settings** → **Environment Variables**
- Add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` |
| `VITE_REACT_APP_API_URL` | `https://your-backend.onrender.com/api` |
| `VITE_NODE_ENV` | `production` |

#### 2.2 Redeploy Frontend
- Go to **Deployments** tab
- Click "Redeploy" on latest deployment
- Or push new commit to trigger auto-deploy

### Step 3: Update Backend CORS

Your backend is already configured to accept requests from:
- `https://santal-welfare-association-s6yt.vercel.app`
- Any URL in `FRONTEND_URL` environment variable

## 🧪 Testing Deployment

### Test Backend
```bash
# Health check
curl https://your-backend.onrender.com/health

# API test
curl https://your-backend.onrender.com/api/test
```

### Test Frontend
1. Visit: `https://your-frontend.vercel.app`
2. Go to: `/backend-test`
3. Check for green checkmarks
4. Test contact form: `/contact`

## 🔧 Local Development

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_REACT_APP_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

### Backend (.env)
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://seswa2003:seswa2003@cluster0...
```

## 🐛 Troubleshooting

### CORS Errors
```
Access to fetch at 'backend-url' from origin 'frontend-url' has been blocked by CORS
```

**Solution:**
1. Check `FRONTEND_URL` in backend environment variables
2. Ensure frontend URL is in CORS allowed origins
3. Verify environment variables are set correctly

### Environment Variables Not Working
```
API calls failing, using wrong URL
```

**Solution:**
1. Check environment variable names (must start with `VITE_`)
2. Redeploy after adding environment variables
3. Clear browser cache
4. Check `/backend-test` page for current values

### Backend Not Responding
```
Network error or 500 status codes
```

**Solution:**
1. Check Render logs for backend errors
2. Verify MongoDB connection string
3. Check all required environment variables are set
4. Test backend health endpoint directly

## 📊 Environment Variable Reference

### Frontend (Vite/React)
| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `https://backend.onrender.com/api` |
| `VITE_REACT_APP_API_URL` | Alternative API URL | `https://backend.onrender.com/api` |
| `VITE_NODE_ENV` | Environment mode | `production` |

### Backend (Node.js)
| Variable | Purpose | Example |
|----------|---------|---------|
| `FRONTEND_URL` | Frontend URL for CORS | `https://app.vercel.app` |
| `MONGODB_URI` | Database connection | `mongodb+srv://...` |
| `NODE_ENV` | Environment mode | `production` |
| `JWT_SECRET` | JWT signing key | `your-secret-key` |

## ✅ Success Checklist

### ✅ Backend Deployed
- [ ] Render service created
- [ ] Environment variables set
- [ ] Health endpoint responds: `/health`
- [ ] API endpoint responds: `/api/test`
- [ ] CORS configured for frontend URL

### ✅ Frontend Deployed
- [ ] Vercel environment variables set
- [ ] Frontend redeployed after env vars
- [ ] Backend test page shows green checkmarks
- [ ] Contact form submits successfully
- [ ] No CORS errors in browser console

### ✅ Integration Working
- [ ] Frontend can reach backend API
- [ ] Contact form saves to database
- [ ] All pages load without errors
- [ ] Environment variables display correctly

## 🎉 Success!

Once everything is working:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas
- **Environment Variables**: Properly configured for production

Your SESWA application is now deployed with proper environment variable configuration! 🚀
