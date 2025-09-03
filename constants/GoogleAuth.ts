// Google OAuth Configuration using Expo Auth Session
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Complete the auth session for web browsers
WebBrowser.maybeCompleteAuthSession();

export const GOOGLE_AUTH_CONFIG = {
  // Replace these with your actual Google OAuth credentials
  CLIENT_ID: '817530679697-hj03bnfkoj04oratlc59tej0pn6h9t13.apps.googleusercontent.com',
  CLIENT_SECRET: 'ANIMESH10',
  
  // OAuth endpoints
  AUTH_ENDPOINT: 'https://accounts.google.com/o/oauth2/v2/auth',
  TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
  REVOCATION_ENDPOINT: 'https://oauth2.googleapis.com/revoke',
  
  // Scopes
  SCOPES: ['openid', 'profile', 'email'],
  
  // Redirect URI scheme
  SCHEME: 'bandhan',
  PATH: 'login',
};

// Discovery document for OAuth
export const GOOGLE_DISCOVERY = {
  authorizationEndpoint: GOOGLE_AUTH_CONFIG.AUTH_ENDPOINT,
  tokenEndpoint: GOOGLE_AUTH_CONFIG.TOKEN_ENDPOINT,
  revocationEndpoint: GOOGLE_AUTH_CONFIG.REVOCATION_ENDPOINT,
};

// Expo Auth Session configuration
export const createGoogleAuthRequest = () => {
  return new AuthSession.AuthRequest({
    clientId: GOOGLE_AUTH_CONFIG.CLIENT_ID,
    scopes: GOOGLE_AUTH_CONFIG.SCOPES,
    redirectUri: 'http://localhost:8081/--/login',
    responseType: AuthSession.ResponseType.Code,
    extraParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  });
};

// Get the redirect URI that Expo generates
export const getRedirectUri = () => {
  return 'http://localhost:8081/--/login';
};

// Log the redirect URI for debugging (remove this in production)
export const logRedirectUri = () => {
  const uri = getRedirectUri();
  console.log('Generated Redirect URI:', uri);
  return uri;
};
