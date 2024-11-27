// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Todo: create a function to create a task card
// Uses generateTaskId to create a new task card
function createTaskCard(task) {
    // Create a new div for the task card
    const taskCard = $('<div class="task-card"></div>');
    // Create elements for the task title and description
    const taskTitle = $('<h3></h3>').text(task.title);
    const taskDescription = $('<p></p>').text(task.description);
    // Create an element for the due date using Day.js
    const dueDate = $('<p></p>').text(`Due: ${dayjs(task.dueDate).format('MMMM D, YYYY')}`);
    // Append the title, description, and due date to the task card
    taskCard.append(taskTitle, taskDescription, dueDate);
    // Append the task card to the task board (assuming you have a container with the ID 'task-board')
    $('#task-board').append(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Clear the existing task list
    $('#task-list').empty();
    // Loop through each task and create a card
    tasks.forEach(task => {
        const taskCard = $(`
            <div class="task-card" data-id="${task.id}">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due Date: ${task.dueDate}</p>
                <button class="delete-btn">Delete</button>
            </div>
        `);
        // Make the task card draggable
        taskCard.draggable({
            revert: "invalid", // Return to original position if not dropped in a valid target
            start: function() {
                $(this).addClass('dragging'); // Optional: Add a class for styling
            },
            stop: function() {
                $(this).removeClass('dragging'); // Optional: Remove the class
            }
        });
        // Append the task card to the task list
        $('#task-list').append(taskCard);
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    $(document).ready(function() {
        // Function to handle adding a new task
        function addTask() {
            // Get the task details from input fields
            const taskName = $('#taskName').val();
            const taskDueDate = $('#taskDueDate').val();
    
            // Check if the task name is not empty
            if (taskName) {
                // Create a new task object
                const newTask = {
                    name: taskName,
                    dueDate: dayjs(taskDueDate).format('YYYY-MM-DD'), // Format the date using Day.js
                    completed: false
                };
    
                // Add the new task to the task list (you may need an array to store tasks)
                tasks.push(newTask); // Assuming `tasks` is your array of tasks
    
                // Update the UI to display the new task
                $('#taskList').append(`
                    <li>
                        ${newTask.name} - Due: ${newTask.dueDate}
                        <button class="completeTask">Complete</button>
                    </li>
                `);
    
                // Clear the input fields
                $('#taskName').val('');
                $('#taskDueDate').val('');
            } else {
                alert('Please enter a task name.');
            }
        }
    
        // Event listener for the add task button
        $('#addTaskButton').on('click', addTask);
    });
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    $(document).ready(function() {
        // Assuming you have an array to store tasks
        let tasks = [];
    
        // Function to handle deleting a task
        function deleteTask(taskIndex) {
            // Remove the task from the tasks array
            tasks.splice(taskIndex, 1);
    
            // Update the UI to reflect the changes
            renderTasks();
        }
    
        // Function to render tasks in the UI
        function renderTasks() {
            $('#taskList').empty(); // Clear the current task list
            tasks.forEach((task, index) => {
                $('#taskList').append(`
                    <li>
                        ${task.name} - Due: ${task.dueDate}
                        <button class="deleteTask" data-index="${index}">Delete</button>
                    </li>
                `);
            });
        }
    
        // Event listener for the delete button
        $('#taskList').on('click', '.deleteTask', function() {
            const taskIndex = $(this).data('index'); // Get the index of the task to delete
            deleteTask(taskIndex); // Call the delete function
        });
    });
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $(document).ready(function() {
        // Assuming you have an array to store tasks
        let tasks = [];
    
        // Function to render tasks in the UI
        function renderTasks() {
            $('.task-list').empty(); // Clear the current task lists
            tasks.forEach((task, index) => {
                const taskElement = $(`
                    <li class="task" data-index="${index}" draggable="true">
                        ${task.name} - Due: ${task.dueDate}
                    </li>
                `);
                // Append the task to the appropriate lane based on its status
                if (task.status === 'To Do') {
                    $('#to-do .task-list').append(taskElement);
                } else if (task.status === 'In Progress') {
                    $('#in-progress .task-list').append(taskElement);
                } else if (task.status === 'Done') {
                    $('#done .task-list').append(taskElement);
                }
            });
        }
    
        // Make tasks draggable
        $('.task-list').on('dragstart', '.task', function() {
            $(this).addClass('dragging');
        });
    
        $('.task-list').on('dragend', '.task', function() {
            $(this).removeClass('dragging');
        });
    
        // Make lanes droppable
        $('.task-lane').droppable({
            drop: function(event, ui) {
                const taskIndex = ui.draggable.data('index'); // Get the index of the dragged task
                const newStatus = $(this).find('h3').text(); // Get the new status from the lane title
    
                // Update the task's status
                tasks[taskIndex].status = newStatus;
    
                // Re-render the tasks to reflect the new status
                renderTasks();
            }
        });
    
        // Initial rendering of tasks
        renderTasks();
    });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
// Handle form submission
    $('#taskModal').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        handleAddTask();
        })
    }
);