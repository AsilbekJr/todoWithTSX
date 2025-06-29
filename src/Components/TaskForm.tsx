import { useState } from "react";

type Task = {
  id: number;
  desc: string;
  dead: number;
  complete: boolean;
};

const TaskForm = () => {
  const [desc, setDesc] = useState("");
  const [dead, setDead] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      desc,
      dead,
      complete: false,
    };

    const existing = localStorage.getItem("tasks");
    const tasks: Task[] = existing ? JSON.parse(existing) : [];
    const updated = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updated));
    setDesc("");
    setDead(0);
    window.location.reload(); // vaqtinchalik: page refresh qilsin TaskLists yangilanishi uchun
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Vazifa nomi"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Deadline (kun)"
        value={dead}
        onChange={(e) => setDead(Number(e.target.value))}
        required
      />
      <button type="submit">Qo‘shish</button>
    </form>
  );
};

export default TaskForm;
