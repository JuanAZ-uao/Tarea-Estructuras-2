import { useTaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Home = () => {
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTask } =
    useTaskContext();

  const pendingTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Mis Tareas</h2>

      <TaskForm onSubmit={addTask} />

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="fs-5">No tienes tareas aún. ¡Crea una!</p>
        </div>
      ) : (
        <>
          {pendingTasks.length > 0 && (
            <div className="mb-4">
              <h5 className="text-muted mb-3">
                Pendientes ({pendingTasks.length})
              </h5>
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                />
              ))}
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h5 className="text-muted mb-3">
                Completadas ({completedTasks.length})
              </h5>
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
