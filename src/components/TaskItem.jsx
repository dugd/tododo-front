import { FaTrash, FaAngleDown, FaAngleUp, FaEdit } from 'react-icons/fa';
import { MdOutlineDateRange } from "react-icons/md";
import { format } from 'date-fns';
import "../styles/task-item.css";
import {useState} from "react";

export default function TaskItem({ task, toggleTask, editTask, deleteTask }) {
    const [isSubtasksOpen, setIsSubtasksOpen] = useState(false);

    const { id, title, done, deadline, priority, description, subtasks } = task;

    const deadlineFormatted = deadline
        ? format(new Date(deadline), 'dd.MM.yyyy')
        : '—';

    const priorityClass = ['low', 'medium', 'high'][priority - 1];

    return (
        <li className={`task-list-item ${priorityClass}`}>
            <div className="task-content">
                <div className="task-control">
                    <div className="subtasks-toggle-wrapper">
                        {subtasks?.length > 0 && (
                            <button className="subtasks-toggle" onClick={() => setIsSubtasksOpen(!isSubtasksOpen)}>
                                <span title="Має підзадачі">
                                    {isSubtasksOpen ? <FaAngleDown /> : <FaAngleUp/>}
                                </span>
                            </button>
                        )}
                    </div>
                    <input
                        className="task-toggle"
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleTask(id)}
                    />
                </div>

                <div className="task-info">
                    <span className="task-title">{title}</span>
                    <div className="task-meta">
                        {deadlineFormatted !== "—" && (
                            <div className="task-deadline">
                                <MdOutlineDateRange />
                                <span>{deadlineFormatted}</span>
                            </div>
                        )}
                        {description && (
                            <span className="task-desc-preview">
                                {description.length > 20
                                    ? description.slice(0, 20) + '...'
                                    : description}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="task-actions">
                <button className="btn-edit" onClick={() => editTask(task)}>
                    <FaEdit />
                </button>
                <button className="btn-delete" onClick={() => deleteTask(id)}>
                    <FaTrash />
                </button>
            </div>
        </li>
    );
}
