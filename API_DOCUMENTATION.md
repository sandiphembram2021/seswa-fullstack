# SESWA Backend API Documentation

## 🌐 Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api`

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "userType": "student",
  "college": "IIEST Shibpur",
  "course": "Computer Science",
  "year": "3rd Year"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Contact Routes (`/api/contact`)

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Inquiry about membership",
  "message": "I would like to know more about SESWA membership.",
  "category": "membership"
}
```

#### Get All Contacts (Admin)
```http
GET /api/contact?page=1&limit=10&status=new&category=general
Authorization: Bearer <admin-token>
```

### News Routes (`/api/news`)

#### Get All News
```http
GET /api/news?page=1&limit=10&category=announcement&search=scholarship
```

#### Get Featured News
```http
GET /api/news/featured
```

#### Get Latest News
```http
GET /api/news/latest?limit=5
```

#### Get Single News
```http
GET /api/news/:slug
```

#### Create News (Admin)
```http
POST /api/news
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "New Scholarship Program Launched",
  "excerpt": "SESWA announces new scholarship program for engineering students",
  "content": "Full article content here...",
  "category": "announcement",
  "authorName": "Admin",
  "featuredImage": "https://example.com/image.jpg",
  "tags": ["scholarship", "education"],
  "status": "published"
}
```

### Event Routes (`/api/events`)

#### Get All Events
```http
GET /api/events?page=1&limit=10&upcoming=true&eventType=workshop
```

#### Get Upcoming Events
```http
GET /api/events/upcoming?limit=5
```

#### Get Single Event
```http
GET /api/events/:slug
```

#### Register for Event
```http
POST /api/events/:id/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-id",
  "userName": "John Doe"
}
```

### Gallery Routes (`/api/gallery`)

#### Get All Gallery Images
```http
GET /api/gallery?page=1&limit=12&category=events&featured=true
```

#### Get Featured Images
```http
GET /api/gallery/featured?limit=8
```

#### Get Single Image
```http
GET /api/gallery/:id
```

#### Like/Unlike Image
```http
POST /api/gallery/:id/like
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-id"
}
```

#### Add Comment
```http
POST /api/gallery/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-id",
  "userName": "John Doe",
  "comment": "Great photo!"
}
```

### College Routes (`/api/colleges`)

#### Get All Colleges
```http
GET /api/colleges?page=1&limit=20&type=Government&partner=true&search=IIEST
```

#### Get Partner Colleges
```http
GET /api/colleges/partners
```

#### Get College Statistics
```http
GET /api/colleges/stats
```

#### Get Single College
```http
GET /api/colleges/:slug
```

### Member Routes (`/api/members`)

#### Get All Members
```http
GET /api/members?page=1&limit=20&userType=student&college=IIEST
```

#### Get Member Statistics
```http
GET /api/members/stats
```

### Resource Routes (`/api/resources`)

#### Get Magazines
```http
GET /api/resources/magazines
```

#### Get Downloads
```http
GET /api/resources/downloads
```

#### Get Useful Links
```http
GET /api/resources/links
```

### Admin Routes (`/api/admin`)

#### Get Dashboard Data
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

#### Get All Users
```http
GET /api/admin/users?page=1&limit=20&userType=student&status=active
Authorization: Bearer <admin-token>
```

#### Update User Status
```http
PUT /api/admin/users/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "isActive": true
}
```

#### Get Analytics
```http
GET /api/admin/analytics?period=30
Authorization: Bearer <admin-token>
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "current": 1,
      "pages": 10,
      "total": 100,
      "limit": 10
    }
  }
}
```

## 🔍 Query Parameters

### Common Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `sort`: Sort field
- `order`: Sort order (asc/desc)

### Filtering Parameters
- `category`: Filter by category
- `status`: Filter by status
- `userType`: Filter by user type
- `featured`: Filter featured items (true/false)
- `upcoming`: Filter upcoming events (true/false)

## 🚨 Error Codes

- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Invalid or missing token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `422`: Unprocessable Entity - Validation errors
- `500`: Internal Server Error - Server error

## 🔒 Rate Limiting

- **Rate Limit**: 100 requests per 15 minutes per IP
- **Headers**: 
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. File uploads have a 5MB size limit
3. Passwords are hashed using bcrypt
4. JWT tokens expire in 7 days
5. Email notifications are sent for contact forms
6. Images require approval before appearing in gallery
