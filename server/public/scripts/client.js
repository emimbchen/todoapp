console.log('js in');
$(document).ready(goQuery);

function goQuery(){
    console.log('jq in');
    $('#createButton').on('click', createList);
    getTasks();
    $('#listContainer').on('click', '.addButton', addTask);
}

//function to create a task, send to database, append to dom
function addTask(){
    console.log('button clicked');
    var task = $(this).prev().prev().val();
    var date =  $(this).prev().val();
    var listId = $(this).data('list');
    var taskObject = {
        list: listId,
        complete: false,
        task: task,
        title: false,
    }
    getTasks();
}

//function to create list when #createButton is pressed
function createList(){
    //get value from input
    var listName = $("#listname").val();
    $('#listname').val('');
    var listObject = {
        list: listName,
        title: true,
    }
    postData(listObject);
    getTasks();
}

//function to post data to server
function postData(objectIn){
    $.ajax ({
        method: 'POST',
        url: '/task',
        data: { objectIn }
    }).done(function(response){
       console.log(response);
    });
}

//function to get data from server
function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/task',
    }).done(function(response){
        console.log(response);
        //append list names and tasks
        appendAll(response);
    });
}

//delete entire list
function deleteButton(){

}

// html and bootstrap
var hideButton = '<button class="btn hideButton">Hide List</button>'
var deleteButton = '<button class="btn btn-danger deleteButton">Delete</button>'
var createButton = '<button class="btn btn-success createButton">Create Task</button>'
// for add button after taskInput '<button class= "addButton btn btn-primary" data-list =' + array[i].list + '>Create</button></div>';
//takes in array appends all to DOM
function appendAll(array){
    for (var i = 0; i < array.length; i++){
        if (array[i].title == true){
            $('#listContainer').append('<div id='+ array[i].id + '><form class="form-inline><div class="form-group"><h3>'+ array[i].list +'</h3>' + hideButton + deleteButton + '</div> <div class="form-inline"><input type="text">' + createButton+ '</div></form></div>');
        }
        else {
            $('#'+ array[i].list).append('<div class="form-check"><label class="form-check-label"><input class ="form-check-input" type="checkbox" value="">'+ array[i].task +'</label></div>');
        }
    }
}


