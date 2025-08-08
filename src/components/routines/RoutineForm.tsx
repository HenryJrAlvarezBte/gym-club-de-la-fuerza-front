import { useState } from "react";

interface RoutineFormProps {
  onSubmit: (routine: any) => void;
  initialData?: any;
}

export default function RoutineForm({ onSubmit, initialData }: RoutineFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    description: "",
    duration: "",
    difficulty: "beginner"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "", duration: "", difficulty: "beginner" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Exercise name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save
      </button>
    </form>
  );
}
