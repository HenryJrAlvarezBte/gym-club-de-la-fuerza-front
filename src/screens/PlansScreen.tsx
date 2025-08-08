import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const plans = [
  {
    id: 1,
    name: "Plan Básico",
    price: "$38.000",
    period: "mes",
    features: [
      "Acceso a gimnasio",
      "Clases grupales básicas",
      "Acceso a vestidores",
      "WiFi gratuito"
    ],
    popular: false,
    color: "#3B82F6"
  },
  {
    id: 2,
    name: "Plan Premium",
    price: "$45.000",
    period: "mes",
    features: [
      "Todo del plan básico",
      "Clases premium (CrossFit, Yoga)",
      "Entrenador personal 1x/semana",
      "Acceso a piscina",
      "Spa y sauna"
    ],
    popular: true,
    color: "#059669"
  },
  {
    id: 3,
    name: "Plan VIP",
    price: "$57.000",
    period: "mes",
    features: [
      "Todo del plan premium",
      "Entrenador personal 3x/semana",
      "Nutricionista incluido",
      "Acceso 24/7",
      "Estacionamiento gratuito",
      "Invitados gratis"
    ],
    popular: false,
    color: "#7C3AED"
  }
];

export default function PlansScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planes de Membresía</Text>
        <Text style={styles.headerSubtitle}>Elige el plan perfecto para ti</Text>
      </View>

      {/* Plans */}
      <View style={styles.content}>
        {plans.map((plan) => (
          <View key={plan.id} style={styles.planContainer}>
            <View style={[styles.planHeader, { backgroundColor: plan.color }]}>
              <View style={styles.planHeaderContent}>
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>/{plan.period}</Text>
                  </View>
                </View>
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>MÁS POPULAR</Text>
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.planBody}>
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#059669" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity 
                style={[styles.selectButton, { backgroundColor: plan.color }]}
              >
                <Text style={styles.selectButtonText}>
                  {plan.popular ? 'Seleccionar Plan' : 'Elegir Plan'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Información Adicional</Text>
          <View style={styles.infoItems}>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle" size={20} color="#059669" />
              <Text style={styles.infoText}>
                Todos los planes incluyen cancelación gratuita
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle" size={20} color="#059669" />
              <Text style={styles.infoText}>
                Pago mensual sin compromiso a largo plazo
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle" size={20} color="#059669" />
              <Text style={styles.infoText}>
                Acceso inmediato al gimnasio
              </Text>
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
  planContainer: {
    marginBottom: 24,
  },
  planHeader: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  planHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  planPeriod: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 4,
  },
  popularBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planBody: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  additionalInfo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoItems: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
});
