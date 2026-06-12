# Elite Wears Deployment Guide

This document outlines how to deploy the Elite Wears static frontend application.

## Vercel Deployment (Frontend Only)
The application is a pure React application built with Vite. It does not require a backend.

1. **Push your code to GitHub.** Ensure the repository contains the Vite project at the root level.
2. Go to [Vercel](https://vercel.com) and create a **New Project**.
3. Connect your `elitewears` GitHub repository.
4. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (Default root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

## Updating Content
- **Update Products:** The products are hardcoded in `src/data/products.js`. 
- **Images:** Download your Instagram images to `src/assets/`, update the paths in the data file, and adjust the titles, prices, and descriptions before pushing to production.
