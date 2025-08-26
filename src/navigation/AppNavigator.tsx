import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RoutineScreen from '../screens/RoutineScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Rutina" component={RoutineScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <OnboardingStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}