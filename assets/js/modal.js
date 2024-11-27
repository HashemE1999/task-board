$(document).ready(function() {
    // Open the modal
    $('#openModalButton').click(function() {
        $('#taskModal').css('display', 'block');
    });

    // Close the modal
    $('.close-button').click(function() {
        $('#taskModal').css('display', 'none');
    });

    // Close the modal when clicking outside of it
    $(window).click(function(event) {
        if ($(event.target).is('#taskModal')) {
            $('#taskModal').css('display', 'none');
        }
    });

    // Handle form submission
    $('#taskForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get input values
        var taskTitle = $('#taskTitle').val();
        var taskDescription = $('#taskDescription').val();
        var dueDate = $('#dueDate').val();

        // Here you would typically save the task to local storage or your data structure
        // Get existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    tasks.push(task);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

        // Close the modal
        $('#taskModal').css('display', 'none');
        
        // Clear the form fields
        $('#taskForm')[0].reset();
    });
});