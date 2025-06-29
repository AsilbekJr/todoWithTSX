import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

type Task = {
  id: number;
  desc: string;
  dead: number;
  complete: boolean;
};

type Props = {
  task: Task;
  onToggle: () => void;
};

const TaskList = ({ task, onToggle }: Props) => {
  return (
    <li className="todo-list">
      <h3 className="desc-title">{task.desc}</h3>
      <p className="dead-title">Deadline: {task.dead}</p>
      <p>Status: {task.complete ? "Bajarilgan" : "Bajarilmagan"}</p>
      {task.complete ? (
        <MdCheckBox cursor={"pointer"} size={"30px"} onClick={onToggle} />
      ) : (
        <MdCheckBoxOutlineBlank
          cursor={"pointer"}
          size={"30px"}
          onClick={onToggle}
        />
      )}
    </li>
  );
};

export default TaskList;
