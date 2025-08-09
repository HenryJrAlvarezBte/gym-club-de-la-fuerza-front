import { apiClient } from './apiClient';
import { Class, Booking, PhysicalActivity, BodyMeasurement, FitnessGoal } from '../types/fitness';

export class FitnessService {
  // Class and Booking Methods
  static async getClasses(date?: string): Promise<Class[]> {
    const endpoint = date ? `/classes?date=${date}` : '/classes';
    return apiClient.get<Class[]>(endpoint);
  }

  static async getClassById(classId: string): Promise<Class> {
    return apiClient.get<Class>(`/classes/${classId}`);
  }

  static async bookClass(classId: string): Promise<Booking> {
    return apiClient.post<Booking>('/bookings', { classId });
  }

  static async cancelBooking(bookingId: string): Promise<void> {
    return apiClient.delete(`/bookings/${bookingId}`);
  }

  static async getUserBookings(): Promise<Booking[]> {
    return apiClient.get<Booking[]>('/bookings/user');
  }

  // Physical Activity Methods
  static async logActivity(activity: Omit<PhysicalActivity, 'id' | 'userId'>): Promise<PhysicalActivity> {
    return apiClient.post<PhysicalActivity>('/activities', activity);
  }

  static async getActivities(date?: string): Promise<PhysicalActivity[]> {
    const endpoint = date ? `/activities?date=${date}` : '/activities';
    return apiClient.get<PhysicalActivity[]>(endpoint);
  }

  static async getActivityById(activityId: string): Promise<PhysicalActivity> {
    return apiClient.get<PhysicalActivity>(`/activities/${activityId}`);
  }

  static async updateActivity(activityId: string, updates: Partial<PhysicalActivity>): Promise<PhysicalActivity> {
    return apiClient.put<PhysicalActivity>(`/activities/${activityId}`, updates);
  }

  static async deleteActivity(activityId: string): Promise<void> {
    return apiClient.delete(`/activities/${activityId}`);
  }

  // Body Measurements Methods
  static async logBodyMeasurement(measurement: Omit<BodyMeasurement, 'id' | 'userId'>): Promise<BodyMeasurement> {
    return apiClient.post<BodyMeasurement>('/measurements', measurement);
  }

  static async getBodyMeasurements(): Promise<BodyMeasurement[]> {
    return apiClient.get<BodyMeasurement[]>('/measurements');
  }

  static async getLatestBodyMeasurement(): Promise<BodyMeasurement | null> {
    return apiClient.get<BodyMeasurement | null>('/measurements/latest');
  }

  static async updateBodyMeasurement(measurementId: string, updates: Partial<BodyMeasurement>): Promise<BodyMeasurement> {
    return apiClient.put<BodyMeasurement>(`/measurements/${measurementId}`, updates);
  }

  static async deleteBodyMeasurement(measurementId: string): Promise<void> {
    return apiClient.delete(`/measurements/${measurementId}`);
  }

  // Fitness Goals Methods
  static async getFitnessGoals(): Promise<FitnessGoal[]> {
    return apiClient.get<FitnessGoal[]>('/goals');
  }

  static async createFitnessGoal(goal: Omit<FitnessGoal, 'id' | 'userId'>): Promise<FitnessGoal> {
    return apiClient.post<FitnessGoal>('/goals', goal);
  }

  static async updateFitnessGoal(goalId: string, updates: Partial<FitnessGoal>): Promise<FitnessGoal> {
    return apiClient.put<FitnessGoal>(`/goals/${goalId}`, updates);
  }

  static async deleteFitnessGoal(goalId: string): Promise<void> {
    return apiClient.delete(`/goals/${goalId}`);
  }

  // Analytics and Progress Methods
  static async getWeeklyProgress(): Promise<{
    activities: number;
    totalDuration: number;
    totalCalories: number;
    goalsProgress: FitnessGoal[];
  }> {
    return apiClient.get('/progress/weekly');
  }

  static async getMonthlyProgress(): Promise<{
    activities: number;
    totalDuration: number;
    totalCalories: number;
    weightChange: number;
    measurementsProgress: BodyMeasurement[];
  }> {
    return apiClient.get('/progress/monthly');
  }
}
