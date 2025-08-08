import React, { useMemo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const classes = [
    { id: 1, name: "CrossFit", time: "08:00 AM", instructor: "Carlos", capacity: 15, enrolled: 12, status: "available" },
    { id: 2, name: "Yoga", time: "11:00 AM", instructor: "María", capacity: 20, enrolled: 18, status: "almost-full" },
    { id: 3, name: "Boxeo", time: "18:00 PM", instructor: "Roberto", capacity: 12, enrolled: 12, status: "full" },
    { id: 4, name: "Spinning", time: "19:30 PM", instructor: "Ana", capacity: 25, enrolled: 15, status: "available" },
    { id: 5, name: "Pilates", time: "07:00 AM", instructor: "Laura", capacity: 15, enrolled: 8, status: "available" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return { bg: '#DCFCE7', text: '#059669' };
    case 'almost-full': return { bg: '#FEF3C7', text: '#D97706' };
    case 'full': return { bg: '#FEE2E2', text: '#DC2626' };
    default: return { bg: '#F3F4F6', text: '#6B7280' };
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Disponible';
    case 'almost-full': return 'Casi Lleno';
    case 'full': return 'Completo';
    default: return 'Desconocido';
  }
};

// Memoized class item component
const ClassItem = React.memo(({ item }: { item: any }) => {
  const statusColors = getStatusColor(item.status);
  
  return (
    <TouchableOpacity style={styles.classCard}>
      <View style={styles.classHeader}>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.instructorName}>{item.instructor}</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.classTime}>{item.time}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
          <Text style={[styles.statusText, { color: statusColors.text }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.classFooter}>
        <View style={styles.capacityContainer}>
          <Ionicons name="people-outline" size={16} color="#6B7280" />
          <Text style={styles.capacityText}>
            {item.enrolled}/{item.capacity} personas
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.enrollButton,
            item.status === 'full' && styles.enrollButtonDisabled
          ]}
          disabled={item.status === 'full'}
        >
          <Text style={[
            styles.enrollButtonText,
            item.status === 'full' && styles.enrollButtonTextDisabled
          ]}>
            {item.status === 'full' ? 'Completo' : 'Inscribirse'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

// Memoized filter button component
const FilterButton = React.memo(({ title, isActive, onPress }: any) => (
  <TouchableOpacity 
    style={isActive ? styles.filterButtonActive : styles.filterButton}
    onPress={onPress}
  >
    <Text style={isActive ? styles.filterButtonTextActive : styles.filterButtonText}>
      {title}
    </Text>
  </TouchableOpacity>
));

export default function ClassesScreen() {
  // Memoize filter buttons data
  const filterButtons = useMemo(() => [
    { title: "Todas", isActive: true },
    { title: "Hoy", isActive: false },
    { title: "Mañana", isActive: false }
  ], []);

  // Optimize FlatList rendering
  const renderClassItem = useCallback(({ item }: { item: any }) => (
    <ClassItem item={item} />
  ), []);

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Horario de Clases</Text>
        <Text style={styles.headerSubtitle}>Encuentra tu clase perfecta</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <View style={styles.filterButtons}>
          {filterButtons.map((button, index) => (
            <FilterButton key={index} {...button} />
          ))}
        </View>
      </View>

      {/* Classes List */}
      <FlatList
        data={classes}
        keyExtractor={keyExtractor}
        renderItem={renderClassItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={5}
        getItemLayout={(data, index) => ({
          length: 120, // Approximate height of each item
          offset: 120 * index,
          index,
        })}
      />
    </View>
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
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    color: '#1F2937',
    marginBottom: 4,
  },
  instructorName: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classTime: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacityText: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 4,
  },
  enrollButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  enrollButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  enrollButtonTextDisabled: {
    color: '#6B7280',
  },
});