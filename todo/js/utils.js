let completedGroup = document.getElementById('completed');
let all = document.getElementById('all');
let active = document.getElementById('active');
import ls from './ls.js';
import TODO from './Todo.js';



function loadData(){
    document.querySelector('#theList').innerHTML = "";
    completedGroup.removeAttribute('class', 'active');
    all.setAttribute('class', 'active');
    active.removeAttribute('class', 'active');
    TODO.loadTodos();
}

function viewCompleted(){
    completedGroup.setAttribute('class','active');
    all.removeAttribute('class','active');
    active.removeAttribute('class','active');
    let todos = ls.getTodoList();
    document.querySelector('#theList').innerHTML = "";
    let count = 0;
    const completeTodos = ls.filterComplete();
    completeTodos.forEach(todo =>{
        const el = TODO.createTodoElement(todo);
        TODO.addToList(el);
        count++;
    });
    let counting  = document.getElementById('count');
    counting.innerHTML = count;
}

function viewActive(){
    completedGroup.removeAttribute('class','active');
    all.removeAttribute('class','active');
    active.setAttribute('class','active');
    document.querySelector('#theList').innerHTML = "";
    let todos = ls.getTodoList();
    let count = 0;
    const activeTodos = ls.filterActive();
    activeTodos.forEach(todo =>{
        const el = TODO.createTodoElement(todo);
        TODO.addToList(el);
        count++;
    });
    let counting  = document.getElementById('count');
    counting.innerHTML = count;
}

export default {
    loadData,
    viewCompleted,
    viewActive
}