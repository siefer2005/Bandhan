
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

export const GOOGLE_AUTH_CONFIG = {
  
  CLIENT_ID: ' ',
  CLIENT_SECRET: ' ',
  
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


export const getRedirectUri = () => {
  return 'http://localhost:8081/--/login';
};


export const logRedirectUri = () => {
  const uri = getRedirectUri();
  console.log('Generated Redirect URI:', uri);
  return uri;
};
