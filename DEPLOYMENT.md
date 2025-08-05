# Vercel Deployment Guide

## Quick Deployment Steps

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your `mini-library` repository
   - Vercel will automatically detect it's a React app

3. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your app automatically
   - You'll get a live URL when deployment completes

### Option 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy: Yes
   - Which scope: Your username
   - Link to existing project: No
   - Project name: mini-library-app
   - Directory: `./` (current directory)

## Project Structure for Vercel

```
/
├── api/                    # Serverless functions
│   ├── books.js           # Main books API
│   └── books/
│       ├── [id].js        # Individual book operations
│       └── [id]/
│           └── toggle.js  # Toggle book status
├── lib/
│   └── dataStore.js       # Shared data management
├── src/                   # React source files
├── public/                # Static files
├── package.json           # Dependencies and scripts
└── vercel.json           # Vercel configuration
```

## API Endpoints

Once deployed, your API will be available at:

- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `DELETE /api/books/[id]` - Delete a book
- `POST /api/books/[id]/toggle` - Toggle book issue status

## Environment Configuration

The app is configured to work both locally and in production:

- **Local development**: Run `npm start` (React dev server on port 3000)
- **Production**: Vercel serves the built React app and API functions

## Important Notes

1. **Data Persistence**: The current setup uses in-memory storage, which means data resets on each deployment. For production, consider integrating a database like:
   - Vercel KV (Redis)
   - PlanetScale (MySQL)
   - MongoDB Atlas
   - Supabase (PostgreSQL)

2. **CORS**: Already configured for cross-origin requests

3. **Automatic Deployments**: When connected to GitHub, Vercel automatically deploys on every push to the main branch

## Troubleshooting

If deployment fails:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify API functions follow Vercel's serverless function format
4. Check that file paths are correct in import statements
