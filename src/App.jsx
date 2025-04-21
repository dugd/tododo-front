import TaskList from "./components/TaskList.jsx";
import Header from "./components/Header.jsx";
import TaskMenu from "./components/TaskMenu.jsx";
import initTasks from "./data.js";
import "./styles/reset.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/task-menu.css";
import TaskFormModal from "./components/TaskFormModal.jsx";
import {useState} from "react";


export default function App() {
    const [tasks, setTasks] = useState(initTasks);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [filterFn, setFilterFn] = useState(() => (t) => true);
    const [sortFn, setSortFn] = useState(() => (t) => 0);
    const [searchInput, setSearchInput] = useState("");

    function addTask({ title, description, deadline, priority, subtasks }) {
        setTasks(prevTasks =>
            [
                ...prevTasks,
                {
                    id: crypto.randomUUID(),
                    title,
                    description,
                    deadline,
                    priority,
                    subtasks,
                    done: false
                }
            ]
        );
    }

    function editTask(id, data) {
        setTasks(prevTasks => prevTasks.map(t => {
            return t.id === id ? { ...t, ...data } : t;
            })
        );
    }

    function openCreateModal() {
        setEditingTask(null);
        setModalOpen(true);
    }

    function openEditModal(task) {
        setEditingTask(task);
        setModalOpen(true);
    }

    function saveTask(data) {
        if (editingTask) {
            editTask(editingTask.id, data);
        }
        else {
            addTask(data);
        }
    }

    function toggleTask(id) {
        setTasks(prevTasks => prevTasks.map((t) => {
            if (t.id === id) {
                return {...t, done: !t.done}
            }
            return t;
        }));
    }

    function toggleSubtask(id, subIndex) {
        setTasks(prevTasks => prevTasks.map((t) => {
            if (t.id === id) {
                const updated_subtasks = t.subtasks.map((sub, i) => i === subIndex ? {...sub, done: !sub.done} : sub);
                return {...t, subtasks: updated_subtasks}
            }
            return t;
        }));
    }

    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter((t) => t.id !== id))
    }

    function applyFilters(tasks) {
        return tasks.filter((t) => filterFn(t) && t.title.startsWith(searchInput.trim()));
    }

    const visibleTasks = applyFilters(tasks).sort(sortFn);

    return (
        <>
            <Header />
            <main className="app">

                <TaskMenu onFilter={setFilterFn} onSort={setSortFn} onSearch={setSearchInput} />

                <h2 className="list-title">Todo-list:</h2>

                <TaskList tasks={visibleTasks} t
                          oggleTask={toggleTask}
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
