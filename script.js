const taskTitle = document.getElementById('task-title');
        const taskDesc = document.getElementById('task-desc');
        const taskDate = document.getElementById('task-date');
        const addTaskBtn = document.getElementById('add-task');
        const taskList = document.getElementById('task-list');
        let tasks = [];
        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                const taskContent = document.createElement('div');
                taskContent.innerHTML = `
                    <strong>${task.title}</strong><br>
                    <small>${task.description}</small><br>
                    <small>Due: ${task.date}</small>
                `;
                const taskActions = document.createElement('div');
                const completeBtn = document.createElement('button');
                completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
                completeBtn.onclick = () => toggleCompletion(task.id);
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.onclick = () => editTask(task.id);
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteTask(task.id);
                taskActions.append(completeBtn, editBtn, deleteBtn);
                taskItem.append(taskContent, taskActions);
                taskList.appendChild(taskItem);
            });
        }
        function addTask() {
            if (taskTitle.value.trim() === '') return alert('Task title is required');
            const newTask = {
                id: Date.now(),
                title: taskTitle.value,
                description: taskDesc.value,
                date: taskDate.value || 'No Date',
                completed: false
            };
            tasks.push(newTask);
            taskTitle.value = '';
            taskDesc.value = '';
            taskDate.value = '';
            renderTasks();
        }
        function toggleCompletion(taskId) {
            tasks = tasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            renderTasks();
        }
        function deleteTask(taskId) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
        }
        function editTask(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;
            taskTitle.value = task.title;
            taskDesc.value = task.description;
            taskDate.value = task.date;
            deleteTask(taskId);
        }
        addTaskBtn.addEventListener('click', addTask);