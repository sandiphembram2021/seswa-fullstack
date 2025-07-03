# 🔗 Frontend-Backend Connection Methods

## **Method 1: Direct API Calls with CORS (Recommended)**

### Frontend Code:
```javascript
// Using Axios
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// GET request
const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// POST request
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/users`, userData);
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Backend Code:
```javascript
// Enable CORS
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true
}));

// API endpoint
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});
```

---

## **Method 2: Using Fetch API (Native)**

### Frontend Code:
```javascript
// Using native fetch
const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// POST with fetch
const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log('User created:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## **Method 3: Proxy Configuration (Development)**

### Vite Config (vite.config.js):
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

### Frontend Code (with proxy):
```javascript
// No need for full URL when using proxy
const response = await axios.get('/api/users');  // Proxied to backend
```

---

## **Method 4: Environment-Based URLs**

### .env file:
```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend Code:
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchData = async () => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
};
```

---

## **🔧 Common Connection Issues & Solutions**

### **Issue 1: CORS Error**
```
Access to fetch at 'http://localhost:5000/api/users' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
```javascript
// Backend: Add CORS middleware
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### **Issue 2: Network Error**
```
Error: Network Error
```

**Solutions:**
1. Check if backend server is running
2. Verify backend URL is correct
3. Check firewall/antivirus blocking

### **Issue 3: 404 Not Found**
```
Error: Request failed with status code 404
```

**Solutions:**
1. Verify API endpoint exists on backend
2. Check URL spelling and case sensitivity
3. Ensure backend routes are properly defined

### **Issue 4: 500 Internal Server Error**
```
Error: Request failed with status code 500
```

**Solutions:**
1. Check backend console for error details
2. Verify request data format
3. Check database connection (if using database)

---

## **🚀 Best Practices**

### **1. Error Handling**
```javascript
const apiCall = async () => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    throw error;
  }
};
```

### **2. Loading States**
```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await apiCall();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### **3. Environment Configuration**
```javascript
// Development
const API_BASE = 'http://localhost:5000/api';

// Production
const API_BASE = 'https://your-backend-domain.com/api';

// Environment-based
const API_BASE = import.meta.env.VITE_API_URL;
```

### **4. Authentication Headers**
```javascript
// Add auth token to requests
const token = localStorage.getItem('authToken');

const authenticatedRequest = await axios.get('/api/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## **📊 Connection Flow Summary**

1. **Frontend** makes HTTP request to backend URL
2. **CORS** allows cross-origin communication
3. **Backend** processes request and sends response
4. **Frontend** receives and handles response data
5. **UI** updates with new data

**Key Requirements:**
- ✅ Backend server running and accessible
- ✅ CORS configured for frontend domain
- ✅ Correct API endpoints and URLs
- ✅ Proper error handling
- ✅ Environment configuration
