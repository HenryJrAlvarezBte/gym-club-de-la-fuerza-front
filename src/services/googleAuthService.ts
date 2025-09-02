import { Platform } from 'react-native';

// Stubbed Google auth service: implement real logic when needed.
export class GoogleAuthService {
  static async signInAsync(): Promise<string | null> {
    // On web or when not configured, return null to indicate not available.
    // Android/iOS implementation can be added later.
    console.warn('GoogleAuthService.signInAsync: not implemented for this platform.');
    return null;
  }

  static async getUserInfo(accessToken: string): Promise<any> {
    // No-op stub: return null or basic shape if needed by consuming code.
    console.warn('GoogleAuthService.getUserInfo: not implemented for this platform.');
    return null;
  }
}


