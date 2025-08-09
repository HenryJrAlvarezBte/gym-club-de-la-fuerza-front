import { LoginCredentials, RegisterCredentials, User, AuthResponse, OnboardingData } from '../types/auth';

// TODO: Replace with your actual API base URL
const API_BASE_URL = 'https://your-backend-api.com/api';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
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
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
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
      return data;
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
      return data;
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
      // Don't throw error for logout as it's not critical
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
