import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.webContainer}>
        <WebView source={{ uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-example/pubhtml' }} style={{ flex: 1 }} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => (navigation as any).navigate('BodyMeasurements')}>
        <Text style={styles.buttonText}>Medir tu índice de masa corporal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  email: { fontSize: 14, fontWeight: '700', color: '#fff' },
  logout: { color: '#ff6b6b', fontWeight: '700' },
  webContainer: { flex: 1, borderWidth: 1, borderColor: '#2a2a2a', marginVertical: 12, backgroundColor: '#0f0f0f' },
  button: { backgroundColor: '#222', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});

export default HomeScreen;


