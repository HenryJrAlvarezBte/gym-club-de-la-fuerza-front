export interface Routine {
    id: string;
    title: string;
    description: string;
    duration: number; // minutos
    difficulty: "Principiante" | "Intermedio" | "Avanzado";
    exercises: {
      name: string;
      reps: number;
      sets: number;
    }[];
  }
  