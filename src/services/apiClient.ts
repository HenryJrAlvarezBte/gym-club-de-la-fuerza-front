import AsyncStorage from '@react-native-async-storage/async-storage';
import { JWTUtils } from '../utils/jwtUtils';
import { AuthService } from './authService';
import { Platform } from 'react-native';

class ApiClient {
  private baseURL: string;
  private tokenRefreshPromise: Promise<string> | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      return {
        'Content-Type': 'application/json',
      };
    }

    // Check if token is valid
    if (!JWTUtils.isTokenValid(token)) {
      // Token is expired, try to refresh
      await this.refreshToken();
      const newToken = await AsyncStorage.getItem('token');
      
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newToken}`,
      };
    }

    // Check if token is expiring soon
    if (JWTUtils.isTokenExpiringSoon(token, 5)) {
      // Token expires soon, refresh in background
      this.refreshTokenInBackground();
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  private async refreshToken(): Promise<void> {
    if (this.tokenRefreshPromise) {
      // If refresh is already in progress, wait for it
      await this.tokenRefreshPromise;
      return;
    }

    this.tokenRefreshPromise = this.performTokenRefresh();
    
    try {
      await this.tokenRefreshPromise;
    } finally {
      this.tokenRefreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string> {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const authResponse = await AuthService.refreshToken(refreshToken);
      
      await Promise.all([
        AsyncStorage.setItem('token', authResponse.token),
        authResponse.refreshToken && AsyncStorage.setItem('refreshToken', authResponse.refreshToken),
      ]);

      return authResponse.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Clear stored tokens on refresh failure
      await Promise.all([
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('refreshToken'),
        AsyncStorage.removeItem('user'),
      ]);
      
      throw error;
    }
  }

  private async refreshTokenInBackground(): Promise<void> {
    // Don't await this, let it run in background
    this.refreshToken().catch(error => {
      console.error('Background token refresh failed:', error);
    });
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getAuthHeaders();

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Try to refresh token once
        try {
          await this.refreshToken();
          
          // Retry the request with new token
          const newHeaders = await this.getAuthHeaders();
          const retryConfig: RequestInit = {
            ...options,
            headers: {
              ...newHeaders,
              ...options.headers,
            },
          };
          
          const retryResponse = await fetch(url, retryConfig);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP ${retryResponse.status}: ${retryResponse.statusText}`);
          }
          
          return await retryResponse.json();
        } catch (refreshError) {
          // Refresh failed, throw original error
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create and export a singleton instance
const DEFAULT_BASE = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
export const apiClient = new ApiClient(DEFAULT_BASE);
