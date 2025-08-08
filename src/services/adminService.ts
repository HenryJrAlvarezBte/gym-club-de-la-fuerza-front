interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  interface ClassData {
    id: string;
    name: string;
    schedule: string;
  }
  
  const usersMock: User[] = [
    { id: "1", name: "Juan Pérez", email: "juan@example.com", role: "user" },
    { id: "2", name: "María Gómez", email: "maria@example.com", role: "teacher" },
  ];
  
  const classesMock: ClassData[] = [
    { id: "yoga_0730", name: "Yoga Mañana", schedule: "2025-07-28T07:30:00" },
    { id: "cardio_1800", name: "Cardio Tarde", schedule: "2025-07-28T18:00:00" },
  ];
  
  export const adminService = {
    getUsers: async () => usersMock,
    updateUserRole: async (id: string, role: string) => {
      const user = usersMock.find(u => u.id === id);
      if (user) user.role = role;
      return user;
    },
    getClasses: async () => classesMock,
    createClass: async (data: ClassData) => {
      classesMock.push(data);
      return data;
    },
    deleteClass: async (id: string) => {
      const index = classesMock.findIndex(c => c.id === id);
      if (index !== -1) classesMock.splice(index, 1);
      return true;
    }
  };
  