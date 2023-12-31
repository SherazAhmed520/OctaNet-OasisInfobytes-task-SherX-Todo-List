let task = document.querySelector('#task_inp');
let desc = document.querySelector('#task_desc');
let btn = document.querySelector('#add_task');
let display = document.querySelector('.task-list ol');

const deleteTask = (taskElement) => {
    if (confirm("Are you sure to delete this Task?")) {
        taskElement.parentNode.remove();
    }
};

const editTask = (taskElement) => {
    const headingTask = taskElement.querySelector('.heading');
    const descriptionTask = taskElement.querySelector('.description');

    task.value = headingTask.textContent;
    desc.value = descriptionTask.textContent;

    btn.textContent = 'Update Task';
    btn.onclick = () => {
        headingTask.textContent = task.value;
        descriptionTask.textContent = desc.value;

        // Clear input values
        task.value = '';
        desc.value = '';

        // Replace the "Update Task" button with "Add Task" button
        btn.textContent = 'Add Task';

        // Add back the event listener for the "Add Task" button
        btn.onclick = addTask;
    };
};

const addTask = () => {
    const checked = document.querySelector('#checkTask').checked;
    let status = checked ? 'Completed' : 'Incomplete';
    let statusColor = checked ? 'lightGreen' : 'red';

    display.innerHTML += `
        <li>
            <div id="list-task">
                <p class="heading">${task.value}</p>
                <p class="description">${desc.value}</p>
                <div id="task-check-div">
                    <label class="status-label" for="">Status: <span style="color: ${statusColor}">${status}</span></label>
                    <input type="checkbox" name="checkTask" id="listCheckTask">
                    <p id="text" style="display:none">Task Is Completed!</p>
                </div>
            </div>
            <div class="btn">
                <button id="edit" onclick="editTask(this.parentNode.parentNode)">Edit</button>
                <button id="delete" onclick="deleteTask(this.parentNode)">Delete</button>
            </div>
        </li>
    `;

    // Clear input values
    task.value = '';
    desc.value = '';
    document.querySelector('#checkTask').checked = false;

    // Apply filtering after adding a new task
    filterTasks();
};

btn.onclick = addTask;

const filterTasks = () => {
    const filterValue = document.querySelector('#filter').value;
    const taskItems = document.querySelectorAll('.task-list ol li');

    taskItems.forEach((item) => {
        const statusElement = item.querySelector('.status-label span');
        const isCompleted = statusElement.textContent === 'Completed';

        switch (filterValue) {
            case 'completed':
                item.style.display = isCompleted ? 'list-item' : 'none';
                break;
            case 'incomplete':
                item.style.display = isCompleted ? 'none' : 'list-item';
                break;
            default:
                item.style.display = 'list-item';
        }
    });
};

// Attach the filterTasks function to the onchange event of the filter dropdown
document.querySelector('#filter').onchange = filterTasks;
