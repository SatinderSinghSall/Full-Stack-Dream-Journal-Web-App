# 🌙 Dream Journal — Frontend (React + Tailwind)

A **modern React web app** for logging, exploring, and reflecting on dreams.
This is the **frontend** of the [Dream Journal MERN Stack Project](../backend), built with **React, TailwindCSS, and React Router**.

Users can register, log in, and manage their dream entries through a clean, intuitive interface.

---

## ✨ Features

### ✅ MVP Features

- **Authentication (JWT-based)**

  - Login / Signup pages
  - Auth context with protected routes

- **Dream Management**

  - Dashboard with all dream entries
  - Create, view, edit, and delete dreams
  - Dream details page

- **UI & Navigation**

  - Modern TailwindCSS design
  - Navbar, footer, and landing page
  - Responsive & mobile-friendly

---

### 🚀 Planned Enhancements

- Dream tags (Lucid, Nightmare, Recurring, etc.)
- Mood selector (emoji or scale)
- Search & filter dreams
- Profile page with avatar + settings
- Dark mode toggle
- Export dreams (PDF/Markdown/TXT)
- Analytics: streaks, word clouds, mood trends
- PWA support for mobile offline logging
- AI summaries & pattern detection
- Community features (public dream sharing, comments, likes)

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev)
- **Routing:** [React Router v7](https://reactrouter.com)
- **UI & Styling:** [TailwindCSS](https://tailwindcss.com), [clsx](https://github.com/lukeed/clsx), [tailwind-variants](https://tailwind-variants.org)
- **Animations:** [Framer Motion](https://www.framer.com/motion)
- **Icons:** [Lucide React](https://lucide.dev), [React Icons](https://react-icons.github.io/react-icons/)
- **API Requests:** [Axios](https://axios-http.com)
- **State Management:** React Context API
- **Testing:** React Testing Library + Jest
- **Deployment:** Netlify / Vercel (planned)

---

## 📂 Project Structure

```
📁 frontend/
│   ├── 📁 .git/ 🚫 (auto-hidden)
│   ├── 📁 build/ 🚫 (auto-hidden)
│   ├── 📁 node_modules/ 🚫 (auto-hidden)
│   ├── 📁 public/
│   │   ├── 🖼️ favicon.ico
│   │   ├── 🌐 index.html
│   │   ├── 🖼️ logo192.png
│   │   ├── 🖼️ logo512.png
│   │   ├── 📄 manifest.json
│   │   └── 📄 robots.txt
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── 📄 api.js
│   │   ├── 📁 components/
│   │   │   ├── 📄 DreamCard.jsx
│   │   │   ├── 📄 Features.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 ProtectedRoute.jsx
│   │   │   └── 📄 UserMenu.jsx
│   │   ├── 📁 contexts/
│   │   │   └── 📄 AuthContext.jsx
│   │   ├── 📁 pages/
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   ├── 📄 DreamDashboard.jsx
│   │   │   ├── 📄 DreamDetails.jsx
│   │   │   ├── 📄 DreamEntry.jsx
│   │   │   ├── 📄 Landing.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   └── 📄 Signup.jsx
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.js
│   │   ├── 📄 App.test.js
│   │   ├── 🎨 index.css
│   │   ├── 📄 index.js
│   │   ├── 🖼️ logo.svg
│   │   ├── 📄 reportWebVitals.js
│   │   └── 📄 setupTests.js
│   ├── 📄 .env.development 🚫 (auto-hidden)
│   ├── 📄 .env.production 🚫 (auto-hidden)
│   ├── 🚫 .gitignore
│   ├── 📖 README.md
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   ├── 📄 tailwind.config.js
│   └── 📄 vercel.json
```

---

## 🚦 Roadmap

- [x] MVP Frontend (Auth, Dashboard, Dream CRUD)
- [ ] Tags, moods, and filters
- [ ] Profile & settings page
- [ ] Analytics & visualizations
- [ ] Dark mode + Export options
- [ ] AI-powered dream summaries
- [ ] Voice notes & PWA
- [ ] Community features

---

## 🔐 Notes

- Auth routes are protected using **AuthContext + ProtectedRoute**.
- API requests require a valid **JWT token** from the backend.
- Use **HTTPS** and environment variables in production.

---

## 🌟 Preview (COMING SOON)
