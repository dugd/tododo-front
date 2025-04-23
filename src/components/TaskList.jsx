import TaskItem from "./TaskItem.jsx";
import "../styles/task-list.css";

export default function TaskList({ tasks, toggleTask, toggleSubtask, editTask, deleteTask }) {
    return (
        <ul className="task-list">
            {tasks.length === 0 ?
                <p className="empty-state">
                    :(
                </p>
                : tasks.map((task) => {
                    return <TaskItem
                        key={task._id}
                        task={task}
                        toggleTask={toggleTask}
                        toggleSubtask={toggleSubtask}
                        editTask={editTask}
                        deleteTask={deleteTask}
                    />;
                })
            }
        </ul>
    );
}