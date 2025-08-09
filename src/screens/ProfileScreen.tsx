import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const userStats = [
  { label: "Entrenamientos", value: "24", icon: "fitness" },
  { label: "Clases", value: "12", icon: "calendar" },
  { label: "Días", value: "8", icon: "time" },
  { label: "Calorías", value: "2,450", icon: "flame" }
];

const profileOptions = [
  { title: "Información Personal", icon: "person-outline", action: "edit" },
  { title: "Historial de Entrenamientos", icon: "list-outline", action: "view" },
  { title: "Metas y Objetivos", icon: "target-outline", action: "edit" },
  { title: "Preferencias", icon: "settings-outline", action: "edit" },
  { title: "Notificaciones", icon: "notifications-outline", action: "edit" },
  { title: "Ayuda y Soporte", icon: "help-circle-outline", action: "view" },
  { title: "Cerrar Sesión", icon: "log-out-outline", action: "logout", danger: true }
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile Info */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#059669" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
            <Text style={styles.membershipText}>
              Miembro desde {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'Recientemente'}
            </Text>
            <View style={styles.membershipBadge}>
              <Ionicons name="star" size={16} color="#FCD34D" />
              <Text style={styles.membershipLabel}>Membresía Premium</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Estadísticas del Mes</Text>
        <View style={styles.statsGrid}>
          {userStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statHeader}>
                <Ionicons name={stat.icon as any} size={20} color="#059669" />
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progreso del Mes</Text>
          <View style={styles.progressItems}>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Meta de entrenamientos</Text>
                <Text style={styles.progressValue}>24/30</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '80%', backgroundColor: '#059669' }]} />
              </View>
            </View>
            
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Meta de clases</Text>
                <Text style={styles.progressValue}>12/15</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '80%', backgroundColor: '#2563EB' }]} />
              </View>
            </View>
            
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Meta de calorías</Text>
                <Text style={styles.progressValue}>2,450/3,000</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '82%', backgroundColor: '#EA580C' }]} />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsSection}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.optionsCard}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.optionItem,
                index === profileOptions.length - 1 && styles.optionItemLast
              ]}
              onPress={() => {
                if (option.action === 'logout') {
                  handleLogout();
                }
              }}
            >
              <Ionicons 
                name={option.icon as any} 
                size={24} 
                color={option.danger ? "#EF4444" : "#6B7280"} 
              />
              <Text style={[
                styles.optionText,
                option.danger && styles.optionTextDanger
              ]}>
                {option.title}
              </Text>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={option.danger ? "#EF4444" : "#6B7280"} 
              />
            </TouchableOpacity>
          ))}
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  membershipText: {
    color: '#D1FAE5',
    fontSize: 16,
    marginBottom: 4,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membershipLabel: {
    color: '#FCD34D',
    fontSize: 14,
    marginLeft: 4,
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
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
  progressSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressItems: {
    gap: 12,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    color: '#6B7280',
  },
  progressValue: {
    color: '#1F2937',
    fontWeight: '600',
  },
  progressBar: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    height: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  optionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  optionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionItemLast: {
    borderBottomWidth: 0,
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  optionTextDanger: {
    color: '#EF4444',
  },
});
