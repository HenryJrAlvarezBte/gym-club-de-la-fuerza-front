import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BodyMeasurement: React.FC<{ onResult?: (result: string) => void }> = ({ onResult }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);
    if (!h || !w) return;

    const imc = w / (h * h);
    let res = '';
    if (imc < 18.5) res = 'Bajo peso';
    else if (imc >= 18.5 && imc < 25) res = 'Peso normal';
    else if (imc >= 25 && imc < 30) res = 'Sobrepeso';
    else res = 'Obesidad';

    setResult(res);
    if (onResult) onResult(res);
  };

  const resultColor = result === 'Bien' ? '#b7f5c6' : result === 'Más o menos' ? '#ffcc80' : '#ff8a80';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Altura (cm)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} placeholderTextColor="#bbb" />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} placeholderTextColor="#bbb" />

      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {result && (
        <View style={[styles.resultBox, { backgroundColor: resultColor }]}> 
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#121212', flex: 1 },
  label: { fontSize: 14, marginBottom: 4, color: '#fff' },
  input: { borderWidth: 1, borderColor: '#2a2a2a', padding: 8, marginBottom: 12, borderRadius: 6, color: '#fff', backgroundColor: '#0f0f0f' },
  button: { backgroundColor: '#cc0000', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: '700' },
  resultBox: { padding: 12, borderRadius: 8, alignItems: 'center' },
  resultText: { fontWeight: '700' },
});

export default BodyMeasurement;


