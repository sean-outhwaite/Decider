# Decider

Decider is a React Native app built with Expo that helps two people collaboratively decide on movies or TV shows to watch. One person submits recommendations, and the other confirms them, moving items to a "confirmed" list for easy tracking.

## Features

- **Submit Recommendations**: Enter movie or TV show titles as Person A or Person B.
- **Confirm Suggestions**: Review pending recommendations and confirm them (only if you're not the submitter).
- **User Handling**: Currently will determine user based on operating system (I use iOS, my partner uses Android) but could be easily configured to handle unique logins.
- **Tabbed Interface**: Navigate between Submitted (pending), Confirmed (approved), and other tabs.
- **Shared State**: Recommendations are shared across tabs using React Context.
- **Responsive Design**: Works on iOS & Android with light/dark mode support.

## Project Structure

- `app/`: Main app directory with file-based routing.
  - `index.tsx`: Root home screen.
  - `(tabs)/`: Tab navigator screens.
    - `index.tsx`: Submit recommendations.
    - `explore.tsx`: Confirm and view confirmed items.
  - `providers/`: Context providers (e.g., for recommendations state).
- `components/`: Reusable UI components.
- `constants/`: Theme and app constants.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) with React Native.
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction) for file-based navigation.
- **State Management**: React Context for shared state.
- **UI**: Custom themed components with support for light/dark modes.
- **Development**: TypeScript, ESLint.
