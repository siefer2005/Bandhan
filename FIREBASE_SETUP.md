# Firebase Setup Guide for Bandhan Wedding App

This guide will help you set up Firebase for your wedding planning app to store guest lists, checklists, budget information, and vendor details.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "bandhan-wedding-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## Step 3: Create Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location closest to your users
5. Click "Done"

## Step 4: Set Up Security Rules

1. In Firestore Database, go to the "Rules" tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /guests/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /checklistItems/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /budgetCategories/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /vendors/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 5: Get Your Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Bandhan Web App")
6. Copy the configuration object

## Step 6: Update Your App Configuration

1. Open `config/firebase.ts` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-messaging-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 7: Test Your Setup

1. Run your app: `npm start`
2. Try to sign up with an email and password
3. Add some guests to test the database connection
4. Check your Firestore Database to see if data is being stored

## Step 8: Production Considerations

### Security Rules
For production, update your Firestore security rules to be more restrictive:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /guests/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /checklistItems/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /budgetCategories/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /vendors/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Environment Variables
For better security, consider using environment variables for your Firebase configuration:

1. Create a `.env` file in your project root
2. Add your Firebase config:
```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
```

3. Update `config/firebase.ts` to use environment variables:
```typescript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
```

## Database Structure

Your Firestore database will have the following collections:

### guests
- `id`: Document ID (auto-generated)
- `userId`: User ID (from Firebase Auth)
- `name`: Guest name
- `rsvpStatus`: 'pending' | 'confirmed' | 'declined'
- `plusOne`: Optional plus one name
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### checklistItems
- `id`: Document ID (auto-generated)
- `userId`: User ID (from Firebase Auth)
- `title`: Checklist item title
- `description`: Optional description
- `isCompleted`: Boolean
- `category`: Category name
- `timeline`: Timeline string
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### budgetCategories
- `id`: Document ID (auto-generated)
- `userId`: User ID (from Firebase Auth)
- `name`: Category name
- `amount`: Budget amount
- `percentage`: Percentage of total budget
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### vendors
- `id`: Document ID (auto-generated)
- `userId`: User ID (from Firebase Auth)
- `name`: Vendor name
- `category`: Vendor category
- `contact`: Contact information
- `email`: Optional email
- `website`: Optional website
- `notes`: Optional notes
- `isBooked`: Boolean
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Troubleshooting

### Common Issues

1. **Authentication errors**: Make sure you've enabled Email/Password authentication in Firebase
2. **Permission denied**: Check your Firestore security rules
3. **Configuration errors**: Verify your Firebase config values are correct
4. **Network errors**: Ensure you have an internet connection

### Debug Tips

1. Check the browser console for error messages
2. Use Firebase Console to monitor database activity
3. Test your security rules in the Firebase Console
4. Verify your app is using the correct Firebase project

## Next Steps

Once Firebase is set up, you can:

1. Update the remaining screens (checklist, budget, vendors) to use Firebase
2. Add real-time updates using Firestore listeners
3. Implement offline support
4. Add data export functionality
5. Set up backup and restore features

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs).
