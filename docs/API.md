# Login Window Backend API Documentation

This document describes the REST APIs provided by the Login Window backend.

The backend is built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)

---

## Base URL

For local development:

```text
http://localhost:5000
```

---

# API Endpoints

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| GET | `/` | No | Check whether the server is running |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login an existing user |
| GET | `/api/auth/me` | JWT Required | Get the currently authenticated user |

---

# 1. Server Health Check

Checks whether the backend server is running.

### Request

```http
GET /
```

### Example

```text
GET http://localhost:5000/
```

### Response

**Status:** `200 OK`

```json
{
    "message": "Login Window Backend is running!"
}
```

---

# 2. Register User

Creates a new user account.

## Endpoint

```http
POST /api/auth/register
```

### Request URL

```text
http://localhost:5000/api/auth/register
```

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
    "username": "saheli",
    "email": "saheli@example.com",
    "password": "Test1234"
}
```

### Validation Rules

#### Username

- Required
- Minimum 3 characters
- Maximum 30 characters

#### Email

- Required
- Must be a valid email address
- Email is stored in lowercase
- Email must be unique

#### Password

- Required
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number

### Successful Response

**Status:** `201 Created`

```json
{
    "message": "User registered successfully",
    "user": {
        "id": "USER_ID",
        "username": "saheli",
        "email": "saheli@example.com"
    }
}
```

The password is never returned in the response.

### Possible Errors

#### Missing fields

**Status:** `400 Bad Request`

```json
{
    "message": "Username, email and password are required"
}
```

#### Invalid email

**Status:** `400 Bad Request`

```json
{
    "message": "Please provide a valid email address"
}
```

#### Invalid password

**Status:** `400 Bad Request`

```json
{
    "message": "Password must be at least 8 characters and contain at least one letter and one number"
}
```

#### Duplicate email

**Status:** `409 Conflict`

```json
{
    "message": "User with this email already exists"
}
```

---

# 3. Login User

Authenticates an existing user and returns a JWT token.

## Endpoint

```http
POST /api/auth/login
```

### Request URL

```text
http://localhost:5000/api/auth/login
```

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
    "email": "sikha@example.com",
    "password": "Test1234"
}
```

### Successful Response

**Status:** `200 OK`

```json
{
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "user": {
        "id": "USER_ID",
        "username": "saheli",
        "email": "saheli@example.com"
    }
}
```

The `token` must be used for subsequent protected requests.

### Possible Errors

#### Missing email or password

**Status:** `400 Bad Request`

```json
{
    "message": "Email and password are required"
}
```

#### Invalid email format

**Status:** `400 Bad Request`

```json
{
    "message": "Please provide a valid email address"
}
```

#### Invalid credentials

**Status:** `401 Unauthorized`

```json
{
    "message": "Invalid email or password"
}
```

> The same error message is returned for a non-existent email and an incorrect password to avoid revealing whether an account exists.

---

# 4. Get Current Authenticated User

Returns information about the user associated with the supplied JWT.

## Endpoint

```http
GET /api/auth/me
```

### Request URL

```text
http://localhost:5000/api/auth/me
```

### Authentication

This endpoint requires a valid JWT.

Send the token using the `Authorization` header:

```http
Authorization: Bearer JWT_TOKEN
```

### Example Header

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Successful Response

**Status:** `200 OK`

```json
{
    "message": "User authenticated",
    "user": {
        "_id": "USER_ID",
        "username": "saheli",
        "email": "saheli@example.com",
        "createdAt": "2026-08-09T10:30:54.745Z",
        "updatedAt": "2026-08-09T10:30:54.745Z",
        "__v": 0
    }
}
```

The user's password is excluded from the response.

---

## Authentication Errors

### Missing token

**Status:** `401 Unauthorized`

```json
{
    "message": "Authentication token is required"
}
```

### Invalid authorization format

**Status:** `401 Unauthorized`

```json
{
    "message": "Invalid authorization format"
}
```

The expected format is:

```http
Authorization: Bearer JWT_TOKEN
```

### Invalid or expired token

**Status:** `401 Unauthorized`

```json
{
    "message": "Invalid or expired token"
}
```

---

# JWT Authentication Flow

```text
                LOGIN
                  |
                  v
        Verify email/password
                  |
                  v
             Generate JWT
                  |
                  v
        Return token to client
                  |
                  v
       Client stores/uses token
                  |
                  v
       Protected API request
                  |
                  v
     Authorization: Bearer TOKEN
                  |
                  v
        JWT Authentication
            Middleware
                  |
          +-------+-------+
          |               |
        Valid           Invalid
          |               |
          v               v
      Controller          401
          |
          v
       MongoDB
          |
          v
     User information
```

---

# Password Security

Passwords are never stored as plain text.

During registration:

```text
Plain Password
      |
      v
bcrypt hashing
      |
      v
Hashed Password
      |
      v
MongoDB
```

During login:

```text
Entered Password
      |
      v
bcrypt.compare()
      |
      v
Stored Hash
      |
      v
Match?
```

The password is also excluded from user responses.

---

# Frontend Integration

The frontend can use the following flow.

## Step 1: Register

```http
POST /api/auth/register
```

Send:

```json
{
    "username": "saheli",
    "email": "saheli@example.com",
    "password": "Test1234"
}
```

---

## Step 2: Login

```http
POST /api/auth/login
```

Send:

```json
{
    "email": "saheli@example.com",
    "password": "Test1234"
}
```

The backend returns:

```json
{
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "user": {
        "id": "USER_ID",
        "username": "saheli",
        "email": "saheli@example.com"
    }
}
```

The frontend should retain the JWT and send it when accessing protected APIs.

---

## Step 3: Access Protected Endpoint

```http
GET /api/auth/me
```

Send:

```http
Authorization: Bearer JWT_TOKEN
```

The backend verifies the token and returns the authenticated user's information.

---

# API Testing

The APIs have been tested using Postman.

Recommended test cases:

## Registration

- [x] Valid registration
- [x] Missing username
- [x] Missing email
- [x] Missing password
- [x] Invalid email
- [x] Short password
- [x] Duplicate email

## Login

- [x] Valid credentials
- [x] Incorrect password
- [x] Non-existent email
- [x] Missing credentials
- [x] Invalid email format

## Authentication

- [x] Valid JWT
- [x] Missing JWT
- [x] Invalid JWT
- [x] Protected `/me` endpoint

---

# Environment Variables

The backend requires the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit the actual `.env` file or secret values to GitHub.

---

# Backend Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── docs/
│   └── API.md
│
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

# Development

Switch to the backend branch:

```bash
git checkout backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with the required environment variables.

Start the backend:

```bash
npm run dev
```

The server will be available at:

```text
http://localhost:5000
```
