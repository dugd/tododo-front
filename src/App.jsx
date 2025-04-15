import { useState } from "react";
import NewTaskForm from "./NewTaskForm.jsx";
import TaskList from "./TaskList.jsx";
import "./styles/reset.css";
import "./styles/style.css";
import Header from "./Header.jsx";

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
            <Header />
            <div className="app">
                <NewTaskForm onSubmit={addTask} />
                <h1 className="list-title">Todo-list:</h1>
                <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
            </div>
        </>
    );
}
