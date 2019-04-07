// import { updateTodo } from "../helpers/todos";
// let theme = document.querySelector('.theme');
// let theme = document.getElementsByName('theme');
let dark = document.querySelector('#dark');
let light = document.querySelector('#light');
let body = document.body;

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
        alert("Oops! something went wrong");
    })

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    })

    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    })

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    })
});

function addTodos(todos) {
    // add todos to page
    todos.forEach(function(todo){
        addTodo(todo);
    })   
}

function createTodo(){
    // send request to create new todo
    const userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .catch(function(err){
        console.log(err);
    })
}

function addTodo(todo) {
    const newTodo = $('<li class="task">' + todo.name + ' <span>x</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function removeTodo(todo){
    const clickedId = todo.data('id');
    const deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    const updateUrl = '/api/todos/' + todo.data('id');
    const isDone = !todo.data('completed');
    const updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
    .catch(function(err){
        console.log(err);
    })
}

dark.addEventListener('click', function(){
    console.log('clicked');
    body.classList.remove('dark');
    body.classList.add('dark');    
});

light.addEventListener('click', function(){
    console.log('clicked');
    body.classList.add('dark');
    body.classList.remove('dark');    
});

   