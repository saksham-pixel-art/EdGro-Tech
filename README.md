# EdGro Tech — Production Architecture

India's premium online university admission platform. Full-stack application with React frontend and Spring Boot backend.

---

## Architecture Overview

```
edgro-tech/
├── src/                    ← React 19 + TanStack Router frontend
│   ├── api/                ← Typed API client + React Query hooks
│   │   ├── client.ts       ← fetch wrapper, typed DTOs, ApiError
│   │   └── queries.ts      ← useQuery hooks for all data
│   ├── components/
│   │   ├── site/           ← Page sections (Hero, Programs, etc.)
│   │   └── ui/             ← Radix UI / shadcn components
│   ├── hooks/              ← useReveal, useCountUp, useIsMobile
│   ├── lib/                ← edgro-data.ts (fallback), utils
│   └── routes/             ← File-based routing (TanStack Router)
│
├── backend/                ← Spring Boot 3.3 REST API
│   └── src/main/java/com/edgro/
│       ├── controller/     ← REST endpoints
│       ├── service/        ← Business logic
│       ├── repository/     ← JPA repositories
│       ├── model/          ← JPA entities
│       ├── dto/            ← Request/response DTOs
│       ├── security/       ← JWT filter + JwtService
│       ├── exception/      ← Global error handler
│       └── config/         ← Security, CORS config
│
├── docker-compose.yml      ← MySQL + API + Frontend (dev)
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, TanStack Router, Tailwind CSS 4 |
| State / Data | TanStack React Query 5 |
| UI Components | Radix UI, shadcn/ui |
| Backend | Java 21, Spring Boot 3.3 |
| ORM | Spring Data JPA / Hibernate |
| Database | MySQL 8.4 |
| Migrations | Flyway |
| Auth | JWT (jjwt 0.12) |
| Containerization | Docker + Docker Compose |

---

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/universities` | List all universities (supports `?search=&naac=`) |
| GET | `/api/v1/universities/filters` | Available filter options |
| GET | `/api/v1/universities/{slug}` | Single university detail |
| GET | `/api/v1/programs` | List all programs (supports `?search=&category=`) |
| GET | `/api/v1/programs/{slug}` | Single program detail |
| GET | `/api/v1/testimonials` | Active testimonials |
| POST | `/api/v1/leads` | Submit lead (name, phone, courseInterest) |
| POST | `/api/v1/contact` | Submit contact message |
| POST | `/api/v1/auth/login` | Admin login → JWT token |

### Admin (JWT required)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/admin/leads` | Paginated leads (`?search=&status=&page=&size=`) |
| PATCH | `/api/v1/admin/leads/{id}/status` | Update lead status |
| GET | `/api/v1/admin/messages` | Contact messages (`?unreadOnly=true`) |
| PATCH | `/api/v1/admin/messages/{id}/read` | Mark message as read |

---

## Database Schema

```
universities          ← 21 partner universities
  └── university_highlights (1:many)

programs              ← 8 program types
  ├── program_outcomes (1:many)
  └── program_specializations (1:many)

university_programs   ← many:many join table

leads                 ← counseling requests from website
contact_messages      ← contact form submissions
admin_users           ← admin/counselor accounts
testimonials          ← student success stories
```

---

## Getting Started

### Prerequisites
- Java 21+
- Maven 3.9+
- MySQL 8.4+ (or Docker)
- Node.js 22+ / npm

### Option A — Docker Compose (recommended)

```bash
# Start everything: MySQL + Spring Boot API + Vite frontend
docker-compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:8080
- API Health: http://localhost:8080/actuator/health

### Option B — Manual

**1. Start MySQL**
```bash
mysql -u root -p
CREATE DATABASE edgro_dev;
CREATE USER 'edgro'@'localhost' IDENTIFIED BY 'edgro_dev_pass';
GRANT ALL ON edgro_dev.* TO 'edgro'@'localhost';
```

**2. Start the backend**
```bash
cd backend
mvn spring-boot:run
# Flyway runs migrations automatically on startup
```

**3. Start the frontend**
```bash
# In project root
cp .env.example .env.local
npm install
npm run dev
```

---

## Default Admin Credentials

```
Email:    admin@edgrotech.com
Password: Admin@123
```

**Change this immediately in production.**

Generate a new BCrypt hash:
```bash
# Using Spring Security CLI or online BCrypt generator
# Then update the admin_users table
```

---

## Production Deployment

1. Set all environment variables from `backend/.env.example`
2. Build the frontend: `npm run build` → deploy `dist/` to CDN
3. Build the backend: `cd backend && mvn -DskipTests package`
4. Run: `java -jar target/edgro-backend-1.0.0.jar --spring.profiles.active=prod`

### Environment Variables (production)

```bash
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:mysql://your-host:3306/edgro_prod?useSSL=true&serverTimezone=UTC
DB_USER=...
DB_PASS=...
JWT_SECRET=...   # min 256-bit key
CORS_ORIGINS=https://edgrotech.com
```

---

## Security Notes

- All admin endpoints require a valid JWT (`Authorization: Bearer <token>`)
- Lead submissions are deduplicated by phone within 24 hours
- Passwords are BCrypt-hashed (cost factor 12)
- CORS is restricted to configured origins
- SQL injection prevented by JPA parameterized queries
- Input validated at both frontend (Zod) and backend (Jakarta Validation)

---

## Scaling Recommendations

1. **Redis caching** — swap `spring.cache.type: simple` to `redis` for multi-instance deployments
2. **CDN** — serve frontend static assets from Cloudflare/CloudFront
3. **Connection pooling** — HikariCP is already configured; tune `maximum-pool-size` per instance
4. **Read replicas** — route `@Transactional(readOnly = true)` queries to replica
5. **Microservices** — when traffic grows, split into: `admission-service`, `content-service`, `notification-service`
6. **Message queue** — use RabbitMQ/Kafka for lead notifications instead of synchronous processing
