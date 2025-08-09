import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FitnessService } from '../services/fitnessService';
import { BodyMeasurement } from '../types/fitness';

const measurementFields = [
  { key: 'weight', label: 'Peso', unit: 'kg', icon: 'scale' },
  { key: 'height', label: 'Altura', unit: 'cm', icon: 'resize' },
  { key: 'bodyFatPercentage', label: 'Grasa Corporal', unit: '%', icon: 'body' },
  { key: 'muscleMass', label: 'Masa Muscular', unit: 'kg', icon: 'fitness' },
  { key: 'chest', label: 'Pecho', unit: 'cm', icon: 'body' },
  { key: 'waist', label: 'Cintura', unit: 'cm', icon: 'body' },
  { key: 'hips', label: 'Cadera', unit: 'cm', icon: 'body' },
  { key: 'biceps', label: 'Bíceps', unit: 'cm', icon: 'body' },
  { key: 'thighs', label: 'Muslos', unit: 'cm', icon: 'body' },
  { key: 'calves', label: 'Pantorrillas', unit: 'cm', icon: 'body' },
];

export default function BodyMeasurementsScreen() {
  const [measurements, setMeasurements] = useState<Partial<BodyMeasurement>>({});
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [latestMeasurement, setLatestMeasurement] = useState<BodyMeasurement | null>(null);

  useEffect(() => {
    loadLatestMeasurement();
  }, []);

  const loadLatestMeasurement = async () => {
    try {
      setLoading(true);
      const latest = await FitnessService.getLatestBodyMeasurement();
      setLatestMeasurement(latest);
      
      if (latest) {
        // Pre-fill form with latest measurements
        setMeasurements({
          weight: latest.weight,
          height: latest.height,
          bodyFatPercentage: latest.bodyFatPercentage,
          muscleMass: latest.muscleMass,
          chest: latest.chest,
          waist: latest.waist,
          hips: latest.hips,
          biceps: latest.biceps,
          thighs: latest.thighs,
          calves: latest.calves,
        });
      }
    } catch (error) {
      console.error('Error loading latest measurement:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMeasurement = (key: keyof BodyMeasurement, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMeasurements(prev => ({ ...prev, [key]: numValue }));
  };

  const calculateBMI = () => {
    const weight = measurements.weight || 0;
    const height = measurements.height || 0;
    
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Bajo peso', color: '#FFA500' };
    if (bmi < 25) return { category: 'Peso normal', color: '#25D366' };
    if (bmi < 30) return { category: 'Sobrepeso', color: '#FFA500' };
    return { category: 'Obesidad', color: '#FF4444' };
  };

  const handleSubmit = async () => {
    if (!measurements.weight || !measurements.height) {
      Alert.alert('Error', 'El peso y la altura son obligatorios');
      return;
    }

    try {
      setSaving(true);
      
      const measurementData: Omit<BodyMeasurement, 'id' | 'userId'> = {
        date: new Date(),
        weight: measurements.weight,
        height: measurements.height,
        bodyFatPercentage: measurements.bodyFatPercentage,
        muscleMass: measurements.muscleMass,
        chest: measurements.chest,
        waist: measurements.waist,
        hips: measurements.hips,
        biceps: measurements.biceps,
        thighs: measurements.thighs,
        calves: measurements.calves,
        notes: notes || undefined,
      };

      await FitnessService.logBodyMeasurement(measurementData);
      
      Alert.alert('Éxito', 'Medidas registradas correctamente', [
        { text: 'OK', onPress: () => loadLatestMeasurement() }
      ]);
    } catch (error) {
      console.error('Error saving measurements:', error);
      Alert.alert('Error', 'No se pudieron guardar las medidas');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={styles.loadingText}>Cargando medidas...</Text>
      </View>
    );
  }

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Medidas Corporales</Text>
        <Text style={styles.subtitle}>Registra y sigue tu progreso físico</Text>
      </View>

      {/* Latest Measurement Summary */}
      {latestMeasurement && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="calendar-outline" size={20} color="#25D366" />
            <Text style={styles.summaryTitle}>Última Medición</Text>
          </View>
          <Text style={styles.summaryDate}>
            {formatDate(latestMeasurement.date)}
          </Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryLabel}>Peso</Text>
              <Text style={styles.summaryValue}>{latestMeasurement.weight} kg</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryLabel}>Altura</Text>
              <Text style={styles.summaryValue}>{latestMeasurement.height} cm</Text>
            </View>
            {latestMeasurement.bodyFatPercentage && (
              <View style={styles.summaryStat}>
                <Text style={styles.summaryLabel}>Grasa</Text>
                <Text style={styles.summaryValue}>{latestMeasurement.bodyFatPercentage}%</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* BMI Calculator */}
      {bmi && (
        <View style={styles.bmiCard}>
          <Text style={styles.bmiTitle}>Índice de Masa Corporal (BMI)</Text>
          <View style={styles.bmiContent}>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <View style={[styles.bmiCategory, { backgroundColor: bmiInfo?.color }]}>
              <Text style={styles.bmiCategoryText}>{bmiInfo?.category}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Measurement Form */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Nuevas Medidas</Text>
        
        {/* Required Fields */}
        <View style={styles.requiredSection}>
          <Text style={styles.subsectionTitle}>Campos Obligatorios</Text>
          {measurementFields.slice(0, 2).map((field) => (
            <View key={field.key} style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name={field.icon as any} size={20} color="#25D366" />
                <Text style={styles.inputLabel}>{field.label} *</Text>
              </View>
              <TextInput
                style={styles.input}
                value={measurements[field.key as keyof BodyMeasurement]?.toString() || ''}
                onChangeText={(text) => updateMeasurement(field.key as keyof BodyMeasurement, text)}
                placeholder={`0.0 ${field.unit}`}
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>

        {/* Optional Fields */}
        <View style={styles.optionalSection}>
          <Text style={styles.subsectionTitle}>Campos Opcionales</Text>
          {measurementFields.slice(2).map((field) => (
            <View key={field.key} style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Ionicons name={field.icon as any} size={20} color="#666" />
                <Text style={styles.inputLabel}>{field.label}</Text>
              </View>
              <TextInput
                style={styles.input}
                value={measurements[field.key as keyof BodyMeasurement]?.toString() || ''}
                onChangeText={(text) => updateMeasurement(field.key as keyof BodyMeasurement, text)}
                placeholder={`0.0 ${field.unit}`}
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notas (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Observaciones sobre tu progreso..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, saving && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={saving}
      >
        {saving ? (
          <Text style={styles.submitButtonText}>Guardando...</Text>
        ) : (
          <>
            <Ionicons name="save" size={24} color="#fff" />
            <Text style={styles.submitButtonText}>Guardar Medidas</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#666',
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  summaryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  summaryDate: {
    color: '#999',
    fontSize: 14,
    marginBottom: 12,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bmiCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bmiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  bmiContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25D366',
  },
  bmiCategory: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bmiCategoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
    marginBottom: 16,
  },
  requiredSection: {
    marginBottom: 24,
  },
  optionalSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
