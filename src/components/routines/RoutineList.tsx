import RoutineItem from "./RoutineItem";

interface RoutineListProps {
  routines: any[];
  onEdit: (routine: any) => void;
  onDelete: (id: string) => void;
}

export default function RoutineList({ routines, onEdit, onDelete }: RoutineListProps) {
  return (
    <div className="space-y-4 mt-4">
      {routines.map((routine) => (
        <RoutineItem
          key={routine.id}
          routine={routine}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
