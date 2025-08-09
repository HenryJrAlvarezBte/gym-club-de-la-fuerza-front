import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// TODO: Replace with your Google OAuth configuration
const GOOGLE_CLIENT_ID = 'your-google-client-id.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'your-google-client-secret';

// Configure AuthSession for web
WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export class GoogleAuthService {
  static async signInAsync(): Promise<string | null> {
    try {
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'el-club-de-la-fuerza',
        path: 'auth',
      });

      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          access_type: 'offline',
        },
      });

      const result = await request.promptAsync(discovery);

      if (result.type === 'success') {
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            code: result.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier || '',
            },
          },
          discovery
        );

        return tokenResponse.accessToken;
      }

      return null;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  static async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }
}
