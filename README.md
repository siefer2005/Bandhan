# Bandhan - Wedding Planning App

A comprehensive wedding planning application built with React Native and Expo, featuring Firebase integration for data persistence and user authentication.

## Features

- **Guest Management**: Add, edit, and track RSVP status for wedding guests
- **Wedding Checklist**: Comprehensive timeline-based checklist with categories
- **Budget Calculator**: Track and manage wedding budget across different categories
- **Vendor Management**: Organize and track wedding vendors and their details
- **User Authentication**: Secure login/signup with Firebase Authentication
- **Data Persistence**: All data is stored securely in Firebase Firestore
- **Real-time Updates**: Changes sync across devices in real-time

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **State Management**: React Context API
- **UI Components**: Custom components with React Native

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Bandhan
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md)
   - Update the Firebase configuration in `config/firebase.ts`

4. Start the development server:
```bash
npm start
```

5. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
Bandhan/
├── app/                    # Main app screens
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── guests.tsx     # Guest management
│   │   ├── checklist.tsx  # Wedding checklist
│   │   ├── budget.tsx     # Budget calculator
│   │   └── vendors.tsx    # Vendor management
│   ├── login.tsx          # Authentication screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── config/               # Configuration files
│   └── firebase.ts       # Firebase configuration
├── contexts/             # React Context providers
│   └── AuthContext.tsx   # Authentication context
├── services/             # Firebase service functions
│   └── firebaseService.ts # Database operations
├── constants/            # App constants
├── hooks/               # Custom React hooks
└── assets/              # Images, fonts, etc.
```

## Firebase Integration

The app uses Firebase for:

- **Authentication**: Email/password sign-in and sign-up
- **Database**: Firestore for storing all wedding data
- **Security**: User-specific data access with Firestore security rules

### Database Collections

- `guests`: Guest list with RSVP status
- `checklistItems`: Wedding planning checklist items
- `budgetCategories`: Budget allocation by category
- `vendors`: Vendor information and booking status

### Security

All data is secured with Firestore security rules that ensure users can only access their own data. Each document includes a `userId` field that matches the authenticated user's ID.

## Key Features

### Guest Management
- Add guests with optional plus-one information
- Track RSVP status (pending, confirmed, declined)
- View guest statistics and counts
- Delete guests with confirmation

### Wedding Checklist
- Timeline-based organization (4 months, 3 months, etc.)
- Category filtering (Venue, Catering, Attire, etc.)
- Mark items as complete/incomplete
- Comprehensive wedding planning tasks

### Budget Calculator
- Set total wedding budget
- Automatic percentage-based category allocation
- Indian currency formatting (₹)
- Visual budget breakdown

### Vendor Management
- Add vendor details (name, category, contact info)
- Track booking status
- Organize by vendor categories
- Add notes and additional information

## Authentication Flow

1. Users can sign up with email and password
2. Existing users can sign in with their credentials
3. Authentication state is managed globally with React Context
4. All database operations require authentication
5. Users are redirected to login if not authenticated

## Development

### Adding New Features

1. Create new screens in the `app/` directory
2. Add Firebase service functions in `services/firebaseService.ts`
3. Update security rules if needed
4. Test with Firebase Console

### Database Schema Changes

When modifying the database schema:

1. Update TypeScript interfaces in `services/firebaseService.ts`
2. Update Firebase security rules
3. Test data migration if needed
4. Update related components

## Deployment

### Expo Build

```bash
# Build for production
expo build:android
expo build:ios
```

### Firebase Deployment

1. Configure Firebase hosting (if needed)
2. Update production Firebase configuration
3. Set up proper security rules for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [Firebase Setup Guide](./FIREBASE_SETUP.md)
- Review Firebase documentation
- Open an issue in the repository

## Acknowledgments

- Firebase for backend services
- Expo for the development platform
- React Native community for tools and libraries
