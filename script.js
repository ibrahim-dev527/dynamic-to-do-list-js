 // Wait for the HTML document to fully load before running JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            
            // Step 2: Select DOM Elements
            // Get reference to the "Add Task" button
            const addButton = document.getElementById('add-task-btn');
            
            // Get reference to the input field where users type tasks
            const taskInput = document.getElementById('task-input');
            
            // Get reference to the <ul> element that will hold all tasks
            const taskList = document.getElementById('task-list');
            
            // Step 3: Create the addTask Function
            function addTask() {
                // Get the text from the input field and remove extra whitespace
                const taskText = taskInput.value.trim();
                
                // Step 4: Validation - Check if the input is empty
                if (taskText === '') {
                    alert('Please enter a task');
                    return; // Exit the function if no task was entered
                }
                
                // Create a new list item element
                const li = document.createElement('li');
                
                // Set the text content of the list item to the task text
                li.textContent = taskText;
                
                // Create a remove button for this task
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'remove-btn';
                
                // Add click functionality to the remove button
                // When clicked, it will remove this specific list item from the task list
                removeBtn.onclick = function() {
                    taskList.removeChild(li);
                };
                
                // Append the remove button to the list item
                li.appendChild(removeBtn);
                
                // Append the complete list item to the task list
                taskList.appendChild(li);
                
                // Clear the input field so user can enter a new task
                taskInput.value = '';
            }
            
            // Step 5: Attach Event Listeners
            
            // Add click event listener to the "Add Task" button
            addButton.addEventListener('click', addTask);
            
            // Add keypress event listener to the input field
            // This allows users to press Enter to add a task
            taskInput.addEventListener('keypress', function(event) {
                // Check if the key pressed was Enter
                if (event.key === 'Enter') {
                    addTask(); // Call addTask function
                }
            });
            
        });