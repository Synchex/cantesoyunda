# 🎯 Can Tes'Oyunda - Trivia Game App

A modern, feature-rich trivia game application built with React and TypeScript. Challenge yourself with thousands of questions across multiple categories in both English and Turkish!

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss)

## 🎮 Features

### Core Gameplay
- **"Who Wants to Be a Millionaire" Style Prize Ladder** - 12-question rounds with increasing rewards
- **Custom In-Game Currency (YUAN/元)** - Earn and accumulate virtual currency
- **Withdraw System** - Cash out your winnings at any point during the game
- **Circular Timer** - Visual countdown for each question
- **Animated Transitions** - Smooth, premium UI interactions

### Question Categories

#### 📚 General Knowledge
- Science (Mathematics, Physics, Biology, Chemistry)
- Culture (Literature, Cinema, Art)
- Expert-level difficulty questions

#### 🏛️ History (Turkish - TR)
- **İlk Çağ** - Ancient Era
- **Orta Çağ** - Medieval Era  
- **Yeni Çağ** - Early Modern Era
- **Yakın Çağ** - Late Modern Era
- **Antik Anadolu Uygarlıkları** - Ancient Anatolian Civilizations
- **Modern Dünya Tarihi** - Modern World History (WWI & WWII)

#### 🏛️ History (English - EN)
- Ancient History
- Medieval History
- Modern History

#### ⚽ Sports (Turkish - TR)
- **Futbol** - Turkish & World Football
- **Basketbol** - Basketball
- **Genel Spor** - General Sports
- **Spor Efsaneleri** - Sports Legends

### Difficulty Levels
- Easy / Kolay
- Medium / Orta
- Hard / Zor
- Mixed / Karışık (Random difficulty selection)

### 🌍 Bilingual Support
- Full English and Turkish language support
- Dynamic category filtering based on selected language
- Localized UI and question content

### 📊 Game History
- Track all your game sessions
- View statistics: rounds reached, correct answers, prizes won
- Withdrawal and loss tracking

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4 + Custom CSS
- **UI Components**: Radix UI, MUI, Lucide Icons
- **Animations**: Motion (Framer Motion)
- **State Management**: React Context API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Synchex/cantesoyunda.git

# Navigate to project directory
cd cantesoyunda

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

## 📁 Project Structure

```
cantesoyunda/
├── src/
│   └── app/
│       ├── components/       # React components
│       │   ├── QuestionScreen.tsx
│       │   ├── PrizeLadder.tsx
│       │   ├── CategorySelection.tsx
│       │   ├── DifficultySelection.tsx
│       │   ├── HistorySubcategoryScreen.tsx
│       │   ├── SportsSubcategoryScreen.tsx
│       │   └── ...
│       ├── context/          # React Context providers
│       │   ├── GameHistoryContext.tsx
│       │   └── CreditContext.tsx
│       └── data/
│           ├── questionBank.ts
│           ├── translations.ts
│           └── seeds/        # Question batches (JSON)
├── server/                   # Backend server files
├── index.html
├── package.json
└── vite.config.ts
```

## 📊 Question Database

The app includes **2000+ questions** across multiple categories:

| Batch | Category | Language | Count |
|-------|----------|----------|-------|
| batch_001-004 | General Knowledge | EN/TR | 500+ |
| batch_007-016 | Turkish History | TR | 400+ |
| batch_017-020 | Turkish Sports | TR | 200+ |
| batch_021 | GK Revamp (Expert) | TR | 100+ |
| batch_030-031 | English History | EN | 150+ |

## 🎨 UI Features

- **Dark Theme** - Eye-friendly dark mode design
- **Gold Accents** - Premium gold highlights for rewards
- **Glassmorphism** - Modern glass-like UI elements
- **Responsive Design** - Works on mobile and desktop
- **Micro-animations** - Smooth transitions and feedback

## 📝 Recent Updates

### February 2026
- ✅ Added Turkish History subcategories (6 eras)
- ✅ Added Turkish Sports subcategories (4 types)
- ✅ Implemented GK question revamp with expert-level difficulty
- ✅ Added English History question batches
- ✅ Implemented Withdraw feature with confirmation modal
- ✅ Added Mixed/Random difficulty option
- ✅ Prize Ladder system with YUAN currency
- ✅ Game history tracking and statistics

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Original design from [Figma Community](https://www.figma.com/design/R3md75ea1i4w1R56bdDTLb/Mobile-Trivia-Game-App)
- Question content curated for Turkish and English audiences