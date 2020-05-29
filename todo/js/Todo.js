import utils from './utils.js';
import ls from './ls.js';

document.querySelector('#btnadd').onclick = newTodo;
window.addEventListener('load', loadTodos);
let completedGroup = document.getElementById('completed');
completedGroup.addEventListener('click', utils.viewCompleted);
let all = document.getElementById('all');
all.addEventListener('click', utils.loadData);
let active = document.getElementById('active');
active.addEventListener('click', utils.viewActive);


function newTodo(){
    const todo = createTodo();
    const todoDiv = createTodoElement(todo);
    addToList(todoDiv);
    ls.saveTodo(todo);
    loadTodos();
}

function createTodo(){
    const input = document.querySelector('#todoInput');
    const newTodo = { id: Date.now(), content: input.value, completed: false}
    input.value = '';
    return newTodo;
}

function createTodoElement(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('id', todo.id);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('btn-info');
    completeBtn.setAttribute('data-id', todo.id);
    completeBtn.onclick = editTodo;

    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');
    if(todo.completed == true){
        completeBtn.innerHTML = '&#10004;';
        todoContent.classList.add('completed');
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerText = "X";
    deleteBtn.onclick = deleteTodo;

    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
}

function editTodo(e){
    const completed = e.currentTarget;
    ls.changeTodo(completed.getAttribute('data-id'));
    document.querySelector('#theList').innerHTML = '';
    loadTodos();
}


function addToList(todoDiv){
    document.querySelector('#theList').appendChild(todoDiv);
}


function deleteTodo(e){
    const btn = e.currentTarget;
    ls.deleteTodo(btn.getAttribute('data-id'));
    document.querySelector('#theList').innerHTML = '';
    loadTodos();
}

function loadTodos(){
    completedGroup.classList.remove('active');
    all.classList.add('active');
    active.classList.remove('active');
    document.querySelector('#theList').innerHTML = '';
    const todoList = ls.getTodoList();

    let count = 0;
    todoList.forEach(todo =>{
        const el = createTodoElement(todo);
        addToList(el);
        count++;
    });
    let counting  = document.getElementById('count');
    counting.innerHTML = count;
}




export default{
    loadTodos,
    addToList,
    createTodoElement
}