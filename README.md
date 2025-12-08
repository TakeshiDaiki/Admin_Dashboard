# Admin Dashboard - Full-Stack Application

![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/admin-dashboard/ci.yml?branch=main)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)

A production-ready, full-stack admin dashboard featuring modern authentication, comprehensive CRUD operations, and enterprise-level architecture. Built with TypeScript, Next.js 14, Node.js/Express, and MongoDB.

## 🚀 Features

### Authentication & Security
- ✅ JWT-based authentication with access & refresh tokens
- ✅ HttpOnly cookies for enhanced security
- ✅ Role-based access control (Admin/User)
- ✅ Password hashing with bcrypt
- ✅ Rate limiting and Helmet.js security headers
- ✅ CORS configuration

### Core Functionality
- ✅ User management (CRUD operations)
- ✅ Product catalog management
- ✅ Order processing and status tracking
- ✅ Real-time dashboard statistics
- ✅ Responsive UI with TailwindCSS

### Developer Experience
- ✅ Full TypeScript coverage (frontend & backend)
- ✅ Comprehensive unit tests (Jest + Supertest)
- ✅ Swagger/OpenAPI documentation
- ✅ Docker & Docker Compose support
- ✅ GitHub Actions CI/CD pipeline
- ✅ ESLint + Prettier configuration
- ✅ Database seeding scripts

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Validation**: Zod
- **Authentication**: JWT + bcrypt
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (Frontend) + Render (Backend)
- **Database**: MongoDB Atlas

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized development)
- MongoDB (or use Docker Compose)

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/yourusername/admin-dashboard.git
cd admin-dashboard

# Start all services (MongoDB, Backend, Frontend)
docker compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# API Docs: http://localhost:5000/api-docs
```

### Manual Setup

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets

# Run database migrations/seed (optional)
npm run seed

# Development mode
npm run dev

# Production build
npm run build
npm start
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://admin:password123@localhost:27017/admin_dashboard?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-different-from-jwt
CLIENT_URL=http://localhost:3000
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📚 API Documentation

Interactive API documentation is available via Swagger UI:

**Local**: http://localhost:5000/api-docs

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| GET | `/api/users` | Get all users | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |
| GET | `/api/products` | Get all products | No |
| POST | `/api/products` | Create product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/orders` | Create order | Yes |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| GET | `/health` | Health check | No |

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Tests include:
- Authentication flow (register, login, logout)
- User management operations
- Product CRUD operations
- Order processing
- All tests use mocked dependencies for reliability

### Frontend Tests

```bash
cd frontend
npm test
```

Tests include:
- Login form rendering and validation
- User input handling
- Component integration

## 🐳 Docker

### Development with Docker Compose

```bash
# Start all services
docker compose up

# Rebuild and start
docker compose up --build

# Stop services
docker compose down

# View logs
docker compose logs -f backend
docker compose logs -f frontend
```

### Production Docker Images

```bash
# Build backend image
cd backend
docker build -t admin-dashboard-backend .

# Build frontend image
cd frontend
docker build -t admin-dashboard-frontend .
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions covering:
- MongoDB Atlas setup
- Render backend deployment
- Vercel frontend deployment
- Environment variable configuration
- Troubleshooting guide

## 📁 Project Structure

```
admin-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middlewares/      # Express middlewares
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── scripts/          # Utility scripts (seed, etc.)
│   │   ├── utils/            # Helper functions
│   │   ├── app.ts            # Express app configuration
│   │   └── server.ts         # Server entry point
│   ├── __tests__/            # Unit tests
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities and API client
│   │   └── store/            # Zustand stores
│   ├── __tests__/            # Component tests
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
├── docker-compose.yml
├── DEPLOYMENT.md
├── README_CV.md
├── LICENSE
└── .gitignore
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts Reference

### Backend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with ts-node |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm test` | Run unit tests |
| `npm run seed` | Populate database with sample data |
| `npm run seed:destroy` | Clear all data from database |

### Frontend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run component tests |
| `npm run lint` | Run ESLint |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the flexible database
- Vercel and Render for free hosting tiers

---

**Note**: This is a portfolio/demonstration project. For production use, ensure proper security audits, environment configuration, and monitoring are in place.
