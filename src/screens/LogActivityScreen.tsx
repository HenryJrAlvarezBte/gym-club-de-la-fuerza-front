import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FitnessService } from '../services/fitnessService';
import { PhysicalActivity, Exercise } from '../types/fitness';

const activityTypes = [
  { id: 'workout', label: 'Entrenamiento', icon: 'fitness', color: '#25D366' },
  { id: 'cardio', label: 'Cardio', icon: 'heart', color: '#FF4444' },
  { id: 'strength', label: 'Fuerza', icon: 'barbell', color: '#FFA500' },
  { id: 'flexibility', label: 'Flexibilidad', icon: 'body', color: '#9C27B0' },
  { id: 'sports', label: 'Deportes', icon: 'football', color: '#2196F3' },
  { id: 'other', label: 'Otro', icon: 'ellipse', color: '#666' },
];

const commonExercises = [
  { name: 'Press de banca', category: 'strength' },
  { name: 'Sentadillas', category: 'strength' },
  { name: 'Peso muerto', category: 'strength' },
  { name: 'Press militar', category: 'strength' },
  { name: 'Remo', category: 'strength' },
  { name: 'Plancha', category: 'strength' },
  { name: 'Burpees', category: 'cardio' },
  { name: 'Mountain climbers', category: 'cardio' },
  { name: 'Jumping jacks', category: 'cardio' },
  { name: 'Estiramientos', category: 'flexibility' },
  { name: 'Yoga', category: 'flexibility' },
];

export default function LogActivityScreen() {
  const [activityName, setActivityName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');
  const [includeExercises, setIncludeExercises] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 1,
      reps: 1,
      weight: 0,
      duration: 0,
      restTime: 60,
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setExercises(updatedExercises);
  };

  const selectCommonExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: 1,
      reps: 1,
      weight: 0,
      duration: 0,
      restTime: 60,
    };
    setExercises([...exercises, newExercise]);
  };

  const calculateCalories = () => {
    if (duration && selectedType) {
      // Simple calorie calculation based on activity type and duration
      const durationNum = parseInt(duration);
      let caloriesPerMinute = 5; // Default

      switch (selectedType) {
        case 'cardio':
          caloriesPerMinute = 8;
          break;
        case 'strength':
          caloriesPerMinute = 6;
          break;
        case 'flexibility':
          caloriesPerMinute = 3;
          break;
        case 'sports':
          caloriesPerMinute = 7;
          break;
        case 'workout':
          caloriesPerMinute = 7;
          break;
      }

      const calculatedCalories = durationNum * caloriesPerMinute;
      setCaloriesBurned(calculatedCalories.toString());
    }
  };

  const handleSubmit = async () => {
    if (!activityName || !selectedType || !duration || !caloriesBurned) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (includeExercises && exercises.some(ex => !ex.name)) {
      Alert.alert('Error', 'Por favor completa el nombre de todos los ejercicios');
      return;
    }

    try {
      setLoading(true);
      
      const activityData: Omit<PhysicalActivity, 'id' | 'userId'> = {
        type: selectedType as any,
        name: activityName,
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        date: new Date(),
        notes: notes || undefined,
        exercises: includeExercises ? exercises : undefined,
      };

      await FitnessService.logActivity(activityData);
      
      Alert.alert('Éxito', 'Actividad registrada correctamente', [
        { text: 'OK', onPress: () => resetForm() }
      ]);
    } catch (error) {
      console.error('Error logging activity:', error);
      Alert.alert('Error', 'No se pudo registrar la actividad');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setActivityName('');
    setSelectedType('');
    setDuration('');
    setCaloriesBurned('');
    setNotes('');
    setIncludeExercises(false);
    setExercises([]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Actividad</Text>
        <Text style={styles.subtitle}>Registra tu entrenamiento o actividad física</Text>
      </View>

      {/* Activity Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipo de Actividad</Text>
        <View style={styles.typeGrid}>
          {activityTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === type.id && styles.selectedType,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Ionicons
                name={type.icon as any}
                size={24}
                color={selectedType === type.id ? '#fff' : type.color}
              />
              <Text
                style={[
                  styles.typeLabel,
                  selectedType === type.id && styles.selectedTypeText,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Básica</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre de la actividad *</Text>
          <TextInput
            style={styles.input}
            value={activityName}
            onChangeText={setActivityName}
            placeholder="Ej: Entrenamiento de pecho"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Duración (minutos) *</Text>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={(text) => {
                setDuration(text);
                if (text && selectedType) {
                  setTimeout(calculateCalories, 500);
                }
              }}
              placeholder="45"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Calorías quemadas *</Text>
            <TextInput
              style={styles.input}
              value={caloriesBurned}
              onChangeText={setCaloriesBurned}
              placeholder="300"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notas (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Describe tu entrenamiento..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
          />
        </View>
      </View>

      {/* Exercises Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          <Switch
            value={includeExercises}
            onValueChange={setIncludeExercises}
            trackColor={{ false: '#333', true: '#25D366' }}
            thumbColor={includeExercises ? '#fff' : '#666'}
          />
        </View>

        {includeExercises && (
          <>
            {/* Common Exercises */}
            <View style={styles.commonExercises}>
              <Text style={styles.subsectionTitle}>Ejercicios Comunes</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {commonExercises.map((exercise, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.commonExerciseButton}
                    onPress={() => selectCommonExercise(exercise.name)}
                  >
                    <Text style={styles.commonExerciseText}>{exercise.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Exercise List */}
            {exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseTitle}>Ejercicio {index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => removeExercise(index)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF4444" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  value={exercise.name}
                  onChangeText={(text) => updateExercise(index, 'name', text)}
                  placeholder="Nombre del ejercicio"
                  placeholderTextColor="#666"
                />

                <View style={styles.exerciseInputs}>
                  <View style={styles.exerciseInput}>
                    <Text style={styles.inputLabel}>Series</Text>
                    <TextInput
                      style={styles.input}
                      value={exercise.sets.toString()}
                      onChangeText={(text) => updateExercise(index, 'sets', parseInt(text) || 1)}
                      placeholder="3"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={styles.exerciseInput}>
                    <Text style={styles.inputLabel}>Repeticiones</Text>
                    <TextInput
                      style={styles.input}
                      value={exercise.reps.toString()}
                      onChangeText={(text) => updateExercise(index, 'reps', parseInt(text) || 1)}
                      placeholder="12"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={styles.exerciseInput}>
                    <Text style={styles.inputLabel}>Peso (kg)</Text>
                    <TextInput
                      style={styles.input}
                      value={exercise.weight?.toString() || ''}
                      onChangeText={(text) => updateExercise(index, 'weight', parseFloat(text) || 0)}
                      placeholder="0"
                      placeholderTextColor="#666"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.addExerciseButton} onPress={addExercise}>
              <Ionicons name="add-circle" size={24} color="#25D366" />
              <Text style={styles.addExerciseText}>Agregar Ejercicio</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.submitButtonText}>Registrando...</Text>
        ) : (
          <>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.submitButtonText}>Registrar Actividad</Text>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedType: {
    borderColor: '#25D366',
    backgroundColor: '#1a2a1a',
  },
  typeLabel: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedTypeText: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputLabel: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
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
  commonExercises: {
    marginBottom: 20,
  },
  commonExerciseButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  commonExerciseText: {
    color: '#ccc',
    fontSize: 14,
  },
  exerciseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  removeButton: {
    padding: 4,
  },
  exerciseInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#25D366',
    borderStyle: 'dashed',
  },
  addExerciseText: {
    color: '#25D366',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
