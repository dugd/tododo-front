export default function TaskItem({ task, toggleTask, deleteTask }) {
    return (
        <li className="task-list-item" key={task.id}>
            <div className="task-content">
                <input
                    className="task-toggle"
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                />
                <span className="task-title">{task.title}</span>
            </div>
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    )
}