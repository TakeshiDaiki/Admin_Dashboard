# Deployment Guide

This guide provides step-by-step instructions for deploying the Admin Dashboard to production using MongoDB Atlas, Vercel (Frontend), and Render (Backend).

## Prerequisites

- GitHub account with repository access
- MongoDB Atlas account (free tier available)
- Vercel account (free tier available)
- Render account (free tier available)

---

## 1. MongoDB Atlas Setup

### Create Database Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select your preferred cloud provider and region
6. Click **"Create Cluster"**

### Configure Database Access

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username (e.g., `admin`) and generate a secure password
5. Set **"Database User Privileges"** to **"Atlas Admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0) for development
   - **Production Note**: Restrict to specific IPs for better security
4. Click **"Confirm"**

### Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
5. Replace `<password>` with your database user password
6. Add database name: `mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/admin_dashboard?retryWrites=true&w=majority`

---

## 2. Backend Deployment (Render)

### Prepare Backend

1. Ensure `backend/package.json` has a `start` script:
   ```json
   "scripts": {
     "start": "node dist/server.js",
     "build": "tsc"
   }
   ```

### Deploy to Render

1. Go to [Render](https://render.com/)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `admin-dashboard-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value | Example |
|-----|-------|---------|
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://admin:pass@cluster0.xxxxx.mongodb.net/admin_dashboard` |
| `JWT_SECRET` | Random 64-character string | `your-super-secret-jwt-key-min-32-chars` |
| `JWT_REFRESH_SECRET` | Different random 64-character string | `your-refresh-secret-key-different-from-jwt` |
| `CLIENT_URL` | Your Vercel frontend URL (add after frontend deploy) | `https://your-app.vercel.app` |
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` | `5000` |

**Generate Secrets**: Use this command to generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Click **"Create Web Service"**

### Get Backend URL

After deployment completes, copy your backend URL (e.g., `https://admin-dashboard-api.onrender.com`)

---

## 3. Frontend Deployment (Vercel)

### Prepare Frontend

1. Update `frontend/next.config.js` to enable standalone output:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone',
   }
   module.exports = nextConfig
   ```

### Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Set Environment Variables

Click **"Environment Variables"** and add:

| Key | Value | Example |
|-----|-------|---------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL | `https://admin-dashboard-api.onrender.com` |

Click **"Deploy"**

### Get Frontend URL

After deployment, copy your frontend URL (e.g., `https://admin-dashboard.vercel.app`)

### Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to **"Environment"**
4. Update `CLIENT_URL` to your Vercel URL
5. Click **"Save Changes"** (this will trigger a redeploy)

---

## 4. Seed Database (Optional)

To populate your production database with sample data:

1. Clone your repository locally
2. Create a `.env` file in `backend/` with your production `MONGO_URI`
3. Run the seed script:
   ```bash
   cd backend
   npm install
   npx ts-node src/scripts/seed.ts
   ```

---

## 5. GitHub Actions CI/CD

The repository includes a CI workflow (`.github/workflows/ci.yml`) that automatically:
- Runs tests on every push and pull request
- Builds both frontend and backend
- Ensures code quality before merging

### Required GitHub Secrets

No secrets are required for the basic CI workflow. For automatic deployment, you can extend the workflow with:

- `VERCEL_TOKEN`: Vercel API token (for auto-deploy)
- `RENDER_API_KEY`: Render API key (for auto-deploy)

---

## 6. Verification Checklist

After deployment, verify:

- [ ] Backend health check: `https://your-backend.onrender.com/health`
- [ ] Swagger docs: `https://your-backend.onrender.com/api-docs`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard displays correctly
- [ ] API calls succeed (check browser console)

---

## Common Issues & Troubleshooting

### Backend Issues

**Issue**: `MongooseError: Operation buffering timed out`
- **Solution**: Check MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0) or add Render's IP ranges

**Issue**: `CORS error` in browser console
- **Solution**: Ensure `CLIENT_URL` environment variable in Render matches your Vercel URL exactly (no trailing slash)

**Issue**: `JWT errors` or authentication fails
- **Solution**: Verify `JWT_SECRET` and `JWT_REFRESH_SECRET` are set and are at least 32 characters long

### Frontend Issues

**Issue**: API calls return 404
- **Solution**: Check `NEXT_PUBLIC_API_URL` is set correctly in Vercel environment variables

**Issue**: Build fails on Vercel
- **Solution**: Ensure all dependencies are in `package.json` and `npm run build` works locally

### Database Issues

**Issue**: Cannot connect to MongoDB
- **Solution**: 
  1. Verify connection string format
  2. Check database user password is correct
  3. Ensure Network Access allows connections
  4. Confirm database name is included in connection string

---

## Production Optimization Tips

1. **Enable Vercel Analytics**: Monitor frontend performance
2. **Set up Render Alerts**: Get notified of backend downtime
3. **MongoDB Indexes**: Create indexes on frequently queried fields
4. **Rate Limiting**: Configure rate limits in backend for API protection
5. **Monitoring**: Integrate Sentry or similar for error tracking
6. **Backups**: Enable automated backups in MongoDB Atlas

---

## Costs

- **MongoDB Atlas**: Free (M0 tier, 512MB storage)
- **Render**: Free (750 hours/month, sleeps after 15min inactivity)
- **Vercel**: Free (100GB bandwidth, unlimited deployments)

**Note**: Free tiers have limitations. Render free tier services sleep after inactivity and take ~30s to wake up.

---

## Support

For issues specific to:
- **MongoDB Atlas**: [Atlas Documentation](https://docs.atlas.mongodb.com/)
- **Render**: [Render Docs](https://render.com/docs)
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
