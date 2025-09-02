import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = async () => {
    if (password !== password2) {
      alert('Las contraseñas deben coincidir');
      return;
    }

    try {
      await register({ email, password });
      alert('Registro exitoso');
    } catch (error) {
      console.error('Registration error:', error);
      const message = error instanceof Error ? error.message : String(error);
      alert(message || 'Error en registro');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} placeholderTextColor="#bbb" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#bbb" />
      <TextInput style={styles.input} placeholder="Repetir contraseña" secureTextEntry value={password2} onChangeText={setPassword2} placeholderTextColor="#bbb" />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#121212' },
  input: { borderWidth: 1, borderColor: '#2a2a2a', padding: 10, marginBottom: 12, borderRadius: 8, color: '#fff', backgroundColor: '#0f0f0f' },
  button: { backgroundColor: '#cc0000', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});

export default RegisterScreen;


