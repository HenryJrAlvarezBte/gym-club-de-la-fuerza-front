import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settingsSections = [
  {
    title: "Notificaciones",
    items: [
      { label: "Notificaciones push", type: "switch", value: true },
      { label: "Recordatorios de clases", type: "switch", value: true },
      { label: "Logros y progreso", type: "switch", value: false },
      { label: "Ofertas especiales", type: "switch", value: false }
    ]
  },
  {
    title: "Privacidad",
    items: [
      { label: "Perfil público", type: "switch", value: false },
      { label: "Compartir progreso", type: "switch", value: true },
      { label: "Mostrar ubicación", type: "switch", value: false }
    ]
  },
  {
    title: "Aplicación",
    items: [
      { label: "Tema oscuro", type: "switch", value: false },
      { label: "Idioma", type: "select", value: "Español" },
      { label: "Unidades", type: "select", value: "Métrico" },
      { label: "Sincronización automática", type: "switch", value: true }
    ]
  },
  {
    title: "Cuenta",
    items: [
      { label: "Cambiar contraseña", type: "action" },
      { label: "Información de pago", type: "action" },
      { label: "Exportar datos", type: "action" },
      { label: "Eliminar cuenta", type: "action", danger: true }
    ]
  }
];

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    classReminders: true,
    achievements: false,
    specialOffers: false,
    publicProfile: false,
    shareProgress: true,
    showLocation: false,
    darkMode: false,
    autoSync: true
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const renderSettingItem = (item: any, sectionIndex: number, itemIndex: number) => {
    const isLast = itemIndex === settingsSections[sectionIndex].items.length - 1;
    
    return (
      <View key={itemIndex} style={[
        styles.settingItem,
        !isLast && styles.settingItemBorder
      ]}>
        <View style={styles.settingContent}>
          <Text style={[
            styles.settingLabel,
            item.danger && styles.settingLabelDanger
          ]}>
            {item.label}
          </Text>
          {item.type === 'select' && (
            <Text style={styles.settingValue}>{item.value}</Text>
          )}
        </View>
        
        {item.type === 'switch' && (
          <Switch
            value={settings[item.label.toLowerCase().replace(/\s+/g, '') as keyof typeof settings] || false}
            onValueChange={() => toggleSetting(item.label.toLowerCase().replace(/\s+/g, ''))}
            trackColor={{ false: '#E5E7EB', true: '#059669' }}
            thumbColor={settings[item.label.toLowerCase().replace(/\s+/g, '') as keyof typeof settings] ? '#FFFFFF' : '#FFFFFF'}
          />
        )}
        
        {item.type === 'select' && (
          <View style={styles.selectContainer}>
            <Text style={styles.selectValue}>{item.value}</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </View>
        )}
        
        {item.type === 'action' && (
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={item.danger ? "#EF4444" : "#6B7280"} 
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
        <Text style={styles.headerSubtitle}>Personaliza tu experiencia</Text>
      </View>

      {/* Settings Sections */}
      <View style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => 
                renderSettingItem(item, sectionIndex, itemIndex)
              )}
            </View>
          </View>
        ))}
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <View style={styles.appInfoCard}>
          <View style={styles.appInfoHeader}>
            <View>
              <Text style={styles.appName}>El Club de la Fuerza</Text>
              <Text style={styles.appVersion}>Versión 1.0.0</Text>
            </View>
            <View style={styles.appIcon}>
              <Ionicons name="fitness" size={24} color="#FFFFFF" />
            </View>
          </View>
          
          <View style={styles.appLinks}>
            <TouchableOpacity style={styles.appLink}>
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
              <Text style={styles.appLinkText}>Términos y Condiciones</Text>
              <Ionicons name="chevron-forward" size={16} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.appLink}>
              <Ionicons name="shield-outline" size={20} color="#6B7280" />
              <Text style={styles.appLinkText}>Política de Privacidad</Text>
              <Ionicons name="chevron-forward" size={16} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.appLink}>
              <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
              <Text style={styles.appLinkText}>Centro de Ayuda</Text>
              <Ionicons name="chevron-forward" size={16} color="#6B7280" />
            </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  settingLabelDanger: {
    color: '#EF4444',
  },
  settingValue: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectValue: {
    color: '#6B7280',
    marginRight: 8,
  },
  appInfo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  appInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  appVersion: {
    color: '#6B7280',
  },
  appIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#059669',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appLinks: {
    gap: 8,
  },
  appLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  appLinkText: {
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
  },
});
