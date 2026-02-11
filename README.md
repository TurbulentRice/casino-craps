# Casino Craps Learning App

A cross-platform mobile application built with Expo/React Native for learning how to play casino craps and practicing different betting strategies.

## Overview

This app is designed to help beginners and intermediate players:
- Learn the rules and fundamentals of casino craps
- Practice different betting strategies in a risk-free environment
- Understand odds and payouts for various bets
- Build confidence before playing in a real casino

## Features (Planned)

### Core Features
- **Interactive Craps Table**: Fully functional, visually appealing craps table simulation
- **Tutorial Mode**: Step-by-step guided lessons on how to play
- **Practice Mode**: Free play with virtual chips to practice strategies
- **Betting Guide**: Visual reference for all bet types, odds, and payouts
- **Strategy Simulator**: Test popular betting strategies and see outcomes

### Learning Features
- Animated dice rolls with realistic physics
- Highlighted betting areas with tooltips
- Real-time calculation of odds and payouts
- Statistics tracking for practice sessions
- Achievement system to encourage learning

## Tech Stack

- **Framework**: Expo / React Native
- **Language**: TypeScript
- **Target Platforms**: iOS, Android, Web
- **State Management**: React Context / Redux (TBD)
- **Animations**: React Native Reanimated
- **Navigation**: React Navigation

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for macOS) or Android Emulator

### Installation

```bash
npm install
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

## Project Structure

```
casino-craps/
├── App.tsx                 # Main application entry point
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── constants/         # App constants and configurations
│   └── assets/            # Images, fonts, etc.
├── docs/                  # Documentation and planning
└── tests/                 # Test files
```

## Development Roadmap

See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for the detailed implementation plan.

## Contributing

This is a personal learning project. Feedback and suggestions are welcome!

## License

MIT License - feel free to use this project for learning purposes.

## Acknowledgments

- Craps rules and strategies based on standard casino practices
- Built with Expo for cross-platform compatibility
