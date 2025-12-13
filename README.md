# Otozin - Car Marketplace Platform

Monorepo chứa 3 project liên quan đến nhau: Backend API, CMS Admin Panel, và Frontend Website.

## 📁 Cấu trúc dự án

```
otozin/
├── BE/          # Backend API (NestJS + Fastify)
├── CMS/         # Admin Panel (React + Vite)
└── FE/          # Frontend Website (Next.js)
```

## 🚀 Tech Stack

### Backend (BE)
- **Framework**: NestJS + Fastify
- **Database**: PostgreSQL với Drizzle ORM
- **Search**: Typesense
- **Storage**: AWS S3 / Cloudflare R2
- **Auth**: JWT (Access + Refresh tokens)
- **Port**: 4000

### CMS
- **Framework**: React + Vite
- **UI Library**: Ant Design
- **Routing**: React Router v6
- **Port**: 5173

### Frontend (FE)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Port**: 3000

## 🛠️ Setup Development

### Prerequisites
- Node.js 20+ (xem `.nvmrc`)
- PostgreSQL
- Docker & Docker Compose (optional)

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd otozin
```

2. **Install dependencies cho từng project**
```bash
# Backend
cd BE
npm install

# CMS
cd ../CMS
npm install

# Frontend
cd ../FE
npm install
```

3. **Setup environment variables**

Tạo file `.env` trong mỗi project:

**BE/.env**
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nestjs_db
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

**CMS/.env**
```env
VITE_API_URL=http://localhost:4000/api
```

**FE/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. **Start services**

**Option 1: Docker Compose (Recommended)**
```bash
# Start database và Redis
cd BE
docker-compose up -d postgres redis

# Start Backend
cd BE
npm run start:dev

# Start CMS (terminal mới)
cd CMS
npm run dev

# Start Frontend (terminal mới)
cd FE
npm run dev
```

**Option 2: Manual**
- Start PostgreSQL và Redis
- Chạy từng project riêng lẻ

## 📝 Scripts

### Backend (BE)
```bash
npm run start:dev    # Development mode
npm run build        # Build production
npm run start:prod   # Production mode
npm run test         # Run tests
```

### CMS
```bash
npm run dev          # Development server
npm run build        # Build production
npm run preview      # Preview production build
```

### Frontend (FE)
```bash
npm run dev          # Development server
npm run build        # Build production
npm run start        # Start production server
npm run lint         # Lint code
```

## 🐳 Docker

### Backend Services
```bash
cd BE
docker-compose up -d        # Start all services (API + DB + Redis)
docker-compose up -d postgres redis  # Start only DB + Redis
```

## 🔧 Configuration Files

Các file config chung ở root:
- `.gitignore` - Git ignore rules cho toàn bộ monorepo
- `.editorconfig` - Editor configuration
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Prettier ignore patterns
- `.nvmrc` - Node.js version

## 📦 Deployment

**Lưu ý**: Mỗi project được deploy riêng biệt.

### Backend
- Build: `npm run build`
- Start: `npm run start:prod`
- Environment: Cần set các biến môi trường (DATABASE_URL, JWT_SECRET, etc.)

### CMS
- Build: `npm run build`
- Deploy: Upload `dist/` folder lên hosting
- Environment: Set `VITE_API_URL` trong build time

### Frontend
- Build: `npm run build`
- Start: `npm start` hoặc deploy lên Vercel/Netlify
- Environment: Set `NEXT_PUBLIC_API_URL` trong build time

## 🔐 Authentication

- Backend sử dụng JWT với HTTP-only cookies hoặc Bearer tokens
- CMS và FE lưu token trong localStorage/sessionStorage
- CORS đã được cấu hình để cho phép requests từ FE và CMS

## 📚 API Documentation

API base URL: `http://localhost:4000/api`

Các endpoints chính:
- `/api/auth/*` - Authentication
- `/api/car-for-sale/*` - Quản lý xe bán
- `/api/search/*` - Tìm kiếm
- `/api/upload/*` - Upload files

## 🤝 Contributing

1. Tạo branch mới từ `main`
2. Commit changes với message rõ ràng
3. Push và tạo Pull Request

## 📄 License

[Your License Here]

