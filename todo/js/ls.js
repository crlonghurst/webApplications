function saveTodo(todo){
    const todoList = getTodoList();

    
    todoList.push(todo);
    localStorage.setItem('theList', JSON.stringify(todoList));
}

function deleteTodo(id){
    const toDoList = getTodoList();

    const updatedTodos = toDoList.filter(todo => todo.id != id);
    localStorage.setItem('theList', JSON.stringify(updatedTodos));

}

function filterComplete(){
    const todoList = getTodoList();

    const completeTodos = todoList.filter(todo => todo.completed == true);
    return completeTodos;
}

function filterActive(){
    const todoList = getTodoList();

    const activeTodos = todoList.filter(todo => todo.completed == false);
    return activeTodos;
}

function getTodoList() {
    const todoListString = localStorage.getItem('theList');
    let todoList = [];
    if (todoListString) {
        todoList = JSON.parse(todoListString);
    }
    return todoList;
}


function changeTodo(id){
    const todoList = getTodoList();

    todoList.forEach(todo =>{
        if(todo.id == id){
            todo.completed = true;
        }
    });

    localStorage.setItem('theList', JSON.stringify(todoList));
}


export default {
    saveTodo,
    deleteTodo,
    getTodoList,
    changeTodo,
    filterComplete,
    filterActive
}