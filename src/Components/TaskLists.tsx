import TaskList from "./TaskList";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  desc: string;
  dead: number;
  complete: boolean;
};

const TaskLists: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const store = localStorage.getItem("tasks");
    if (store) {
      try {
        const parsed: Task[] = JSON.parse(store);
        setTasks(parsed);
      } catch (error) {
        console.error("Error parsing tasks:", error);
      }
    }
  }, []);

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <ul className="todo-lists">
        {tasks.map((item) => (
          <TaskList
            key={item.id}
            task={item}
            onToggle={() => toggleComplete(item.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskLists;
