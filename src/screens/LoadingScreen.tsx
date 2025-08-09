import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>El Club de la Fuerza</Text>
      <ActivityIndicator size="large" color="#25D366" style={styles.spinner} />
      <Text style={styles.subtitle}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#25D366',
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
});
