# Project Structure

```bash
StudyMate/
├── client/              # Frontend (Vite + React)
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level components (Home, Login, Register)
│   │   ├── App.jsx     # Main entry point & Routing
│   │   └── main.jsx    # React rendering
│   └── vite.config.js
└── server/             # Backend (Node + Express)
    ├── models/         # Mongoose schemas (User, Note)
    ├── routes/         # API endpoints (Auth, etc.)
    ├── server.js       # Express app initialization
    └── .env            # Environment variables (TBD)
```
