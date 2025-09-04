## Bandhan — Wedding Planner (Expo + React Native)

Bandhan is a cross‑platform wedding planning app built with Expo Router, React Native, and Firebase. It helps couples track budgets, manage guests, vendors, and a wedding checklist — all in one place.

### Tech stack
- **App**: React 19, React Native 0.79, Expo 53, Expo Router 5
- **Auth & Data**: Firebase Auth, Firestore, Storage
- **UI/UX**: Expo Haptics, Image, Image Picker, Blur, Status Bar, etc.

### Key features
- **Authentication**: Email/password and (scaffolded) Google OAuth
- **Wedding checklist**: Track to‑dos via `components/WeddingChecklistCard.tsx`
- **Budgeting**: Plan and monitor wedding expenses (`app/(tabs)/budget.tsx`)
- **Guests & Vendors**: Organize key contacts and services
- **Profile**: Basic user profile screens

---

## Getting started

### Prerequisites
- Node.js 18+ and npm (or Yarn/PNPM)
- Android Studio (Android) and/or Xcode (iOS)
- Expo account (optional for EAS builds)

### Install
```bash
npm install
```

### Run (Metro dev server)
```bash
# Start the dev server (choose a platform in the Expo UI or via flags)
npm run start

# Or directly:
npm run android
npm run ios
npm run web
```

### Lint
```bash
npm run lint
```

---

## Configuration

This project includes placeholder credentials checked into the repo for development. Replace them with your own before publishing.

### 1) Firebase
File: `config/firebase.ts`

Replace the config with your Firebase project's credentials from the Firebase Console (Project settings → General → Your apps → SDK setup & configuration).

Required products:
- Authentication (enable Email/Password and any providers you use)
- Firestore Database
- Storage (optional if you use media uploads)

### 2) Google OAuth (Expo Auth Session)
File: `constants/GoogleAuth.ts`

Update the following values with your own Google OAuth credentials (Google Cloud Console → APIs & Services → Credentials):
- `CLIENT_ID`
- `CLIENT_SECRET`

Also verify the app scheme matches `app.json`:
- `app.json` → `expo.scheme` is `bandhan`

Redirect URIs to register in Google Cloud:
- Expo development (classic): `http://localhost:8081/--/login`
- Native scheme (used by deep links): `bandhan://login`

Helpful utility during development:
```bash
node scripts/get-redirect-uri.js
```

> Note: For production, configure platform‑specific redirect URIs and use EAS if needed.

---

## Project structure
```
app/
  _layout.tsx
  (tabs)/
    _layout.tsx
    index.tsx           # Home tab
    budget.tsx          # Budget planner
    checklist.tsx       # Wedding checklist
    guests.tsx          # Guests management
    vendors.tsx         # Vendors management
    ProfileScreen.tsx   # Profile within tabs
  index.tsx             # Entry routes
  login.tsx             # Auth screen(s)
  welcome.tsx

components/
  AuthGuard.tsx, UserProfile.tsx, WeddingChecklistCard.tsx, ...

config/
  firebase.ts           # Firebase initialization

constants/
  Colors.ts, GoogleAuth.ts

contexts/
  AuthContext.tsx       # Authentication context/provider

services/
  firebaseService.ts    # App‑level Firebase helpers

dataconnect/
  schema/               # DataConnect example schema (optional/experimental)
```

---

## Development notes
- Uses **Expo Router** for file‑system based navigation.
- `expo.scheme` is set to `bandhan` for deep linking and OAuth redirects.
- React Native New Architecture is enabled (`newArchEnabled: true`).

### Environment tips (Android/iOS/Web)
- Android: Start an emulator from Android Studio before running `npm run android`.
- iOS: Use `npm run ios` on macOS with Xcode installed.
- Web: `npm run web` starts a static web build via Metro.

---

## Build and release

### Using EAS (recommended)
```bash
npx expo login             # if not already logged in
npx expo install           # ensure native deps
npx expo run:android       # or: npx expo run:ios (prebuild)
npx eas build -p android   # requires EAS project config
npx eas build -p ios
```

### Classic builds
Refer to Expo documentation if you prefer classic build flows.

---

## Troubleshooting
- If Google OAuth hangs on web or native, re‑check redirect URIs and the `scheme`.
- If Metro cannot find devices, ensure ADB (Android) or Xcode simulators (iOS) are running.
- If Firebase calls fail, verify API keys and that the correct products are enabled.

---

## Contributing
Issues and PRs are welcome. Please run `npm run lint` before submitting.

## License
Specify a license (e.g., MIT) for the repository.
