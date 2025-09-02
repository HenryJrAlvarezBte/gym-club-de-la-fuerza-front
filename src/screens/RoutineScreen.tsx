import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function RoutineScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  // Usa el enlace público embebido del Google Sheet (no el de edición)
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/1JppKUC4rcG48PyhqdNCY59Zc_VI8zyqhbIp5aoubODg/edit?usp=sharing';

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.userText}>{user?.email}</Text>
        <TouchableOpacity style={styles.navLogout} onPress={async () => { await logout(); navigation.navigate('Login' as never); }}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.sheetContainer}>
        <WebView
          source={{ uri: sheetUrl }}
          style={styles.webview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  navbar: {
    height: 56,
    backgroundColor: '#059669',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 16,
    paddingTop: 16,
  },
  userText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sheetContainer: { flex: 1 },
  webview: { flex: 1 },
  navLogout: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});