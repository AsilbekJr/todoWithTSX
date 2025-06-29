import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskLists";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
