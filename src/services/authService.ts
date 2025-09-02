import { LoginCredentials, RegisterCredentials, User, AuthResponse, OnboardingData } from '../types/auth';
import { Platform } from 'react-native';

const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock de usuario de prueba
    if (
      credentials.email === 'test@club.com' &&
      credentials.password === '123456'
    ) {
      return {
        token: 'mocked-token',
        message: 'Welcome test@club.com',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Try to read error message from server
        let errMsg = `Login failed (${response.status})`;
        try {
          const errBody = await response.json();
          if (errBody && errBody.message) errMsg = errBody.message;
        } catch (e) {
          // ignore json parse errors
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      return {
        token: data.token,
        message: data.message,
        refreshToken: data.refreshToken,
        user: data.user,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        let errMsg = `Registration failed (${response.status})`;
        try {
          const errBody = await response.json();
          if (errBody && errBody.message) errMsg = errBody.message;
        } catch (e) {
          // ignore
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      return {
        token: data.token,
        message: data.message,
        refreshToken: data.refreshToken,
        user: data.user,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  static async loginWithGoogle(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const data = await response.json();
      return {
        token: data.token,
        message: data.message,
        refreshToken: data.refreshToken,
        user: data.user,
      };
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  static async validateToken(token: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  }

  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      return {
        token: data.token,
        message: data.message,
        refreshToken: data.refreshToken,
        user: data.user,
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  static async logout(token: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      // No lanzar error en logout
    }
  }

  static async updateOnboardingStep(token: string, step: number): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/onboarding/step`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ step }),
      });

      if (!response.ok) {
        throw new Error('Failed to update onboarding step');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Update onboarding step error:', error);
      throw error;
    }
  }

  static async completeOnboarding(token: string, onboardingData: OnboardingData): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  }
}