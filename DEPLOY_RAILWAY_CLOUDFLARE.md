# Deploy EdGro Tech on Railway + Cloudflare

Recommended setup:

- Railway: Spring Boot backend and MySQL database.
- Cloudflare Pages: Vite React frontend.
- Cloudflare DNS: `edgrotech.com`, `www.edgrotech.com`, and optional `api.edgrotech.com`.

## 1. Push Code to GitHub

Railway and Cloudflare Pages both deploy most cleanly from GitHub.

Do not commit:

- `.env`
- `.env.local`
- `secrets/`
- Google service account JSON files

## 2. Railway Backend

Create a new Railway project, then add:

1. A MySQL database service.
2. A backend service from this GitHub repo.

For the backend service, use the backend folder as the service root if Railway asks for a root directory:

```txt
backend
```

The backend already has `backend/Dockerfile`, so Railway can build it with Docker.

Set these Railway backend variables:

```env
SPRING_PROFILES_ACTIVE=prod
PORT=8080

DB_USER=${{MySQL.MYSQLUSER}}
DB_PASS=${{MySQL.MYSQLPASSWORD}}
SPRING_DATASOURCE_URL=jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true

JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRATION_MS=86400000

CORS_ORIGINS=https://edgrotech.com,https://www.edgrotech.com

GOOGLE_SHEETS_ENABLED=true
GOOGLE_SA_KEY_JSON=paste-the-entire-google-service-account-json-here
GOOGLE_SHEETS_SPREADSHEET_ID=1DsPLJ3SdO8tqcsjj_RvnP1iyARLsqOiB2NUXSB4J7OI
GOOGLE_SHEETS_SHEET_NAME=Leads
```

If you do not add a custom API domain yet, temporarily set `CORS_ORIGINS` to your Cloudflare Pages preview URL too.

After deploy, test:

```txt
https://your-railway-backend-url.up.railway.app/actuator/health
```

## 3. Optional Railway API Domain

In Railway, add a custom domain for the backend:

```txt
api.edgrotech.com
```

Railway will show the DNS record to create. Add that record in Cloudflare DNS.

After the domain works, update `CORS_ORIGINS` in Railway to:

```env
CORS_ORIGINS=https://edgrotech.com,https://www.edgrotech.com
```

## 4. Cloudflare Pages Frontend

Create a Cloudflare Pages project from the same GitHub repo.

Use these build settings:

```txt
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

Set this Cloudflare Pages environment variable:

```env
VITE_API_URL=https://api.edgrotech.com
```

If you skip the custom API domain at first, use the Railway backend URL:

```env
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

Then deploy.

## 5. Cloudflare Domain

In Cloudflare Pages, add custom domains:

```txt
edgrotech.com
www.edgrotech.com
```

Cloudflare will guide you through the DNS records.

## 6. Final Test

Open the hosted frontend and test:

1. Home page loads.
2. University images load.
3. Free Counseling form submits.
4. New lead appears in Google Sheets.
5. Railway backend logs show `Google Sheets sync SUCCESS`.

## Notes

- `GOOGLE_SA_KEY_JSON` is preferred on Railway because it avoids mounting a private JSON file.
- `GOOGLE_SA_KEY_PATH` still works locally with Docker Compose.
- `VITE_API_URL` is a build-time variable. If you change it in Cloudflare, redeploy the frontend.
