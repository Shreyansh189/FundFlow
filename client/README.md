# FundFlow - Frontend

Modern React frontend for the FundFlow startup and investor discovery platform.

## Features

- 🔍 **Startup Discovery** - Browse, search, and filter startups by industry
- 👤 **Authentication** - User registration and login for founders and investors
- 📊 **Dashboard** - Manage startups (founders) and view saved startups
- 🤖 **AI Pitch Assistant** - Generate investor pitches using AI
- 💾 **Bookmarks** - Save and manage favorite startups
- 📝 **Startup Management** - Create, edit, and delete startups (founders only)
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- React 19
- React Router v6
- Axios for API calls
- Vite for build tooling
- Plain CSS (no UI frameworks)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure the API endpoint:
Create a `.env` file (optional - defaults to http://localhost:5000):
```
VITE_API_BASE_URL=http://localhost:5000
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API service modules
├── components/       # Reusable components
├── context/          # React context (auth)
├── pages/            # Page components
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── config.js         # Configuration
```

## API Integration

The frontend integrates with these backend endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/startups` - List startups (with search/filter)
- `GET /api/startups/:id` - Get startup details
- `POST /api/startups` - Create startup (founder only)
- `PUT /api/startups/:id` - Update startup (founder only)
- `DELETE /api/startups/:id` - Delete startup (founder only)
- `GET /api/dashboard` - Get dashboard data
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks/:startupId` - Bookmark startup
- `DELETE /api/bookmarks/:startupId` - Remove bookmark
- `POST /api/ai/startup-summary/:startupId` - Generate AI pitch

## Development

Run the backend server on port 5000, then start the frontend development server:

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit http://localhost:5173 to view the application.
