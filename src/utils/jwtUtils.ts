import jwt_decode from 'jwt-decode';

export interface JWTPayload {
  sub: string; // user id
  email: string;
  name?: string;
  iat: number; // issued at
  exp: number; // expiration
  provider?: 'email' | 'google';
}

export class JWTUtils {
  static isTokenValid(token: string): boolean {
    try {
      const decoded = jwt_decode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;
      
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  static getTokenExpiration(token: string): Date | null {
    try {
      const decoded = jwt_decode<JWTPayload>(token);
      return new Date(decoded.exp * 1000);
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }

  static getTokenPayload(token: string): JWTPayload | null {
    try {
      return jwt_decode<JWTPayload>(token);
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }

  static isTokenExpiringSoon(token: string, thresholdMinutes: number = 5): boolean {
    try {
      const decoded = jwt_decode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;
      const thresholdSeconds = thresholdMinutes * 60;
      
      return decoded.exp - currentTime < thresholdSeconds;
    } catch (error) {
      console.error('Token expiration check error:', error);
      return true; // Assume expired if we can't decode
    }
  }

  static getTimeUntilExpiration(token: string): number {
    try {
      const decoded = jwt_decode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;
      
      return Math.max(0, decoded.exp - currentTime);
    } catch (error) {
      console.error('Token expiration time error:', error);
      return 0;
    }
  }
}
