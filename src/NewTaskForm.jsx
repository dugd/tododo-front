import {useState} from "react";

export default function NewTaskForm({ onSubmit }) {
    const [newTask, setNewTask] = useState("");

    function handleNewTask(e) {
        e.preventDefault();
        onSubmit(newTask);

        setNewTask("");
    }

    return (
        <form className="task-form" onSubmit={handleNewTask}>
            <div className="form-group">
                <input
                    type="text"
                    id="item"
                    className="task-input"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task"
                />
            </div>
            <button className="btn-add" type="submit">Add</button>
        </form>
    );
}