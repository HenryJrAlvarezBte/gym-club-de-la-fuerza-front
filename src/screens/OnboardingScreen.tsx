import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: '¡Bienvenido a El Club de la Fuerza!',
    subtitle: 'Vamos a configurar tu perfil para personalizar tu experiencia',
    icon: 'fitness',
  },
  {
    id: 2,
    title: '¿Cuál es tu nivel de fitness?',
    subtitle: 'Esto nos ayudará a crear rutinas adaptadas a ti',
    icon: 'trending-up',
  },
  {
    id: 3,
    title: '¿Cuáles son tus objetivos?',
    subtitle: 'Selecciona todos los que apliquen',
    icon: 'target',
  },
  {
    id: 4,
    title: '¿Cuándo prefieres entrenar?',
    subtitle: 'Elige tu horario ideal',
    icon: 'time',
  },
  {
    id: 5,
    title: '¿Tienes alguna lesión?',
    subtitle: 'Es importante para tu seguridad',
    icon: 'medical',
  },
  {
    id: 6,
    title: '¡Perfecto!',
    subtitle: 'Ya estás listo para comenzar tu transformación',
    icon: 'checkmark-circle',
  },
];

const fitnessLevels = [
  { id: 'beginner', label: 'Principiante', description: 'Nuevo en el fitness' },
  { id: 'intermediate', label: 'Intermedio', description: 'Alguna experiencia' },
  { id: 'advanced', label: 'Avanzado', description: 'Experiencia sólida' },
];

const goals = [
  { id: 'lose_weight', label: 'Perder peso', icon: 'scale' },
  { id: 'build_muscle', label: 'Ganar músculo', icon: 'fitness' },
  { id: 'improve_strength', label: 'Mejorar fuerza', icon: 'barbell' },
  { id: 'increase_endurance', label: 'Aumentar resistencia', icon: 'timer' },
  { id: 'flexibility', label: 'Mejorar flexibilidad', icon: 'body' },
  { id: 'general_health', label: 'Salud general', icon: 'heart' },
];

const workoutTimes = [
  { id: 'morning', label: 'Mañana', description: '6:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Tarde', description: '12:00 PM - 6:00 PM' },
  { id: 'evening', label: 'Noche', description: '6:00 PM - 12:00 AM' },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFitnessLevel, setSelectedFitnessLevel] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedWorkoutTime, setSelectedWorkoutTime] = useState('');
  const [hasInjuries, setHasInjuries] = useState(false);
  const { updateOnboardingStep, completeOnboarding } = useAuth();

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length) {
      try {
        await updateOnboardingStep(currentStep + 1);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar el progreso');
      }
    } else {
      handleComplete();
    }
  };

  const handleBack = async () => {
    if (currentStep > 1) {
      try {
        await updateOnboardingStep(currentStep - 1);
        setCurrentStep(currentStep - 1);
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar el progreso');
      }
    }
  };

  const handleComplete = async () => {
    try {
      await completeOnboarding();
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar la configuración');
    }
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Ionicons name="fitness" size={80} color="#25D366" style={styles.stepIcon} />
            <Text style={styles.stepDescription}>
              Te ayudaremos a alcanzar tus objetivos de fitness con rutinas personalizadas,
              seguimiento de progreso y el apoyo de nuestra comunidad.
            </Text>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            {fitnessLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.optionCard,
                  selectedFitnessLevel === level.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedFitnessLevel(level.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{level.label}</Text>
                  <Text style={styles.optionDescription}>{level.description}</Text>
                </View>
                {selectedFitnessLevel === level.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#25D366" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepSubtitle}>
              Selecciona todos los objetivos que te interesan
            </Text>
            <View style={styles.goalsGrid}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    selectedGoals.includes(goal.id) && styles.selectedGoal,
                  ]}
                  onPress={() => toggleGoal(goal.id)}
                >
                  <Ionicons
                    name={goal.icon as any}
                    size={24}
                    color={selectedGoals.includes(goal.id) ? '#fff' : '#25D366'}
                  />
                  <Text
                    style={[
                      styles.goalLabel,
                      selectedGoals.includes(goal.id) && styles.selectedGoalText,
                    ]}
                  >
                    {goal.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            {workoutTimes.map((time) => (
              <TouchableOpacity
                key={time.id}
                style={[
                  styles.optionCard,
                  selectedWorkoutTime === time.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedWorkoutTime(time.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{time.label}</Text>
                  <Text style={styles.optionDescription}>{time.description}</Text>
                </View>
                {selectedWorkoutTime === time.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#25D366" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepSubtitle}>
              ¿Tienes alguna lesión o condición que debamos considerar?
            </Text>
            <View style={styles.injuryOptions}>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  !hasInjuries && styles.selectedOption,
                ]}
                onPress={() => setHasInjuries(false)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>No tengo lesiones</Text>
                  <Text style={styles.optionDescription}>
                    Puedo realizar cualquier tipo de ejercicio
                  </Text>
                </View>
                {!hasInjuries && (
                  <Ionicons name="checkmark-circle" size={24} color="#25D366" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  hasInjuries && styles.selectedOption,
                ]}
                onPress={() => setHasInjuries(true)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Tengo algunas lesiones</Text>
                  <Text style={styles.optionDescription}>
                    Necesito rutinas adaptadas
                  </Text>
                </View>
                {hasInjuries && (
                  <Ionicons name="checkmark-circle" size={24} color="#25D366" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContent}>
            <Ionicons name="checkmark-circle" size={80} color="#25D366" style={styles.stepIcon} />
            <Text style={styles.stepDescription}>
              ¡Excelente! Ya tienes todo configurado. Estamos listos para comenzar
              tu transformación física y alcanzar tus objetivos.
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        return selectedFitnessLevel !== '';
      case 3:
        return selectedGoals.length > 0;
      case 4:
        return selectedWorkoutTime !== '';
      case 5:
        return true; // Always can proceed from injury question
      default:
        return true;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep / onboardingSteps.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentStep} de {onboardingSteps.length}
        </Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{onboardingSteps[currentStep - 1].title}</Text>
        <Text style={styles.subtitle}>{onboardingSteps[currentStep - 1].subtitle}</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#666" />
            <Text style={styles.backButtonText}>Atrás</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length ? 'Comenzar' : 'Siguiente'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#25D366',
    borderRadius: 2,
  },
  progressText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  stepDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  optionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#25D366',
    backgroundColor: '#1a2a1a',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#999',
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGoal: {
    borderColor: '#25D366',
    backgroundColor: '#1a2a1a',
  },
  goalLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedGoalText: {
    color: '#fff',
  },
  injuryOptions: {
    gap: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
