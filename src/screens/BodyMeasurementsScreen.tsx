import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import BodyMeasurement from '../components/BodyMeasurement';
import { useNavigation } from '@react-navigation/native';

const BodyMeasurementsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => (navigation as any).navigate('Home')}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
      <BodyMeasurement />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  backButton: { padding: 8, marginBottom: 8, alignSelf: 'flex-start' },
  backText: { color: '#25D366', fontWeight: '700' },
});

export default BodyMeasurementsScreen;


