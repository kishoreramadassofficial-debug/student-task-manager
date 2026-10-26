
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("studentTasks") || "[]");

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function updateCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remaining} tasks remaining`;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const item = document.createElement("li");
        if (task.completed) item.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Complete task");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    updateCount();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
});

renderTasks();
