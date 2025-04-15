import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import Header from "./components/Header.jsx";
import TaskMenu from "./components/TaskMenu.jsx";
import initTasks from "./data.js";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/task-menu.css";


export default function App() {
    const [tasks, setTasks] = useState(initTasks);

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
            <main className="app">

                <TaskMenu />

                <h2 className="list-title">Todo-list:</h2>

                <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />

                <button className="btn-add-task-full">
                    + Додати задачу
                </button>
            </main>
        </>
    );
}
