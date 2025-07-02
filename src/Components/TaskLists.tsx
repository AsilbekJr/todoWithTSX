import TaskList from "./TaskList";

type Task = {
  id: number;
  desc: string;
  dead: number;
  complete: boolean;
};
interface TaskProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}
const TaskLists: React.FC<TaskProps> = ({
  tasks,
  onDelete,
  toggleComplete,
}) => {
  return (
    <div>
      <ul className="todo-lists">
        {tasks.length === 0 ? (
          <h1>Tasklar yoq</h1>
        ) : (
          tasks.map((item: Task) => (
            <TaskList
              key={item.id}
              task={item}
              onDelete={() => onDelete(item.id)}
              onToggle={() => toggleComplete(item.id)}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskLists;
