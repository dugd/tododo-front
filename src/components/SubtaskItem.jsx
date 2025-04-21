export default function SubtaskItem({ index, subtask, toggleSubtask }) {
    const { title, done } = subtask;

    return (
            <li className="subtask-list-item">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleSubtask(index)}
                    className="subtask-toggle"
                />
                <span className={`subtask-title ${done ? "done" : ""}`}>{title}</span>
            </li>
    )
}