# Elite Wears Deployment Guide

This document outlines how to deploy the Elite Wears application.

## 1. Backend Deployment (Render)
The backend is an Express Node.js application that uses local storage (JSON file and `uploads` folder) for simplicity, as requested.

1. **Push your code to GitHub.** Ensure the `backend` folder is at the root or you specify the root directory in Render.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Root Directory**: `backend` (if you kept the repo structure).
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click **Create Web Service**.

> **Warning:** Render's free tier spins down after inactivity and wipes the local disk. Your `orders.json` and `uploads/` folder will be reset periodically. To prevent this, you would need to upgrade to a persistent disk on Render, or adapt the code to use external storage (like S3/MongoDB) in the future.

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
   - You need to update the frontend components' `axios` calls (`http://localhost:5000/api/orders`) to point to the deployed Render backend URL.
5. Click **Deploy**.

## Post-Deployment Configurations
- **Update Products:** The products are hardcoded in `frontend/src/data/products.js`. Download your Instagram images to `frontend/src/assets/`, update the paths in the data file, and adjust the titles/prices/descriptions before pushing to production.
