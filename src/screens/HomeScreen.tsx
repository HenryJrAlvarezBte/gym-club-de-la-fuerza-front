import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Define the type for the tab navigator routes
// Update this type if your tab names change
// This is needed for navigation type safety

type MainTabParamList = {
  Inicio: undefined;
  Clases: undefined;
  Actividad: undefined;
  Medidas: undefined;
  Perfil: undefined;
};

export default function HomeScreen() {
  // Get navigation object from React Navigation with correct type
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>¡Bienvenido!</Text>
        <Text style={styles.headerSubtitle}>Tu club de fitness personal</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="calendar" size={20} color="#059669" />
              <Text style={styles.statLabel}>Hoy</Text>
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statDescription}>Clases</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="fitness" size={20} color="#059669" />
              <Text style={styles.statLabel}>Esta Semana</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statDescription}>Entrenamientos</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            {/* Fast Action: Ver Horarios */}
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Clases')}>
              <Ionicons name="calendar-outline" size={24} color="#059669" />
              <Text style={styles.actionTitle}>Ver Horarios</Text>
              <Text style={styles.actionSubtitle}>Clases disponibles</Text>
            </TouchableOpacity>
            {/* Fast Action: Mis Planes */}
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Medidas')}>
              <Ionicons name="card-outline" size={24} color="#059669" />
              <Text style={styles.actionTitle}>Mis Planes</Text>
              <Text style={styles.actionSubtitle}>Membresías</Text>
            </TouchableOpacity>
            {/* Fast Action: Rutinas */}
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Actividad')}>
              <Ionicons name="fitness-outline" size={24} color="#059669" />
              <Text style={styles.actionTitle}>Rutinas</Text>
              <Text style={styles.actionSubtitle}>Ejercicios</Text>
            </TouchableOpacity>
            {/* Fast Action: Perfil */}
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Perfil')}>
              <Ionicons name="person-outline" size={24} color="#059669" />
              <Text style={styles.actionTitle}>Perfil</Text>
              <Text style={styles.actionSubtitle}>Mi información</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clases de Hoy</Text>
          <View style={styles.classesList}>
            <View style={styles.classCard}>
              <View style={styles.classHeader}>
                <View>
                  <Text style={styles.className}>CrossFit</Text>
                  <Text style={styles.classTime}>08:00 AM - 09:00 AM</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Próxima</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.classCard}>
              <View style={styles.classHeader}>
                <View>
                  <Text style={styles.className}>Yoga</Text>
                  <Text style={styles.classTime}>11:00 AM - 12:00 PM</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: '#DBEAFE' }]}>
                  <Text style={[styles.statusText, { color: '#2563EB' }]}>Disponible</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.classCard}>
              <View style={styles.classHeader}>
                <View>
                  <Text style={styles.className}>Boxeo</Text>
                  <Text style={styles.classTime}>18:00 PM - 19:00 PM</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: '#F3F4F6' }]}>
                  <Text style={[styles.statusText, { color: '#6B7280' }]}>Completo</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#D1FAE5',
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: '#059669',
    fontWeight: '600',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statDescription: {
    color: '#6B7280',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionTitle: {
    color: '#1F2937',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 16,
  },
  actionSubtitle: {
    color: '#6B7280',
    fontSize: 12,
  },
  classesList: {
    gap: 12,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  classTime: {
    color: '#6B7280',
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
});
