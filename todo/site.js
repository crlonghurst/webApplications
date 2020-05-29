window.addEventListener('load', loadData);
let completedGroup = document.getElementById('completed');
completedGroup.addEventListener('click', viewCompleted);
let all = document.getElementById('all');
all.addEventListener('click', loadData);
let active = document.getElementById('active');
active.addEventListener('click', viewActive);
function loadData(){
    completedGroup.removeAttribute('class', 'active');
    all.setAttribute('class', 'active');
    active.removeAttribute('class', 'active');
    let todos = document.getElementById('theList');
    todos.innerHTML = '';
    todos.scrollTo(0,0);
    let count = 0;
    
    todoList.forEach((todo, i) => {
        let newTodo = createTodo(todo, i);
        todos.appendChild(newTodo);
        count++;
    });
    let counting  = document.getElementById('count');
    counting.innerHTML = count;
}

function createTodo(todo, i){
    let div = document.createElement('div');
    div.id = i;

    let h2 = document.createElement('h2');

    h2.innerHTML = todo.name;

    let about = document.createElement('div');
    about.innerHTML = `<p><b>Due Date: </b></p>` + todo.dueDate
                + `<br><p><b>Is it Completed: </b></p>` + todo.completed;

    div.appendChild(h2);
    div.appendChild(about);
    return div;
}


function viewCompleted(){
    completedGroup.setAttribute('class','active');
    all.removeAttribute('class','active');
    active.removeAttribute('class','active');
    let todos = document.getElementById('theList');
    todos.innerHTML = '';
    todos.scrollTo(0,0);
    let count = 0;
    todoList.forEach((todo, i) => {
        if(todoList[i].completed){
            let newTodo = createTodo(todo, i);
            todos.appendChild(newTodo);
            count++;
        }
    });
    let counting  = document.getElementById('count');
    counting.innerHTML = count;
}

function viewActive(){
    completedGroup.removeAttribute('class','active');
    all.removeAttribute('class','active');
    active.setAttribute('class','active');
    let todos = document.getElementById('theList');
    todos.innerHTML = '';
    todos.scrollTo(0,0);
    let count = 0;
    todoList.forEach((todo, i) => {
        if(!todoList[i].completed){
            let newTodo = createTodo(todo, i);
            todos.appendChild(newTodo);
            count++;
        }
    });
    let counting  = document.getElementById('count');
    counting.innerHTML = count;
}