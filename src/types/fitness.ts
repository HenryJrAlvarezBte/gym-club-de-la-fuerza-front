export interface Class {
  id: string;
  name: string;
  description: string;
  instructor: string;
  duration: number; // in minutes
  maxCapacity: number;
  currentBookings: number;
  date: string;
  time: string;
  location: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
  price?: number;
}

export interface Booking {
  id: string;
  classId: string;
  userId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: Date;
  class: Class;
}

export interface PhysicalActivity {
  id: string;
  userId: string;
  type: 'workout' | 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  name: string;
  duration: number; // in minutes
  caloriesBurned: number;
  date: Date;
  notes?: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  restTime?: number; // in seconds
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: Date;
  weight: number; // in kg
  height: number; // in cm
  bodyFatPercentage?: number;
  muscleMass?: number; // in kg
  chest?: number; // in cm
  waist?: number; // in cm
  hips?: number; // in cm
  biceps?: number; // in cm
  thighs?: number; // in cm
  calves?: number; // in cm
  notes?: string;
}

export interface FitnessGoal {
  id: string;
  userId: string;
  type: 'weight_loss' | 'muscle_gain' | 'strength' | 'endurance' | 'flexibility';
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  isCompleted: boolean;
}
