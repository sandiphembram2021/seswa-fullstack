🚀 SESWA Full Stack Deployment Guide
📁 Project Structure
java
Copy
Edit
seswa/
├── frontend/          ← React frontend (Vite)
├── server/            ← Node.js backend (Express)
├── package.json       ← Root deployment file (optional)
└── README.md          ← This file
🌍 Deployment Options
✅ Option 1: Deploy with Render (Backend) + Vercel (Frontend)
🔧 Step 1: Prepare for Deployment
Push your full project (frontend + backend) to GitHub

Add a .env file in the server/ directory

Update FRONTEND_URL in server/.env to your deployed frontend URL

Add a .env.example to show required environment variables (see below)

🌐 Step 2: Deploy Backend on Render
Login or signup at Render

Click New + → Web Service

Connect your GitHub repository

Configure deployment:

Key	Value
Name	seswa-backend
Environment	Node
Build Command	cd server && npm install
Start Command	cd server && npm start
Root Directory	(leave blank)

🔑 Step 3: Add Environment Variables on Render
Go to your Render dashboard → your service → Environment → Add:

env
Copy
Edit
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM=noreply@seswa.org

FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_EMAIL=admin@seswa.org
ADMIN_PASSWORD=your_admin_password

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
⚠️ Never use real passwords inside code or public files!

🌐 Step 4: Deploy Frontend on Vercel
Connect your frontend/ folder to Vercel

Set environment variables:

env
Copy
Edit
VITE_API_URL=https://your-backend.onrender.com/api
VITE_NODE_ENV=production
Deploy the project

Your app will be live at:
https://your-frontend.vercel.app

🧪 Environment Variables Overview
🔐 Backend (server/.env)
env
Copy
Edit
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM=noreply@seswa.org

FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_EMAIL=admin@seswa.org
ADMIN_PASSWORD=your_admin_password
⚙️ Frontend (frontend/.env)
env
Copy
Edit
VITE_API_URL=https://your-backend.onrender.com/api
VITE_NODE_ENV=production
💻 Local Development
✅ Requirements
Node.js v16+

MongoDB (local or Atlas)

Git

🔄 Setup Steps
bash
Copy
Edit
# Clone the project
git clone https://github.com/your-username/seswa.git
cd seswa

# Install all dependencies
npm run install:all

# Copy environment file
cp server/.env.example server/.env
# Edit with real values

# Start servers
npm run dev
This will start:

🌐 Frontend: http://localhost:5173

🖥️ Backend: http://localhost:5000

📝 .env.example Template
Create a file server/.env.example:

env
Copy
Edit
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM=noreply@seswa.org

FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
🔍 Testing Deployment
✅ Backend Health Check
bash
Copy
Edit
curl https://your-backend.onrender.com/api/health
✅ Frontend Test
Visit: https://your-frontend.vercel.app

Test:

✅ Page loads

✅ API data loads (inspect Network tab)

✅ Contact form works (if implemented)

🛠 Troubleshooting
Problem	Fix
CORS error	Ensure correct FRONTEND_URL is set in backend .env
API 500 error	Check backend logs on Render
MongoDB not connecting	Check URI and IP whitelist in MongoDB Atlas
Email not sending	Use app-password for Gmail (not main password)

📦 Optional: Heroku Deployment
(Not recommended now due to Heroku free tier removal, but still usable if needed.)

heroku create seswa-fullstack

heroku config:set VAR_NAME=value

git push heroku main

📈 VPS Deployment (Optional for Production)
Use PM2 + NGINX + Ubuntu server (DigitalOcean, AWS, etc.).
Let me know if you want a full VPS guide — I’ll generate one step-by-step.

📬 Contact / Support
📧 Email: sandiphembram2021@gmail,com
📂 GitHub: github.com/sandiphembram2021/seswa

✅ Success Checklist
 Frontend deployed on Vercel

 Backend deployed on Render

 Environment variables securely managed

 API connection works in production

 GitHub repo clean (no secrets pushed)

🎉 Congratulations! Your full-stack SESWA app is now deployment-ready and secure.

Let me know if you want:

A render.yaml template

A .env.example auto generator

Or CI/CD setup with GitHub Actions

Just say the word. 💻🔥
