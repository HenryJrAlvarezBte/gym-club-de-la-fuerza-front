export interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: Date;
  isOnboarded?: boolean;
  onboardingStep?: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateOnboardingStep: (step: number) => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

export interface OnboardingData {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferredWorkoutTime: 'morning' | 'afternoon' | 'evening';
  experience: number; // years
  injuries: string[];
  availability: string[];
}
