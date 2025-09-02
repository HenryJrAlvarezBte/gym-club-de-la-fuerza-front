import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, AuthState, User, LoginCredentials, RegisterCredentials, OnboardingData, AuthResponse } from '../types/auth';
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

const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadStoredAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStoredAuth = async () => {
    try {
      let storedUser, storedToken, storedRefreshToken;
      if (isWeb) {
        storedUser = window.localStorage.getItem('user');
        storedToken = window.localStorage.getItem('token');
        storedRefreshToken = window.localStorage.getItem('refreshToken');
      } else {
        [storedUser, storedToken, storedRefreshToken] = await Promise.all([
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('refreshToken'),
        ]);
      }

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);

        try {
          const validatedUser = await AuthService.validateToken(storedToken);
          dispatch({ type: 'SET_USER', payload: validatedUser });
          dispatch({ type: 'SET_TOKEN', payload: storedToken });
        } catch (error) {
          if (storedRefreshToken) {
            try {
              const authResponse = await AuthService.refreshToken(storedRefreshToken);
              const refreshedUser: User | null = authResponse.user ?? null;

              if (isWeb) {
                if (refreshedUser) window.localStorage.setItem('user', JSON.stringify(refreshedUser));
                window.localStorage.setItem('token', authResponse.token);
                if (authResponse.refreshToken) window.localStorage.setItem('refreshToken', authResponse.refreshToken);
              } else {
                const ops: Promise<any>[] = [];
                if (refreshedUser) ops.push(AsyncStorage.setItem('user', JSON.stringify(refreshedUser)));
                ops.push(AsyncStorage.setItem('token', authResponse.token));
                if (authResponse.refreshToken) ops.push(AsyncStorage.setItem('refreshToken', authResponse.refreshToken));
                await Promise.all(ops);
              }

              dispatch({ type: 'SET_USER', payload: refreshedUser });
              dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
            } catch (refreshError) {
              if (isWeb) {
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('refreshToken');
              } else {
                await Promise.all([
                  AsyncStorage.removeItem('user'),
                  AsyncStorage.removeItem('token'),
                  AsyncStorage.removeItem('refreshToken'),
                ]);
              }
              dispatch({ type: 'SET_LOADING', payload: false });
            }
          } else {
            if (isWeb) {
              window.localStorage.removeItem('user');
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('refreshToken');
            } else {
              await Promise.all([
                AsyncStorage.removeItem('user'),
                AsyncStorage.removeItem('token'),
                AsyncStorage.removeItem('refreshToken'),
              ]);
            }
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

      // Extraer email del mensaje recibido del backend
      const email = authResponse.message.replace('Welcome ', '').trim();
      const user: User = {
        id: '', // Puedes dejarlo vacío o generar uno temporal
        email,
      };

      if (isWeb) {
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('token', authResponse.token);
      } else {
        await Promise.all([
          AsyncStorage.setItem('user', JSON.stringify(user)),
          AsyncStorage.setItem('token', authResponse.token),
        ]);
      }

      dispatch({ type: 'SET_USER', payload: user });
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

      // Extraer email del mensaje recibido del backend
      const email = authResponse.message.replace('Welcome ', '').trim();
      const user: User = {
        id: '',
        email,
      };

      if (isWeb) {
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('token', authResponse.token);
      } else {
        await Promise.all([
          AsyncStorage.setItem('user', JSON.stringify(user)),
          AsyncStorage.setItem('token', authResponse.token),
        ]);
      }

      dispatch({ type: 'SET_USER', payload: user });
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

      const accessToken = await GoogleAuthService.signInAsync();

      if (!accessToken) {
        throw new Error('Google sign-in was cancelled or failed');
      }

      await GoogleAuthService.getUserInfo(accessToken);

      const authResponse = await AuthService.loginWithGoogle(accessToken);

      // Extraer email del mensaje recibido del backend
      const email = authResponse.message.replace('Welcome ', '').trim();
      const user: User = {
        id: '',
        email,
      };

      if (isWeb) {
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('token', authResponse.token);
      } else {
        await Promise.all([
          AsyncStorage.setItem('user', JSON.stringify(user)),
          AsyncStorage.setItem('token', authResponse.token),
        ]);
      }

      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
    } catch (error) {
      console.error('Google login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  // ...resto del código sin cambios...

  const refreshToken = async () => {
    try {
      let storedRefreshToken;
      if (isWeb) {
        storedRefreshToken = window.localStorage.getItem('refreshToken');
      } else {
        storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      }
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

              const authResponse: AuthResponse = await AuthService.refreshToken(storedRefreshToken);

      // Extraer email del mensaje recibido del backend
      const email = authResponse.message.replace('Welcome ', '').trim();
      const user: User = {
        id: '',
        email,
      };

      if (isWeb) {
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('token', authResponse.token);
      } else {
        await Promise.all([
          AsyncStorage.setItem('user', JSON.stringify(user)),
          AsyncStorage.setItem('token', authResponse.token),
        ]);
      }

      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_TOKEN', payload: authResponse.token });
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      throw error;
    }
  };

  // ...resto del código igual...

  const updateOnboardingStep = async (step: number) => {
    try {
      if (!state.token) {
        throw new Error('No token available');
      }

      const updatedUser = await AuthService.updateOnboardingStep(state.token, step);
      if (isWeb) {
        window.localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
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

      const onboardingData: OnboardingData = {
        fitnessLevel: 'beginner',
        goals: ['lose_weight', 'build_muscle'],
        preferredWorkoutTime: 'morning',
        experience: 0,
        injuries: [],
        availability: ['monday', 'wednesday', 'friday'],
      };

      const updatedUser = await AuthService.completeOnboarding(state.token, onboardingData);
      if (isWeb) {
        window.localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
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

      if (isWeb) {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('refreshToken');
      } else {
        await Promise.all([
          AsyncStorage.removeItem('user'),
          AsyncStorage.removeItem('token'),
          AsyncStorage.removeItem('refreshToken'),
        ]);
      }

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