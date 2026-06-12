# Elite Wears Deployment Guide

This document outlines how to deploy the Elite Wears MVP application.

## 1. Backend Deployment (Render)
The backend is an Express Node.js application.

1. **Push your code to GitHub.** Ensure the `backend` folder is at the root or you specify the root directory in Render.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Root Directory**: `backend` (if you kept the repo structure).
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables**: Add the following:
   - `PORT`: `5000` (or whatever Render uses)
   - `MONGO_URI`: Your MongoDB Atlas connection string.
6. Click **Create Web Service**.

## 2. Frontend Deployment (Vercel)
The frontend is a React application built with Vite.

1. Go to [Vercel](https://vercel.com) and create a **New Project**.
2. Connect the same GitHub repository.
3. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**: Add the backend URL so the frontend can hit it.
   - Note: In this MVP, the API endpoints in the components (e.g. `http://localhost:5000`) need to be updated to point to the deployed Render backend URL. A good practice is to create a `.env.production` in `frontend` setting `VITE_API_URL=https://your-render-app.onrender.com/api` and update `axios.get` calls.
5. Click **Deploy**.

## Post-Deployment Configurations
- **Seed Products:** The database is empty initially. Use Postman or create a temporary script to POST sample products to the `api/products` endpoint so your catalog populates.
- **Image Storage:** The MVP uses local Multer storage (`/uploads`). On Render's free tier, these will disappear on server restart. For production, integrate AWS S3, Cloudinary, or similar in `routes/orders.js`.
