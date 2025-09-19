# 📱 Expo Supabase Starter Template

**Supabase + Expo (SDK 53) Starter Template** A mobile-first Expo app (React 19 + React Native 0.79) that uses Supabase JWT authentication. After login, users can see their content across four main tabs.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Prerequisites](#️-prerequisites)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Installation & Running](#-installation--running)
- [Expo Go / Device Notes](#-expo-go--device-notes)
- [Supabase Setup & Auth Flow](#-supabase-setup--auth-flow)
- [Images & Assets](#-images--assets)
- [Troubleshooting](#️-troubleshooting)
- [Future Enhancements](#️-future-enhancements)
- [Security Notes](#-security-notes)
- [Contributing](#-contributing)
- [License](#️-license)
- [Useful Commands](#-useful-commands)

---

## 📝 Overview

This repository is a starter template that integrates:

- ⚡ Expo SDK 53
- ⚛️ React 19 + React Native 0.79
- 🔐 Supabase JWT Auth
- 🧠 Redux Toolkit for global state
- 🧭 React Navigation (Native Stack + Bottom Tabs)
- 🔒 Secure token storage with Expo Secure Store / AsyncStorage

---

## ✨ Features

- Supabase authentication using JWT
- Persisted session with SecureStore / AsyncStorage
- Bottom-tab navigation + stack navigation
- Redux Toolkit state management
- Expo-friendly (works with Expo Go SDK 53)
- Optional Web support via `expo start --web`

---

## ⚙️ Prerequisites

- Node.js (LTS recommended)
- `npm` or `yarn`
- Expo CLI via `npx` (comes with Expo)
- Supabase account & project
- Android/iOS device or emulator  
  _(Expo Go app on device must support SDK 53)_

> 💡 **Important:** This project targets **Expo SDK 53**. Use an **Expo Go version that supports SDK 53 only** to run this app.

---

## 🔐 Environment Variables

Create a `.env` file in your project root and add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=[https://your-project-ref.supabase.co](https://your-project-ref.supabase.co)
EXPO_PUBLIC_SUPABASE_KEY=your-public-anon-key
```

⚠️ Warning: Do NOT put service-role keys in client-side code. Only use public anonymous keys. Ensure your .env file is added to .gitignore.

---

## 📁 Project Structure
```
/ (root)
├─ /assets           # images, icons
├─ /src
│  ├─ /api            # supabase client wrapper
│  ├─ /components     # shared UI components
│  ├─ /navigation     # navigation stacks & tabs
│  ├─ /screens        # Home, Dashboard, Profile, Settings
│  ├─ /store          # redux toolkit slices
│  └─ /utils          # helpers
├─ App.tsx
├─ .env
├─ package.json
└─ README.md
```
---

## 🚀 Installation & Running

```
# 1. Clone the repo
git clone <your-repo-url>
cd ims-mobile

# 2. Install dependencies
npm install

# 3. Create .env file (see "Environment Variables" section)

# 4. Start Metro bundler
npx expo start

# OR use a tunnel if devices are on different networks
npx expo start --tunnel
```

After starting, you can open the app on your desired platform.

Launch on a specific platform:

```
# Android
npx expo start --android

# iOS (Mac only)
npx expo start --ios

# Web (experimental)
npx expo start --web
```
---

## 📲 Expo Go / Device Notes
Use an Expo Go app that supports SDK 53.

For LAN mode (the default), ensure your mobile device and computer are on the same Wi-Fi network.

If LAN connection fails, use tunnel mode:

```
npx expo start --tunnel
```
Scanning the QR code from the terminal with your phone's camera (or the scanner in Expo Go) is the easiest way to load the app on your device.

iOS simulators and Android emulators are also fully supported.

---

## 🧩 Supabase Setup & Auth Flow
Create a Supabase project at supabase.com.

In your Supabase project dashboard, navigate to Authentication -> Providers and enable Email.

Go to Project Settings -> API to get your Project URL and Public anon key.

Add these keys to your .env file as described above.

The app uses a Supabase client wrapper, typically located in /src/api/supabase.ts, to initialize Supabase:

```
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { 
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

```

On successful login, Supabase automatically persists the JWT session in AsyncStorage.

The application logic restores this session on app launch to determine if the user should see the login screen or the main app content.

---
## 🛠️ Troubleshooting
App won’t start or has dependency errors: Delete node_modules and the lock file, then reinstall.

```

rm -rf node_modules package-lock.json
npm install
Metro bundler cache issues: Start the server with the cache clearing flag.

```
```
npx expo start -c
```
Expo Go shows "incompatible" error: Ensure your installed Expo Go app version supports SDK 53. You may need to install an older build if your app store version is too new.

Cannot connect to Metro on device:

Confirm both devices are on the same Wi-Fi.

Ensure your firewall is not blocking the port used by Metro.

Use tunnel mode as a reliable alternative: npx expo start --tunnel.

User session is lost after app restart: Verify your token storage and session restoration logic. Check the Supabase client initialization to ensure persistSession is enabled.
---

## 🛣️ Future Enhancements
Role-Based Access Control (RBAC): Implement logic based on user roles from Supabase.

Token Refresh & Expiry Handling: Build robust logic to handle token refreshes gracefully.

Push Notifications: Integrate Expo Notifications for user engagement.

CI/CD: Set up automated builds and deployments with EAS Build.

Testing: Add unit tests with Jest and end-to-end tests with Detox.

i18n: Implement multi-language support.

OAuth Login: Add social login options (Google, Apple, etc.) via Supabase.

---

## 🔐 Security Notes
Never expose your service_role key or other private keys in the client-side app.

Always add .env to your .gitignore file to prevent secrets from being committed.

Implement and review Supabase Row Level Security (RLS) policies to protect your data.

For sensitive operations, consider using Supabase Edge Functions as a secure backend layer.
---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork this repository.

Create a new feature branch (git checkout -b feat/my-awesome-feature).

Commit your changes (git commit -m 'Add some awesome feature').

Push to the branch (git push origin feat/my-awesome-feature).

Open a Pull Request.

---

### ⚖️ License
This project is licensed under the MIT License. See the LICENSE file for details.
