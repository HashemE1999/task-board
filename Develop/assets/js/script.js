// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// 
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

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});