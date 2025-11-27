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


         // Wait for the HTML document to fully load before running JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            
            // Select DOM Elements
            const addButton = document.getElementById('add-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');
            
            // ===== NEW: FUNCTION TO LOAD TASKS FROM LOCAL STORAGE =====
            function loadTasks() {
                // Get tasks from Local Storage
                // If no tasks exist, use an empty array '[]'
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                
                // Loop through each stored task and add it to the page
                // Pass 'false' as second parameter to prevent saving again
                storedTasks.forEach(function(taskText) {
                    addTask(taskText, false);
                });
            }
            
            // ===== MODIFIED: ADD TASK FUNCTION WITH LOCAL STORAGE =====
            // The 'save' parameter defaults to true
            // When loading from storage, we pass false to avoid duplicates
            function addTask(taskText, save = true) {
                
                // If taskText is not provided (user clicked button)
                // Get it from the input field
                if (typeof taskText !== 'string') {
                    taskText = taskInput.value.trim();
                }
                
                // Validation - Check if the input is empty
                if (taskText === '') {
                    alert('Please enter a task');
                    return;
                }
                
                // Create a new list item element
                const li = document.createElement('li');
                li.textContent = taskText;
                
                // Create a remove button for this task
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'remove-btn';
                
                // ===== MODIFIED: REMOVE BUTTON WITH LOCAL STORAGE UPDATE =====
                removeBtn.onclick = function() {
                    // Remove the task from the page
                    taskList.removeChild(li);
                    
                    // Get current tasks from Local Storage
                    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    
                    // Find and remove this specific task from the array
                    // filter() keeps all tasks EXCEPT the one we're removing
                    const updatedTasks = storedTasks.filter(function(task) {
                        return task !== taskText;
                    });
                    
                    // Save the updated array back to Local Storage
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                };
                
                // Append the remove button to the list item
                li.appendChild(removeBtn);
                
                // Append the complete list item to the task list
                taskList.appendChild(li);
                
                // Clear the input field
                taskInput.value = '';
                
                // ===== NEW: SAVE TO LOCAL STORAGE =====
                // Only save if 'save' parameter is true
                // This prevents duplication when loading from storage
                if (save) {
                    // Get existing tasks from Local Storage
                    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    
                    // Add the new task to the array
                    storedTasks.push(taskText);
                    
                    // Convert array to JSON and save to Local Storage
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                }
            }
            
            // ===== NEW: LOAD TASKS WHEN PAGE LOADS =====
            loadTasks();
            
            // Attach Event Listeners
            addButton.addEventListener('click', function() {
                addTask(); // Call without parameters - will use input field
            });
            
            taskInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    addTask(); // Call without parameters - will use input field
                }
            });
            
        }); // End of DOMContentLoaded event listener