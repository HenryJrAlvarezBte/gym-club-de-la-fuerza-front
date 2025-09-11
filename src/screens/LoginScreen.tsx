import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      alert('Error en login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} placeholderTextColor="#bbb" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#bbb" />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      {/* Google Sign-In button: muestra si la integración existe en el contexto */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4285F4', marginTop: 12 }]}
        onPress={async () => {
          try {
            // Llamamos al método expuesto por el contexto de autenticación
            const { loginWithGoogle } = (useAuth() as any);
            await loginWithGoogle();
          } catch (err) {
            console.warn('Google login failed', err);
            alert('Error al iniciar sesión con Google');
          }
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => (navigation as any).navigate('Register')}>
          <Text style={styles.linkText}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#121212' },
  input: { borderWidth: 1, borderColor: '#2a2a2a', padding: 10, marginBottom: 12, borderRadius: 8, color: '#fff', backgroundColor: '#0f0f0f' },
  button: { backgroundColor: '#cc0000', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  footerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, alignItems: 'center' },
  footerText: { color: '#bbb' },
  linkText: { color: '#25D366', fontWeight: '700' },
});

export default LoginScreen;


