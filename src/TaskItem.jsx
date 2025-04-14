export default function TaskItem({ task, toggleTask, deleteTask }) {
    return (
        <li key={task.id}>
            <label>
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                />
                {task.title}
            </label>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    )
}