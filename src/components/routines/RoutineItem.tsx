interface RoutineItemProps {
    routine: any;
    onEdit: (routine: any) => void;
    onDelete: (id: string) => void;
  }
  
  export default function RoutineItem({ routine, onEdit, onDelete }: RoutineItemProps) {
    return (
      <div className="p-4 bg-gray-100 shadow rounded flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{routine.name}</h3>
          <p>{routine.description}</p>
          <small>Duration: {routine.duration} min | Difficulty: {routine.difficulty}</small>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(routine)}
            className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(routine.id)}
            className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  