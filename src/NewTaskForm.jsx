import {useState} from "react";

export default function NewTaskForm({ onSubmit }) {
    const [newTask, setNewTask] = useState("");

    function handleNewTask(e) {
        e.preventDefault();
        onSubmit(newTask);

        setNewTask("");
    }

    return (
        <form onSubmit={handleNewTask}>
            <div>
                <label htmlFor="item">New item</label>
                <input
                    type="text"
                    id="item"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </div>
            <button>Add</button>
        </form>
    );
}