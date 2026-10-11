# FundFlow — Startup & Investor Discovery Platform

FundFlow is a MERN-stack web application that connects startup founders with potential investors. Founders can publish and manage startup profiles, while users can discover startups, save interesting opportunities, and generate AI-assisted investor pitches.

## Features

- **Authentication:** User registration and login with JWT-based authentication and password hashing.
- **Role-based access:** Founder and investor roles.
- **Startup management:** Founders can create, update, and delete their own startup profiles.
- **Startup discovery:** Browse startups, search by keyword, filter by industry, and view startup details.
- **Bookmarks:** Authenticated users can save and remove bookmarked startups.
- **Dashboard:** View startup listings and saved-startup statistics.
- **AI Pitch Assistant:** Generate a structured investor pitch covering the problem, solution, target market, investment highlights, and short investor pitch.
- **Responsive UI:** React-based interface for desktop and mobile screens.

## Technologies Used

**Frontend**
- React.js
- Vite
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs

**Database**
- MongoDB
- Mongoose

**AI Integration and Tools**
- OpenRouter API for AI pitch generation
- Kiro AI IDE for development assistance
- Git and GitHub
- Postman for API testing

## Project Structure

```text
FundFlow/
├── client/                  # React frontend
│   └── src/
│       ├── api/              # API service functions
│       ├── components/       # Reusable UI components
│       ├── context/          # Authentication context
│       └── pages/            # Application pages
├── server/                   # Express backend
│   ├── config/               # Database configuration
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Authentication and role checks
│   ├── models/               # Mongoose models
│   └── routes/               # API routes
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB Atlas account or a running MongoDB instance
- OpenRouter API key for AI pitch generation

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shreyansh189/FundFlow.git
cd FundFlow
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

Replace the placeholder values with your own credentials. Never commit `.env` or expose API keys.

Start the backend:

```bash
npm run dev
```

The backend runs at `http://localhost:5000`.

### 3. Configure the frontend

Open a second terminal:

```bash
cd FundFlow/client
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### 4. Production build

From the `client/` directory:

```bash
npm run build
```

## How to Use

1. Register as a founder or investor.
2. Log in to access authenticated features.
3. Browse, search, and filter startup listings.
4. Founders can create and manage their own startup profiles.
5. Bookmark startups to save opportunities.
6. Open a startup's details page and use AI Pitch Assistant to generate an investor pitch.

## AI Development Experience

I used **Kiro** as an AI-assisted development tool during the development of FundFlow. I used it to explore the existing project structure, accelerate frontend implementation, and help diagnose integration issues. I reviewed and tested the generated code, made corrections, and verified the frontend using a production build.

### Specific AI-Assisted Tasks

1. **Frontend component development:** Used Kiro to help build React pages, reusable components, navigation, forms, and responsive styling.
2. **API integration:** Used Kiro to help connect frontend services to the existing Express APIs for authentication, startup discovery, bookmarks, and dashboard data.
3. **AI pitch integration:** Used AI assistance to implement and debug the OpenRouter-powered startup pitch feature.
4. **CORS debugging:** Investigated and corrected missing CORS middleware configuration that prevented browser requests from reaching the backend.
5. **UI debugging and refactoring:** Improved AI pitch rendering by using Markdown rendering and styling for headings, lists, and paragraphs.

AI-generated code was reviewed and tested during development. The frontend production build completed successfully; individual application features should also be tested against a running backend.

## Future Improvements

- Add automated tests for frontend components and backend APIs.
- Improve form validation and error handling.
- Add pagination and more advanced discovery filters.
- Deploy the frontend and backend for public access.

## Repository

GitHub: https://github.com/Shreyansh189/FundFlow
```