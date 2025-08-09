import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FitnessService } from '../services/fitnessService';
import { Class, Booking } from '../types/fitness';

const classCategories = [
  { id: 'all', label: 'Todas', icon: 'grid' },
  { id: 'strength', label: 'Fuerza', icon: 'barbell' },
  { id: 'cardio', label: 'Cardio', icon: 'heart' },
  { id: 'flexibility', label: 'Flexibilidad', icon: 'body' },
  { id: 'hiit', label: 'HIIT', icon: 'flash' },
  { id: 'yoga', label: 'Yoga', icon: 'leaf' },
  { id: 'pilates', label: 'Pilates', icon: 'fitness' },
];

const difficultyColors = {
  beginner: '#25D366',
  intermediate: '#FFA500',
  advanced: '#FF4444',
};

export default function BookClassScreen() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [classesData, bookingsData] = await Promise.all([
        FitnessService.getClasses(selectedDate.toISOString().split('T')[0]),
        FitnessService.getUserBookings(),
      ]);
      setClasses(classesData);
      setUserBookings(bookingsData);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'No se pudieron cargar las clases');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleBookClass = async (classItem: Class) => {
    try {
      Alert.alert(
        'Reservar Clase',
        `¿Estás seguro de que quieres reservar "${classItem.name}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Reservar',
            onPress: async () => {
              await FitnessService.bookClass(classItem.id);
              Alert.alert('Éxito', 'Clase reservada correctamente');
              loadData(); // Reload data to update bookings
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error booking class:', error);
      Alert.alert('Error', 'No se pudo reservar la clase');
    }
  };

  const handleCancelBooking = async (booking: Booking) => {
    try {
      Alert.alert(
        'Cancelar Reserva',
        `¿Estás seguro de que quieres cancelar "${booking.class.name}"?`,
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Sí, Cancelar',
            style: 'destructive',
            onPress: async () => {
              await FitnessService.cancelBooking(booking.id);
              Alert.alert('Éxito', 'Reserva cancelada correctamente');
              loadData(); // Reload data to update bookings
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error canceling booking:', error);
      Alert.alert('Error', 'No se pudo cancelar la reserva');
    }
  };

  const isClassBooked = (classId: string) => {
    return userBookings.some(booking => booking.classId === classId && booking.status === 'confirmed');
  };

  const getBookedClass = (classId: string) => {
    return userBookings.find(booking => booking.classId === classId && booking.status === 'confirmed');
  };

  const filteredClasses = classes.filter(classItem => 
    selectedCategory === 'all' || classItem.category === selectedCategory
  );

  const formatTime = (time: string) => {
    return time.substring(0, 5); // Format HH:MM
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderClassCard = (classItem: Class) => {
    const isBooked = isClassBooked(classItem.id);
    const booking = getBookedClass(classItem.id);
    const isFull = classItem.currentBookings >= classItem.maxCapacity;

    return (
      <View key={classItem.id} style={styles.classCard}>
        <View style={styles.classHeader}>
          <View style={styles.classInfo}>
            <Text style={styles.className}>{classItem.name}</Text>
            <Text style={styles.classInstructor}>Con {classItem.instructor}</Text>
          </View>
          <View style={styles.classMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[classItem.difficulty] }]}>
              <Text style={styles.difficultyText}>
                {classItem.difficulty === 'beginner' ? 'Principiante' :
                 classItem.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.classDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{formatTime(classItem.time)} • {classItem.duration} min</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{formatDate(classItem.date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{classItem.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {classItem.currentBookings}/{classItem.maxCapacity} reservas
            </Text>
          </View>
        </View>

        <Text style={styles.classDescription}>{classItem.description}</Text>

        <View style={styles.classActions}>
          {isBooked ? (
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancelBooking(booking!)}
            >
              <Ionicons name="close-circle" size={20} color="#FF4444" />
              <Text style={styles.cancelButtonText}>Cancelar Reserva</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.bookButton, isFull && styles.disabledButton]}
              onPress={() => handleBookClass(classItem)}
              disabled={isFull}
            >
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.bookButtonText}>
                {isFull ? 'Clase Llena' : 'Reservar Clase'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={styles.loadingText}>Cargando clases...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reservar Clases</Text>
        <Text style={styles.subtitle}>Encuentra y reserva tu próxima clase</Text>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {classCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.id ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Classes List */}
      <ScrollView
        style={styles.classesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredClasses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#666" />
            <Text style={styles.emptyTitle}>No hay clases disponibles</Text>
            <Text style={styles.emptySubtitle}>
              Intenta con otra fecha o categoría
            </Text>
          </View>
        ) : (
          filteredClasses.map(renderClassCard)
        )}
      </ScrollView>
    </View>
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  categoryText: {
    color: '#666',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  classesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  classCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  classInstructor: {
    fontSize: 14,
    color: '#999',
  },
  classMeta: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  classDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
  },
  classDescription: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  classActions: {
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 200,
    justifyContent: 'center',
  },
  bookButton: {
    backgroundColor: '#25D366',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  disabledButton: {
    opacity: 0.5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
