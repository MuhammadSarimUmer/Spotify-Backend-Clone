# Spotify Backend Clone

A modular RESTful API built with Node.js and Express, designed to handle music streaming infrastructure, user authentication, and cloud-based media storage.

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT and Bcryptjs.
- **Role-Based Access Control**: Dedicated middlewares to protect routes for `User` and `Artist` roles.
- **Media Management**: Integration with ImageKit for cloud-based music file storage.
- **Relational Data Modeling**: Complex MongoDB relationships between Users, Music, and Albums using Mongoose.
- **Secure Sessions**: Token storage via secure HttpOnly Cookies.
- **File Handling**: Processing multi-part form data and file buffers with Multer.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js (v5.2.1) |
| Database | MongoDB with Mongoose (v9.2.3) |
| Security | JSON Web Tokens (JWT), Bcryptjs |
| Cloud Storage | ImageKit SDK |
| File Uploads | Multer |

---

## 📂 Project Structure

```
├── src/
│   ├── controllers/   # Business logic and request handling
│   ├── db/            # Database connection configuration
│   ├── middlewares/   # Authentication and role validation
│   ├── models/        # Mongoose schemas (User, Music, Album)
│   ├── routes/        # API endpoint definitions
│   ├── services/      # External service integrations (Storage)
│   └── app.js         # Express application setup
├── server.js          # Entry point and server initialization
└── .env               # Environment variables (not tracked)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Spotify-Backend-Clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 4. Run the application

```bash
# For development (using nodemon)
npm run dev

# For production
npm start
```

---

## 🛣️ API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Create a new account. Accepts `username`, `email`, `password`, and optional `role`. |
| `POST` | `/login` | Authenticate and receive a secure JWT cookie. |

### Music & Albums — `/api/music`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Fetch all music tracks with artist details populated. |
| `POST` | `/create-music` | Upload a new track. Requires `Artist` role. Uses Multer for file handling. |
| `POST` | `/create-album` | Create a new album collection. Requires `Artist` role. |

---

## 🛡️ Security Implementation

- **Password Hashing**: Utilizes Bcryptjs with a salt factor of 10.
- **Stateless Auth**: JWT-based authorization passed via request headers or cookies.
- **Cookie Security**: Tokens are served via `res.cookie` with HttpOnly flag for enhanced client-side security.
- **Role Guards**: Middleware validates the `role` field embedded in the JWT payload before granting access to protected routes.
