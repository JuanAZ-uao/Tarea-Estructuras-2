import { useState } from "react";
import type { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  initialTitle?: string;
  initialDescription?: string;
  submitLabel?: string;
  onCancel?: () => void;
}

const TaskForm = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  submitLabel = "Agregar Tarea",
  onCancel,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(title.trim(), description.trim());
      if (!initialTitle) {
        setTitle("");
        setDescription("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form mb-4">
      <div className="row g-2 align-items-end">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary flex-grow-1"
            disabled={submitting || !title.trim()}
          >
            <FiPlus className="me-1" />
            {submitting ? "..." : submitLabel}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
