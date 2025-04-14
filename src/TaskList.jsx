import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
    return (
        <ul>
            {tasks.length === 0 && ":("}
            {tasks.map((task) => {
                return <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />;
            })}
        </ul>
    );
}