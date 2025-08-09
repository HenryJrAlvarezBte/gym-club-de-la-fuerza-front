import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ClassesScreen from '../screens/ClassesScreen';
import PlansScreen from '../screens/PlansScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import BookClassScreen from '../screens/BookClassScreen';
import LogActivityScreen from '../screens/LogActivityScreen';
import BodyMeasurementsScreen from '../screens/BodyMeasurementsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Clases') {
            iconName = 'calendar';
          } else if (route.name === 'Actividad') {
            iconName = 'fitness';
          } else if (route.name === 'Medidas') {
            iconName = 'body';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          } else {
            iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#25D366',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Clases" component={BookClassScreen} />
      <Tab.Screen name="Actividad" component={LogActivityScreen} />
      <Tab.Screen name="Medidas" component={BodyMeasurementsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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
        user?.isOnboarded ? (
          <MainTabs />
        ) : (
          <OnboardingStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
