import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css'

export default function TaskFormModal({ isOpen, onClose, onSave, initialData = null }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState(2);
    const [subtasks, setSubtasks] = useState([]);

    const [isReady, setIsReady] = useState(false);
    const [subtaskFocus, setSubtaskFocus] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title || '');
                setDescription(initialData.description || '');
                setDeadline(initialData.deadline?.slice(0, 10) || '');
                setPriority(initialData.priority || 2);
                setSubtasks(initialData.subtasks || []);
            } else {
                setTitle('');
                setDescription('');
                setDeadline('');
                setPriority(2);
                setSubtasks([]);
            }

            requestAnimationFrame(() => setIsReady(true)); // maybe it'll help
        } else {
            setIsReady(false);
        }
    }, [initialData, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onSave({
            title,
            description,
            deadline,
            priority: parseInt(priority),
            subtasks,
        });
        onClose();
    }

    if (!isOpen || !isReady) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal modal-task-form">
                <h2 className="modal-title">{initialData ? 'Редагування задачі' : 'Нова задача'}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-group">
                        <label className="modal-label">Назва</label>
                        <input
                            className="modal-input"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="modal-group">
                        <label className="modal-label">Опис</label>
                        <textarea
                            className="modal-input modal-textarea"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="modal-group">
                        <label className="modal-label">Дедлайн</label>
                        <input
                            className="modal-input"
                            type="date"
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                        />
                    </div>

                    <div className="modal-group">
                        <label className="modal-label">Пріоритет</label>
                        <select
                            className="modal-input"
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value={1}>Низький</option>
                            <option value={2}>Середній</option>
                            <option value={3}>Високий</option>
                        </select>
                    </div>

                    <div className="modal-group">
                        <label className="modal-label">Підзадачі</label>
                        <ul className="subtask-group">
                            {subtasks.map((subtask, index) => (
                                <li className="subtask-entry" key={index}>
                                    <input
                                        className="subtask-toggle"
                                        type="checkbox"
                                        checked={subtask.done}
                                        onChange={() => {
                                            const updated = [...subtasks];
                                            updated[index].done = !updated[index].done;
                                            setSubtasks(updated);
                                        }}
                                    />
                                    <input
                                        className="subtask-input"
                                        type="text"
                                        value={subtask.title}
                                        required
                                        onChange={(e) => {
                                            const updated = [...subtasks];
                                            updated[index].title = e.target.value;
                                            setSubtasks(updated);
                                        }}
                                        onBlur={(e) => {
                                            // TODO: Need rework
                                            const text = e.target.value.trim();
                                            if (text === "") {
                                                setSubtasks((prev) => prev.filter((sub, i) => i !== index))
                                            }
                                            setSubtaskFocus(null);
                                        }}
                                        autoFocus={index === subtaskFocus}
                                    />
                                </li>
                            ))}
                            <li className="subtask-entry new">
                                <input className="subtask-toggle" type="checkbox" disabled/>
                                <input
                                    className="subtask-input"
                                    type="text"
                                    placeholder="Створити підзадачу..."
                                    value=""
                                    onChange={(e) => {
                                        const text = e.target.value.trim();
                                        if (text !== "") {
                                            e.target.blur();
                                            setSubtaskFocus(subtasks.length)
                                            setSubtasks([...subtasks, { title: text, done: false, }]);
                                        }
                                    }}
                                />
                            </li>
                        </ul>
                    </div>

                    <div className="modal-actions">
                        <button className="modal-btn btn-cancel" type="button" onClick={onClose}>Скасувати</button>
                        <button className="modal-btn btn-save" type="submit">Зберегти</button>
                    </div>
                </form>
            </div>
        </>,
        document.body
    );
}
