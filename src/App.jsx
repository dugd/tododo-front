import TaskList from "./components/TaskList.jsx";
import Header from "./components/Header.jsx";
import TaskMenu from "./components/TaskMenu.jsx";
import TaskFormModal from "./components/TaskFormModal.jsx";
import {useEffect, useState} from "react";
import {getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi, toggleTaskApi, toggleSubtaskApi } from "./api/tasks.js";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/task-menu.css";

export default function App() {
    const [tasks, setTasks] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [filterFn, setFilterFn] = useState(() => (t) => true);
    const [sortFn, setSortFn] = useState(() => (t) => 0);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const _ = loadTasks();
    }, []);

    async function loadTasks() {
        try {
            const initTasks = await getTasksApi();
            if (initTasks === null) {
                return;
            }
            setTasks(initTasks);
        } catch (e) {
            console.log(e);
        }
    }

    async function addTask(payload) {
        try {
            const newTask = await createTaskApi(payload);
            if (newTask === null) {
                return;
            }
            setTasks(prevTasks =>
                [
                    ...prevTasks,
                    newTask,
                ]
            );
        } catch (e) {
            console.log(e);
        }
    }

    async function editTask(id, data) {
        try {
            const updatedTask = await updateTaskApi(id, data);
            if (updatedTask === null) {
                return;
            }
            setTasks(prevTasks => prevTasks.map(t => {
                    return t._id === id ? updatedTask : t;
                })
            );
        } catch (e) {
            console.log(e);
        }
    }

    async function toggleTask(id) {
        try {
            const updatedTask = await toggleTaskApi(id);
            if (updatedTask === null) {
                return;
            }
            setTasks(prevTasks => prevTasks.map(t => {
                    return t._id === id ? updatedTask : t;
                })
            );
        } catch (e) {
            console.log(e);
        }
    }

    async function toggleSubtask(id, subIndex) {
        try {
            const updatedTask = await toggleSubtaskApi(id, subIndex);
            if (updatedTask === null) {
                return;
            }
            setTasks(prevTasks => prevTasks.map(t => {
                    return t._id === id ? updatedTask : t;
                })
            );
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteTask(id) {
        try {
            await deleteTaskApi(id);
            setTasks(prevTasks => prevTasks.filter((t) => t._id !== id))

        } catch (e) {
            console.log(e);
        }
    }

    function applyFilters(tasks) {
        return tasks.filter((t) => filterFn(t) && t.title.startsWith(searchInput.trim()));
    }

    function openCreateModal() {
        setEditingTask(null);
        setModalOpen(true);
    }

    function openEditModal(task) {
        setEditingTask(task);
        setModalOpen(true);
    }

    async function saveTask(data) {
        if (editingTask) {
            await editTask(editingTask._id, data);
        }
        else {
            await addTask(data);
        }
    }

    const visibleTasks = applyFilters(tasks).sort(sortFn);

    return (
        <>
            <Header />
            <main className="app">

                <TaskMenu onFilter={setFilterFn} onSort={setSortFn} onSearch={setSearchInput} />

                <h2 className="list-title">Todo-list:</h2>

                <TaskList tasks={visibleTasks} t
                          toggleTask={toggleTask}
                          toggleSubtask={toggleSubtask}
                          editTask={openEditModal}
                          deleteTask={deleteTask} />

                <button
                    className="btn-add-task-full"
                    onClick={() => openCreateModal()}
                >
                    + Додати задачу
                </button>

                <TaskFormModal
                    isOpen={modalOpen}
                    onClose={ () => setModalOpen(false) }
                    onSave={ saveTask }
                    initialData={ editingTask }
                />
            </main>
        </>
    );
}
