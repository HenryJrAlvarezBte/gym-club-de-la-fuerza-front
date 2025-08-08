import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";

export default function ClassManagement() {
  const [classes, setClasses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    adminService.getClasses().then(setClasses);
  }, []);

  const handleAdd = async () => {
    if (!name || !schedule) return;
    await adminService.createClass({ id: Date.now().toString(), name, schedule });
    setClasses(await adminService.getClasses());
    setName("");
    setSchedule("");
  };

  const handleDelete = async (id: string) => {
    await adminService.deleteClass(id);
    setClasses(await adminService.getClasses());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Class Management</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Class name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="border rounded">
        {classes.map(c => (
          <li key={c.id} className="flex justify-between p-2 border-b">
            <span>{c.name} — {new Date(c.schedule).toLocaleString()}</span>
            <button
              onClick={() => handleDelete(c.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
