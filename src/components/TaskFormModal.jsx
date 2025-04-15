import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css'

export default function TaskFormModal({ isOpen, onClose, onSave, initialData = null }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState(2);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setDeadline(initialData.deadline?.slice(0, 10) || '');
            setPriority(initialData.priority || 2);
        } else {
            setTitle('');
            setDescription('');
            setDeadline('');
            setPriority(2);
        }
    }, [initialData, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onSave({
            title,
            description,
            deadline,
            priority: parseInt(priority)
        });
        onClose();
    }

    if (!isOpen) return null;

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

                    <div className="modal-actions">
                        <button className="modal-btn btn-save" type="submit">Зберегти</button>
                        <button className="modal-btn btn-cancel" type="button" onClick={onClose}>Скасувати</button>
                    </div>
                </form>
            </div>
        </>,
        document.body
    );
}
