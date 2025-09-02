import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleNext = () => {
    navigation.navigate('Rutina' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Ionicons name="fitness" size={80} color="#25D366" style={styles.icon} />
          <Text style={styles.title}>¡Bienvenido a El Club de la Fuerza!</Text>
          <Text style={styles.subtitle}>
            Tu espacio para entrenar, mejorar y compartir tu progreso.
          </Text>
        </View>
        <TouchableOpacity style={styles.headerLogout} onPress={async () => { await logout(); navigation.navigate('Login' as never); }}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Siguiente</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerLogout: {
    padding: 8,
  },
});