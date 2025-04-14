import { useState } from "react";
import NewTaskForm from "./NewTaskForm.jsx";
import TaskList from "./TaskList.jsx";

export default function App() {
    const [tasks, setTasks] = useState([]);

    function addTask(title) {
        setTasks(prevTasks =>
            [
                ...prevTasks,
                { id: crypto.randomUUID(), title, done: false }
            ]
        );

    }

    function toggleTask(id) {
        setTasks(prevTasks => prevTasks.map((t) => {
            if (t.id === id) {
                return {...t, done: !t.done}
            }
            return t;
        }));
    }

    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter((t) => t.id !== id))
    }

    return (
        <>
            <NewTaskForm onSubmit={addTask} />
            <h1>Tododo list</h1>
            <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </>
    );
}
