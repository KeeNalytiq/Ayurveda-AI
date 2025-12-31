# Ayurveda AI - Smart Health Profile & Medicine Recommendation System

![Version](https://img.shields.io/badge/version-2.0-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)

> 🌿 **Personalized Ayurvedic health management powered by AI**

Developed by **Keeistu M S**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

---

## 🎯 Overview

Ayurveda AI is a comprehensive health management platform that combines traditional Ayurvedic wisdom with modern AI technology. The application provides personalized medicine recommendations, health tracking, and wellness insights based on user health profiles.

**Key Highlights:**
- ✨ AI-powered personalized medicine recommendations
- 📊 Complete health profile management
- 📅 Medicine schedule tracking with adherence monitoring
- 📈 Symptom tracking and wellness scoring (0-100)
- 🤖 Ayru Buddie - Intelligent Ayurvedic health chatbot
- 🌿 Seasonal guidance (Ritucharya) and daily routine (Dinacharya)
- 🌙 Dark theme support
- 📱 Fully responsive design for mobile, tablet, and desktop

---

## ✨ Features

### 1. **Health Profile System**
- Multi-step profile form (Basic Info, Health Status, Lifestyle, Goals)
- Stores age, weight, height, gender, blood group
- Health conditions, allergies, current medications
- Diet type, sleep, exercise, stress level tracking
- Taste preferences for personalized recommendations

### 2. **Smart Medicine Recommendations**
- **Personalized Scoring Algorithm** (0-100% match)
- Analyzes:
  - Health conditions (30 points)
  - Health goals (25 points)
  - Age-based recommendations (15 points)
  - Lifestyle factors - stress, sleep, exercise (20 points)
  - Gender-specific formulations (10 points)
  - BMI-based weight management (10 points)
- Displays: Dosage, timing, duration, anupana (vehicle)
- One-click "Add to Schedule"

### 3. **Medicine Schedule Tracker**
- Daily view with Morning/Afternoon/Evening/Night sections
- **Done/Not Done** buttons for every medicine
- Adherence percentage with circular progress indicator
- **Calendar Week View** - Shows last 7 days with adherence dots
  - 🟢 Green (80%+) - Excellent adherence
  - 🟡 Amber (50-79%) - Good adherence
  - 🔴 Red (<50%) - Needs improvement
- Click any day to view that day's schedule

### 4. **Symptom Tracker**
- Log symptoms with severity scale (1-10)
- Trend analysis: Improving/Stable/Worsening
- Optional notes for each symptom
- Visual severity bars and trend indicators

### 5. **Wellness Dashboard**
- **Wellness Score** (0-100) calculated from:
  - Medicine adherence (20 points)
  - Symptom trends (20 points)
  - Lifestyle factors (20 points)
  - Consistency tracking (10 points)
  - Base score (30 points)
- Metric cards showing key health indicators
- Motivational messages based on score
- Quick stats and progress overview

### 6. **Ayru Buddie Chatbot**
- AI-powered health companion using Gemini API
- Suggests actual formulations from database
- Provides:
  - Specific medicine recommendations with dosage
  - Lifestyle and dietary tips
  - Structured responses with emojis
  - Proper medical disclaimers
- Fallback to demo mode if API key not configured

### 7. **Seasonal Guidance (Ritucharya)**
- Auto-detects current season
- Season-specific tips for:
  - Summer (Grishma)
  - Monsoon (Varsha)
  - Winter (Hemanta & Shishira)
  - Spring (Vasanta)
- Recommended foods and foods to avoid
- Lifestyle adaptations

### 8. **Daily Routine (Dinacharya)**
- 7-period timeline visualization
- Wake-up routine, cleansing, meal timings
- Evening wind-down and sleep schedule
- Ayurvedic best practices

### 9. **Additional Features**
- 🔐 Google Authentication via Firebase
- 💾 Firebase Firestore data persistence
- 🔍 Browse 50+ Ayurvedic formulations
- ⭐ Favorites and comparison tools
- 🎨 Ayurvedic color theme (earthy greens & golds)
- 🌗 Light/Dark theme toggle

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

### Backend & Services
- **Firebase Authentication** - Google Sign-In
- **Firebase Firestore** - Database
- **Gemini API** - AI chatbot (optional)

### Styling
- **Vanilla CSS** - Custom styling with CSS variables
- **CSS Grid & Flexbox** - Responsive layouts
- **Ayurvedic color palette** - #16A34A (green), #D97706 (gold)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- (Optional) Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd AyurvedaAI - S8/ayurveda-ai-react
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env` file in `ayurveda-ai-react/` directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: Gemini API for chatbot
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name (e.g., "ayurveda-ai")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console → Authentication
2. Click "Get started"
3. Enable "Google" sign-in method
4. Add your domain to authorized domains

### 3. Create Firestore Database
1. In Firebase Console → Firestore Database
2. Click "Create database"
3. Start in **production mode**
4. Choose location (e.g., asia-south1)

### 4. Set Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Get Firebase Config
1. Project Settings → General
2. Scroll to "Your apps" → Web app
3. Copy config values to `.env`

---

## 📁 Project Structure

```
ayurveda-ai-react/
├── src/
│   ├── components/
│   │   ├── AuthButton/         # Google authentication button
│   │   ├── ChatBot/            # Ayru Buddie chatbot
│   │   ├── HomePage/           # Landing page
│   │   ├── Profile/            # Health profile components
│   │   │   ├── ProfilePage.jsx          # Main profile with tabs
│   │   │   ├── ProfileForm.jsx          # 4-step health form
│   │   │   ├── MedicineRecommendations.jsx
│   │   │   ├── SymptomTracker.jsx
│   │   │   ├── WellnessDashboard.jsx
│   │   │   ├── SeasonalGuidance.jsx
│   │   │   └── DailyRoutine.jsx
│   │   ├── Schedule/           # Medicine schedule tracker
│   │   ├── FormulationCard/    # Medicine card component
│   │   └── ThemeToggle/        # Dark mode toggle
│   ├── data/
│   │   └── formulations.js     # 50+ Ayurvedic formulations
│   ├── firebase/
│   │   └── config.js           # Firebase initialization
│   ├── services/
│   │   └── RecommendationEngine.js  # Scoring algorithm
│   ├── store/
│   │   └── useStore.js         # Zustand state management
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles & theme
│   └── main.jsx                # Entry point
├── .env                        # Environment variables
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌍 Deployment

### Deploy to Vercel

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Build and deploy
```bash
npm run build
vercel --prod
```

3. Add environment variables in Vercel dashboard

### Deploy to Firebase Hosting

1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

2. Login and initialize
```bash
firebase login
firebase init hosting
```

3. Build and deploy
```bash
npm run build
firebase deploy
```

---

## 📱 Mobile Responsiveness

The application is **fully responsive** and automatically adapts to:
- 📱 Mobile phones (< 480px)
- 📱 Tablets (< 768px)
- 💻 Desktops (> 768px)

**Mobile Features:**
- Hamburger menu navigation
- Collapsible sidebar
- Touch-friendly buttons
- Simplified layouts
- Hidden text labels on small screens

---

## 🎨 Color Theme

**Ayurvedic Palette:**
- Primary Green: `#16A34A` (Ayurvedic healing)
- Accent Gold: `#D97706` (Traditional wisdom)
- Earth: `#92400E`
- Sage: `#65A30D`

**Dark Theme:**
- Automatically inverts colors
- Maintains readability
- All components support dark mode

---

## 📄 License

This project is developed by **Keeistu M S**.

---

## 🙏 Acknowledgments

- Traditional Ayurvedic wisdom
- Open-source community
- Firebase and Google Cloud
- React and Vite teams

---

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Made with 🌿 and ❤️ by Keeistu M S**
