import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, done: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (
    id: string,
    data: Partial<Pick<Task, "title" | "description">>
  ) => Promise<void>;
}

const TaskItem = ({ task, onToggle, onDelete, onUpdate }: TaskItemProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = async () => {
    if (!title.trim()) return;
    await onUpdate(task.id, {
      title: title.trim(),
      description: description.trim(),
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setEditing(false);
  };

  return (
    <div className={`task-item card mb-2 ${task.done ? "task-done" : ""}`}>
      <div className="card-body d-flex align-items-center gap-3">
        <input
          type="checkbox"
          className="form-check-input task-checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id, task.done)}
        />

        {editing ? (
          <div className="flex-grow-1 d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <input
              type="text"
              className="form-control form-control-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />
            <button
              className="btn btn-sm btn-success"
              onClick={handleSave}
              title="Guardar"
            >
              <FiCheck />
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleCancel}
              title="Cancelar"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow-1">
              <h6
                className={`mb-0 ${task.done ? "text-decoration-line-through text-muted" : ""}`}
              >
                {task.title}
              </h6>
              {task.description && (
                <small className="text-muted">{task.description}</small>
              )}
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setEditing(true)}
              title="Editar"
            >
              <FiEdit2 />
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(task.id)}
              title="Eliminar"
            >
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
