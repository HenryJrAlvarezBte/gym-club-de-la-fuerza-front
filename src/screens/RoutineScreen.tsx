import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoutineScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Rutinas (placeholder)</Text>
  </View>
);

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }, text: { color: '#fff' } });

export default RoutineScreen;


