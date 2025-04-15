import TaskItem from "./TaskItem.jsx";
import "../styles/task-list.css";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
    return (
        <ul className="task-list">
            {tasks.length === 0 ?
                <p className="empty-state">
                    :(
                </p>
                : tasks.map((task) => {
                    return <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />;
                })
            }
        </ul>
    );
}