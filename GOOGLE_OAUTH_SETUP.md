# Google OAuth Setup Guide for Bandhan App

This guide will help you set up Google OAuth authentication for your Bandhan app.

## Prerequisites

- Google Cloud Console account
- Expo development environment
- React Native project with expo-auth-session

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google OAuth2 API" if available

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure the OAuth consent screen if prompted
4. Set Application Type to "Web application"
5. Add authorized redirect URIs:
   - For development: `http://localhost:19006/login`
   - For production: `https://your-domain.com/login`
   - For Expo Go: `https://auth.expo.io/@your-username/bandhan`
6. Click "Create"
7. Copy the Client ID and Client Secret

## Step 3: Update Configuration Files

1. Open `constants/GoogleAuth.ts`
2. Replace the placeholder values:
   ```typescript
   export const GOOGLE_AUTH_CONFIG = {
     CLIENT_ID: 'YOUR_ACTUAL_CLIENT_ID',
     CLIENT_SECRET: 'YOUR_ACTUAL_CLIENT_SECRET',
     // ... rest of the config
   };
   ```

## Step 4: Environment Variables (Optional but Recommended)

For better security, you can use environment variables:

1. Create a `.env` file in your project root:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

2. Install expo-constants:
   ```bash
   npm install expo-constants
   ```

3. Update `constants/GoogleAuth.ts`:
   ```typescript
   import Constants from 'expo-constants';
   
   export const GOOGLE_AUTH_CONFIG = {
     CLIENT_ID: Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID',
     CLIENT_SECRET: Constants.expoConfig?.extra?.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
     // ... rest of the config
   };
   ```

## Step 5: Test the Authentication

1. Start your Expo development server:
   ```bash
   npm start
   ```

2. Navigate to the login screen
3. Click the "Google" button
4. Complete the Google OAuth flow
5. Verify that you're redirected back to the app

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**:
   - Make sure the redirect URI in Google Cloud Console matches exactly
   - For Expo Go, use the format: `https://auth.expo.io/@username/project-slug`

2. **"Client ID not found" error**:
   - Verify the Client ID is correct in your configuration
   - Make sure the Google+ API is enabled

3. **Authentication flow not completing**:
   - Check that `WebBrowser.maybeCompleteAuthSession()` is called
   - Verify the scheme in `app.json` matches your configuration

### Debug Tips

1. Check the console logs for detailed error messages
2. Verify your OAuth configuration in Google Cloud Console
3. Test with a simple redirect URI first (e.g., localhost)
4. Make sure your app's bundle identifier matches the OAuth configuration

## Security Considerations

1. **Never commit credentials to version control**
2. **Use environment variables for production**
3. **Implement proper token validation**
4. **Add CSRF protection for web implementations**
5. **Regularly rotate your OAuth credentials**

## Additional Resources

- [Expo AuthSession Documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Native OAuth Best Practices](https://reactnative.dev/docs/security)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the Google Cloud Console logs
3. Check Expo documentation and community forums
4. Verify your OAuth configuration step by step
