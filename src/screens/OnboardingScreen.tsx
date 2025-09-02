import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenido al Gym El Club de la Fuerza</Text>
      <Text style={styles.subtitle}>Aquí comienza tu camino hacia una versión más fuerte de vos.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (navigation as any).navigate('Home')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#bbbbbb',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#cc0000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default OnboardingScreen;