console.log('js in');
$(document).ready(goQuery);

function goQuery() {
    console.log('jq in');
    $('#createButton').on('click', createList);
    getTasks();
    $('#listContainer').on('click', '.createButton', addTask);
    $('#listContainer').on('click', '.deleteButton', deleteButton);
    $('#listContainer').on('click', '.hideButton', hidButton)
    $("#listContainer").on('click','.form-check-label', doneUpdate);

}

//update checked boxes events
function doneUpdate() {
    var checkBox = $(this).children()[0];
    var checkedId = $(this).attr('id');
    if(checkBox.checked){
    $.ajax({
        method: 'PUT',
        url: '/task/' + checkedId,
        data: {
            complete: true
        }
    }).done(function(response){
        console.log(response);
        getTasks();
    });
    } else {
        $.ajax({
            method: 'PUT',
            url: '/task/' + checkedId,
            data: {
                complete: false
            }
        }).done(function (response) {
            console.log(response);
            getTasks();
        })
    }
}

//function to create a task, send to database, append to dom
function addTask() {

    var task = $(this).prev().val();
    $(this).prev().val("");
    console.log(task);
    var listId = $(this).parent().parent().attr('id');
    console.log(listId)
    var taskObject = {
        complete: false,
        task: task,
        title: false,
        listid: listId
    }
    postData(taskObject);
}

//function to create list when #createButton is pressed
function createList() {
    //get value from input
    var listName = $("#listname").val();
    $('#listname').val('');
    var listObject = {
        list: listName,
        title: true,
    }
    postData(listObject);
}

//function to post data to server
function postData(objectIn) {
    $.ajax({
        method: 'POST',
        url: '/task',
        data: { objectIn }
    }).done(function (response) {
        console.log(response);
        getTasks();
    });
}

//function to get data from server
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/task',
    }).done(function (response) {
        //append list names and tasks
        appendAll(response);
    });
}

//delete entire list
function deleteButton(evt) {
    evt.preventDefault();
    var id = $(this).parent().parent().attr('id');
    $.ajax({
        method: 'DELETE',
        url: '/task/' + id
    }).done(function (response) {
        console.log(response);
        getTasks();
    })
}

//hide list
function hidButton(evt) {
    evt.preventDefault();
    var hide = $(this).parent().parent().next();
    $(hide).toggle();
}


// for add button after taskInput '<button class= "addButton btn btn-primary" data-list =' + array[i].list + '>Create</button></div>';
//takes in array appends all to DOM

function appendAll(array) {
    // html and bootstrap
    var hideButton = '<button class="btn hideButton">Hide List</button>'
    var delButton = '<button class= "btn btn-danger deleteButton"> Delete </button>'
    var createButton = '<button class="btn btn-success createButton">Create Task</button>'
    $('#listContainer').empty();
    
    for (var i = 0; i < array.length; i++) {
        if (array[i].title == true) {
            $('#listContainer').append('<div id="'+ array[i].id +'"><form class="form-inline><div class="form-group"><h3>' + array[i].list + '</h3>' + hideButton + delButton + '</div> <div id= "' + array[i].id + '"><div class="'+ array[i].id +' form-inline"><input type="text">' + createButton + '</div></form></div>');
        }
        else {
            if(array[i].complete == true){
                $('.' + array[i].listid).append('<div class="form-check"><label id="' + array[i].id + '"class="form-check-label"><input checked class ="form-check-input" type="checkbox" value="">' + array[i].task + '</label></div>');

            }else {
            $('.' + array[i].listid).append('<div class="form-check"><label id="'+ array[i].id+'"class="form-check-label"><input class ="form-check-input" type="checkbox" value="">' + array[i].task + '</label></div>');
            }
        }
    }
}
