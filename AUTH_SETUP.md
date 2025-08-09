# Authentication Setup Guide

This guide will help you set up the authentication system for "El Club de la Fuerza" app.

## Features Implemented

✅ **Email/Password Registration and Login - FE**
- User registration with name, email, and password
- User login with email and password
- Form validation and error handling
- Secure password input with show/hide toggle

✅ **Google OAuth Sign-In - FE**
- Google OAuth integration using Expo AuthSession
- Seamless Google sign-in flow
- User profile information retrieval from Google

✅ **JWT Token Authentication - FE**
- Secure JWT token management
- Automatic token refresh
- Token validation and expiration handling
- Background token refresh for seamless UX
- API client with automatic authentication

✅ **User Onboarding - FE**
- Multi-step onboarding flow
- Fitness level assessment
- Goal setting and preferences
- Workout time preferences
- Injury/health considerations
- Progress tracking and completion

✅ **Book a Class or Session - FE**
- Class browsing and filtering by category
- Real-time availability checking
- Booking and cancellation functionality
- Class details and instructor information
- User booking history

✅ **Log Physical Activity - FE**
- Activity type selection (workout, cardio, strength, etc.)
- Duration and calorie tracking
- Exercise logging with sets, reps, and weights
- Common exercise templates
- Activity notes and descriptions

✅ **Update Body Measurements - FE**
- Comprehensive body measurement tracking
- BMI calculation and categorization
- Progress comparison with previous measurements
- Optional fields for detailed tracking
- Measurement history and trends

## Prerequisites

1. **Install Dependencies**
   ```bash
   npm install expo-auth-session expo-crypto expo-web-browser @react-native-async-storage/async-storage jwt-decode
   ```

2. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your app's redirect URI: `el-club-de-la-fuerza://auth`

## Configuration

### 1. Update Google OAuth Configuration

Edit `src/services/googleAuthService.ts`:
```typescript
const GOOGLE_CLIENT_ID = 'your-google-client-id.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'your-google-client-secret';
```

### 2. Update Backend API URL

Edit `src/services/authService.ts`:
```typescript
const API_BASE_URL = 'https://your-backend-api.com/api';
```

### 3. Configure App Scheme

Add to your `app.json`:
```json
{
  "expo": {
    "scheme": "el-club-de-la-fuerza",
    "android": {
      "package": "com.anonymous.elclubdelafuerza"
    },
    "ios": {
      "bundleIdentifier": "com.anonymous.elclubdelafuerza"
    }
  }
}
```

## Backend API Requirements

Your backend should implement these endpoints:

### 1. Email/Password Registration
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "provider": "email",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Email/Password Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "provider": "email",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Google OAuth Login
```
POST /api/auth/google
Content-Type: application/json

{
  "token": "google-access-token"
}

Response:
{
  "user": {
    "id": "2",
    "email": "user@gmail.com",
    "name": "Google User",
    "photoURL": "https://example.com/photo.jpg",
    "provider": "google",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication context and state management
├── services/
│   ├── authService.ts           # API calls for authentication
│   ├── googleAuthService.ts     # Google OAuth integration
│   ├── apiClient.ts             # API client with JWT token management
│   └── fitnessService.ts        # API calls for fitness features
├── screens/
│   ├── LoginScreen.tsx          # Login screen with email/password and Google
│   ├── RegisterScreen.tsx       # Registration screen
│   ├── LoadingScreen.tsx        # Loading screen during auth checks
│   ├── OnboardingScreen.tsx     # Multi-step onboarding flow
│   ├── BookClassScreen.tsx      # Class booking and management
│   ├── LogActivityScreen.tsx    # Physical activity logging
│   └── BodyMeasurementsScreen.tsx # Body measurements tracking
├── types/
│   ├── auth.ts                  # TypeScript interfaces for auth
│   └── fitness.ts               # TypeScript interfaces for fitness features
├── utils/
│   └── jwtUtils.ts              # JWT token utilities
└── navigation/
    └── AppNavigator.tsx         # Updated navigation with auth and onboarding flow
```

## Usage

### Authentication Flow

1. **App Launch**: Shows loading screen while checking authentication status
2. **Not Authenticated**: Shows login/register screens
3. **Authenticated but Not Onboarded**: Shows onboarding flow
4. **Authenticated and Onboarded**: Shows main app with tab navigation
5. **Logout**: Returns to authentication screens

### Using Authentication in Components

```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Access user data
  console.log(user?.name);
  
  // Check authentication status
  if (isAuthenticated) {
    // User is logged in
  }
}
```

## Security Features

- ✅ Secure password input with show/hide toggle
- ✅ Form validation for all inputs
- ✅ Error handling for failed authentication
- ✅ Secure JWT token storage using AsyncStorage
- ✅ Automatic token refresh and validation
- ✅ Background token refresh for seamless UX
- ✅ Automatic session restoration on app launch
- ✅ Proper logout functionality
- ✅ Token expiration handling

## Testing

1. **Email/Password Flow**:
   - Test registration with valid/invalid data
   - Test login with correct/incorrect credentials
   - Test password validation

2. **Google OAuth Flow**:
   - Test Google sign-in button
   - Test cancellation of Google sign-in
   - Test successful Google authentication

3. **JWT Token Management**:
   - Test token validation and expiration
   - Test automatic token refresh
   - Test background token refresh
   - Test API calls with expired tokens

4. **Onboarding Flow**:
   - Test all onboarding steps
   - Test progress saving
   - Test onboarding completion
   - Test navigation between steps

5. **Session Management**:
   - Test app restart with existing session
   - Test logout functionality
   - Test session persistence

## Troubleshooting

### Common Issues

1. **Google OAuth not working**:
   - Check Google Cloud Console configuration
   - Verify redirect URI matches exactly
   - Ensure Google+ API is enabled

2. **Backend API errors**:
   - Check API base URL configuration
   - Verify backend endpoints are implemented
   - Check network connectivity

3. **Navigation issues**:
   - Ensure AuthProvider wraps the entire app
   - Check navigation stack configuration

## Next Steps

1. Implement your backend API endpoints
2. Add proper error handling and user feedback
3. Implement password reset functionality
4. Add email verification
5. Implement biometric authentication (fingerprint/face ID)
6. Add social login providers (Facebook, Apple, etc.)
