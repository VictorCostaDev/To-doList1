function main() {
    const inputTask = document.querySelector('.input-task');
    const btnTask = document.querySelector('.btn-task');
    const listTasks = document.querySelector('.tasks');

    function createLi() {
        const li = document.createElement('li');
        return li;
    }

    function createTask(inputText) {
        const li = createLi();
        li.innerText = inputText;
        listTasks.appendChild(li);
        clearInput();
        createDeleteButton(li);
        saveTask();
    }

    function createDeleteButton(li) {
        li.innerText += ' ';
        const btnDelete = document.createElement('button');
        btnDelete.innerText = 'Apagar';
        btnDelete.setAttribute('class', 'delete');
        btnDelete.setAttribute('title', 'Apagar esta tarefa');
        li.appendChild(btnDelete);
    }

    function clearInput() {
        inputTask.value = '';
        inputTask.focus();
    }

    function saveTask() {
        const liTasks = listTasks.querySelectorAll('li');
        const arrayOfTasks = [];

        for (let task of liTasks) {
            let taskText = task.innerText;
            taskText = taskText.replace('Apagar', '').trim();
            arrayOfTasks.push(taskText);
        }

        const tasksJSON = JSON.stringify(arrayOfTasks);
        localStorage.setItem('tasks', tasksJSON);
    }

    function addTaskSaves() {
        const tasks = localStorage.getItem('tasks');
        const arrayOfTasks = JSON.parse(tasks);
        for (let task of arrayOfTasks) createTask(task);
    }
    
    inputTask.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            if (!inputTask.value) return;
            createTask(inputTask.value);
        }
    });

    btnTask.addEventListener('click', () => {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    });

    document.addEventListener('click', (event) => {
        const element = event.target;
        if (element.classList.contains('delete')) {
            element.parentElement.remove();
            saveTask();
        } 
    });

    addTaskSaves()
}

main();