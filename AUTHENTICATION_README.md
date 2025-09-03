# Bandhan App - Authentication System

This document describes the authentication system implemented in the Bandhan app, which includes Google OAuth integration and a complete user management system.

## Features

### 🔐 Authentication Methods
- **Google OAuth 2.0**: Secure sign-in using Google accounts
- **Email/Mobile**: Traditional email-based authentication
- **Social Login**: Facebook integration (placeholder for future implementation)

### 🎨 UI Components
- **Login Screen**: Beautiful, culturally-themed login interface
- **User Profile**: Display user information and sign-out functionality
- **Auth Demo**: Interactive demonstration of authentication features
- **Responsive Design**: Works on all screen sizes and orientations

### 🛡️ Security Features
- **JWT-like Token Storage**: Secure token management using AsyncStorage
- **Authentication Guards**: Route protection based on user status
- **Session Management**: Automatic authentication state checking
- **Secure Redirects**: Protected navigation between authenticated/unauthenticated areas

## Architecture

### File Structure
```
├── app/
│   ├── _layout.tsx          # Root layout with AuthProvider
│   ├── login.tsx            # Login screen component
│   └── (tabs)/              # Protected tab navigation
├── components/
│   ├── AuthContext.tsx      # Authentication context provider
│   ├── AuthGuard.tsx        # Route protection component
│   ├── UserProfile.tsx      # User profile display
│   └── AuthDemo.tsx         # Authentication demo
├── constants/
│   └── GoogleAuth.ts        # Google OAuth configuration
└── contexts/
    └── AuthContext.tsx      # Authentication state management
```

### Key Components

#### 1. AuthContext (`contexts/AuthContext.tsx`)
- Manages global authentication state
- Provides `signIn`, `signOut`, and `checkAuthState` functions
- Handles AsyncStorage operations for persistence
- Exports `useAuth` hook for easy access

#### 2. Login Screen (`app/login.tsx`)
- Implements the exact design from your image
- Google OAuth integration using expo-auth-session
- Email/mobile input validation
- Social login buttons (Facebook placeholder)
- Terms of Service and Privacy Policy links

#### 3. AuthGuard (`components/AuthGuard.tsx`)
- Protects routes based on authentication status
- Automatic redirects for unauthenticated users
- Loading states during authentication checks

#### 4. UserProfile (`components/UserProfile.tsx`)
- Displays current user information
- Sign-out functionality with confirmation
- Shows authentication provider details

## Setup Instructions

### 1. Install Dependencies
```bash
npm install expo-auth-session expo-crypto @react-native-async-storage/async-storage
```

### 2. Google OAuth Configuration
1. Follow the detailed guide in `GOOGLE_OAUTH_SETUP.md`
2. Update `constants/GoogleAuth.ts` with your credentials
3. Configure redirect URIs in Google Cloud Console

### 3. Environment Variables (Optional)
Create a `.env` file for production credentials:
```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## Usage

### Basic Authentication Flow
1. **Unauthenticated User**: Redirected to `/login`
2. **Google Sign-in**: Click Google button → OAuth flow → Redirect to main app
3. **Email Sign-in**: Enter email → Validation → Redirect to main app
4. **Authenticated User**: Access to all protected routes and tabs

### Using the Auth Hook
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signIn, signOut, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!user) return <LoginPrompt />;
  
  return <AuthenticatedContent />;
}
```

### Protected Routes
```typescript
// Automatically redirects unauthenticated users
<AuthGuard requireAuth={true}>
  <ProtectedComponent />
</AuthGuard>

// Only shows for unauthenticated users
<AuthGuard requireAuth={false}>
  <LoginComponent />
</AuthGuard>
```

## Customization

### Styling
- Colors are defined in the StyleSheet objects
- Main theme colors: Dark Red (#8B0000), Golden Tan (#DAA520)
- Easy to modify for different brand colors

### Adding New Providers
1. Update the `User` interface in `AuthContext.tsx`
2. Add new provider logic in the login screen
3. Update the UI to include new provider buttons

### Localization
- Text strings are easily replaceable
- Support for multiple languages can be added
- Cultural theming can be enhanced

## Security Considerations

### Current Implementation
- ✅ Secure token storage
- ✅ Route protection
- ✅ Input validation
- ✅ Error handling

### Recommended Enhancements
- 🔒 Implement proper JWT validation
- 🔒 Add refresh token logic
- 🔒 Implement biometric authentication
- 🔒 Add rate limiting for login attempts
- 🔒 Implement proper logout on all devices

## Testing

### Development Testing
1. Start the development server: `npm start`
2. Navigate to the login screen
3. Test Google OAuth flow
4. Test email validation
5. Verify protected route access

### Production Testing
1. Test with real Google OAuth credentials
2. Verify redirect URI handling
3. Test authentication persistence
4. Validate security measures

## Troubleshooting

### Common Issues
1. **Google OAuth errors**: Check credentials and redirect URIs
2. **Navigation issues**: Verify AuthGuard implementation
3. **State persistence**: Check AsyncStorage permissions
4. **TypeScript errors**: Ensure all dependencies are installed

### Debug Mode
- Check console logs for authentication flow
- Verify AsyncStorage operations
- Monitor navigation state changes
- Test with different user scenarios

## Future Enhancements

### Planned Features
- 🔮 Facebook OAuth integration
- 🔮 Apple Sign-in (iOS)
- 🔮 Biometric authentication
- 🔮 Multi-factor authentication
- 🔮 User profile management
- 🔮 Password reset functionality

### Performance Optimizations
- 🚀 Lazy loading of authentication components
- 🚀 Optimized token refresh logic
- 🚀 Caching strategies for user data
- 🚀 Background authentication state sync

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Google OAuth setup guide
3. Verify TypeScript compilation
4. Test with minimal configuration first

## License

This authentication system is part of the Bandhan app project. Please ensure compliance with Google OAuth terms and React Native best practices.
