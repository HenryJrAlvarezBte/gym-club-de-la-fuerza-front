import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useAuth } from '../context/AuthContext';

export default function RoutineScreen() {
  const { user } = useAuth();

  // Usa el enlace público embebido del Google Sheet (no el de edición)
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/1JppKUC4rcG48PyhqdNCY59Zc_VI8zyqhbIp5aoubODg/edit?copiedFromTrash=&gid=0#gid=0';

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.userText}>{user?.email}</Text>
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
});