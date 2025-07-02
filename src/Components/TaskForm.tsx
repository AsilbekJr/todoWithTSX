import { useEffect, useState } from "react";
import TaskLists from "./TaskLists";

type Task = {
  id: number;
  desc: string;
  dead: number;
  complete: boolean;
};

const TaskForm = () => {
  const getDataFromStorage = (): Task[] => {
    try {
      const existing = localStorage.getItem("tasks");
      const tasks = existing ? (JSON.parse(existing) as Task[]) : [];
      return tasks;
    } catch (error) {
      console.error("Todos yuklanmadi");
      return [];
    }
  };
  const [tasks, setTasks] = useState<Task[]>(getDataFromStorage);
  const [desc, setDesc] = useState("");
  const [dead, setDead] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Ma'lumot saqlanmadi");
    }
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      desc,
      dead,
      complete: false,
    };
    if (newTask.dead === 0 || newTask.dead < 0) {
      alert("Iltimos bo'sh maydonlarni to'ldiring");
      return;
    }
    if (desc.trim() === "") {
      alert("Iltimos bo'sh maydonlarni to'ldiring");
      return;
    }
    setTasks([...tasks, newTask]);
    setDesc("");
    setDead(0);
  };
  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  const onDelete = (id: number) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <>
      <form>
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
        <button onClick={handleSubmit} type="button">
          Qo‘shish
        </button>
      </form>
      <TaskLists
        tasks={tasks}
        onDelete={onDelete}
        toggleComplete={toggleComplete}
      />
    </>
  );
};

export default TaskForm;
