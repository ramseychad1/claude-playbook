# Claude Playbook - Idea to Production

The autonomous build playbook for Claude + Pencil.dev + Railway + Supabase.

This interactive guide walks you through building a complete web application from concept to deployment using Claude AI tools.

## Features

- **6-Phase Development Process**: From initial idea to production deployment
- **Tool-Specific Guidance**: When to use Claude Chat, Pencil.dev, Claude Code UI, and Claude Code CLI
- **Sub-Agent Strategy**: Best practices for using Claude's autonomous sub-agents
- **Interactive Interface**: Easy-to-navigate tabs and phases

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## Deploy to Railway

### Option 1: Deploy from GitHub

1. Push this repository to GitHub
2. Go to [Railway](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose this repository
6. Railway will auto-detect Vite and deploy automatically

### Option 2: Deploy with Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

Railway will automatically:
- Detect the Vite project
- Install dependencies with `npm install`
- Build the project with `npm run build`
- Serve the static files from the `dist` folder

## Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **Vite 6** - Build tool and dev server
- **Vanilla CSS** - Styling (inline styles for simplicity)

## License

MIT
