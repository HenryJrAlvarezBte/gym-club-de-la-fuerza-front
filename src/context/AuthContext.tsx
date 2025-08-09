import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, AuthState, User, LoginCredentials, RegisterCredentials, OnboardingData } from '../types/auth';
import { AuthService } from '../services/authService';
import { GoogleAuthService } from '../services/googleAuthService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_ONBOARDING_STEP'; payload: number }
  | { type: 'COMPLETE_ONBOARDING' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_ONBOARDING_STEP':
      return {
        ...state,
        user: state.user ? { ...state.user, onboardingStep: action.payload } : null,
      };
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: state.user ? { ...state.user, isOnboarded: true, onboardingStep: 0 } : null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  token: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedUser, storedToken, storedRefreshToken] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('refreshToken'),
      ]);

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        
        // Validate token with backend
        try {
          const validatedUser = await AuthService.validateToken(storedToken);
          dispatch({ type: 'SET_USER', payload: validatedUser });
          dispatch({ type: 'SET_TOKEN', payload: storedToken });
        } catch (error) {
          // Token is invalid, try to refresh
          if (storedRefreshToken) {
            try {
              const authResponse = await AuthService.refreshToken(storedRefreshToken);
              await Promise.all([
                AsyncStorage.setItem('user', JSON.stringify(authResponse.user)),
                AsyncStorage.setItem('token', authResponse.token),
                authResponse.refreshToken && AsyncStorage.setItem('refreshToken', authResponse.refreshToken),
              ]);
              dispatch({ type: 'SET_USER', payload: authResponse.user });
              dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
            } catch (refreshError) {
              // Refresh failed, clear stored data
              await Promise.all([
                AsyncStorage.removeItem('user'),
                AsyncStorage.removeItem('token'),
                AsyncStorage.removeItem('refreshToken'),
              ]);
              dispatch({ type: 'SET_LOADING', payload: false });
            }
          } else {
            // No refresh token, clear stored data
            await Promise.all([
              AsyncStorage.removeItem('user'),
              AsyncStorage.removeItem('token'),
              AsyncStorage.removeItem('refreshToken'),
            ]);
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const authResponse = await AuthService.login(credentials);
      
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify(authResponse.user)),
        AsyncStorage.setItem('token', authResponse.token),
        authResponse.refreshToken && AsyncStorage.setItem('refreshToken', authResponse.refreshToken),
      ]);
      
      dispatch({ type: 'SET_USER', payload: authResponse.user });
      dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const authResponse = await AuthService.register(credentials);
      
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify(authResponse.user)),
        AsyncStorage.setItem('token', authResponse.token),
        authResponse.refreshToken && AsyncStorage.setItem('refreshToken', authResponse.refreshToken),
      ]);
      
      dispatch({ type: 'SET_USER', payload: authResponse.user });
      dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Get Google access token
      const accessToken = await GoogleAuthService.signInAsync();
      
      if (!accessToken) {
        throw new Error('Google sign-in was cancelled or failed');
      }
      
      // Get user info from Google
      const googleUserInfo = await GoogleAuthService.getUserInfo(accessToken);
      
      // Send token to your backend for verification and user creation/login
      const authResponse = await AuthService.loginWithGoogle(accessToken);
      
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify(authResponse.user)),
        AsyncStorage.setItem('token', authResponse.token),
        authResponse.refreshToken && AsyncStorage.setItem('refreshToken', authResponse.refreshToken),
      ]);
      
      dispatch({ type: 'SET_USER', payload: authResponse.user });
      dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
    } catch (error) {
      console.error('Google login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const authResponse = await AuthService.refreshToken(storedRefreshToken);
      
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify(authResponse.user)),
        AsyncStorage.setItem('token', authResponse.token),
        authResponse.refreshToken && AsyncStorage.setItem('refreshToken', authResponse.refreshToken),
      ]);
      
      dispatch({ type: 'SET_USER', payload: authResponse.user });
      dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout the user
      await logout();
      throw error;
    }
  };

  const updateOnboardingStep = async (step: number) => {
    try {
      if (!state.token) {
        throw new Error('No token available');
      }

      const updatedUser = await AuthService.updateOnboardingStep(state.token, step);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_ONBOARDING_STEP', payload: step });
    } catch (error) {
      console.error('Update onboarding step error:', error);
      throw error;
    }
  };

  const completeOnboarding = async () => {
    try {
      if (!state.token) {
        throw new Error('No token available');
      }

      // This would typically include the onboarding data
      const onboardingData: OnboardingData = {
        fitnessLevel: 'beginner',
        goals: ['lose_weight', 'build_muscle'],
        preferredWorkoutTime: 'morning',
        experience: 0,
        injuries: [],
        availability: ['monday', 'wednesday', 'friday'],
      };

      const updatedUser = await AuthService.completeOnboarding(state.token, onboardingData);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'COMPLETE_ONBOARDING' });
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.token) {
        await AuthService.logout(state.token);
      }
      
      await Promise.all([
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('refreshToken'),
      ]);
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    token: state.token,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshToken,
    updateOnboardingStep,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
