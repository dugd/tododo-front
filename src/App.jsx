import { useState } from "react";
import NewTaskForm from "./components/NewTaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import Header from "./components/Header.jsx";
import "./styles/reset.css";
import "./styles/style.css";
import TaskMenu from "./components/TaskMenu.jsx";

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
            <main className="app">
                <NewTaskForm onSubmit={addTask} />

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
