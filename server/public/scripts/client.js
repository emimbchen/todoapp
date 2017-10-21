console.log('js in');
$(document).ready(goQuery);

function goQuery(){
    console.log('jq in');
    $('#createButton').on('click', createList);
    getTasks();
    $('#listContainer').on('click', '.addButton', addTask);
}

// html and bootstrap
var deleteButton = "<button class='btn btn-danger'>Delete List</button>";
var taskAndButton = "<div class = 'form-group'><input type='text'><button class= 'addButton btn btn-primary'>Create</button></div>";
//function to create a task, send to database, append to dom
function addTask(){
    console.log('button clicked');
    var task = $(this).prev().val();

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
        //append list names and tasks
        appendAll(response);
    });
}
//takes in array appends all to DOM
function appendAll(array){
    for (var i = 0; i < array.length; i++){
        if (array[i].title == true){
            $("#listContainer").prepend('<div id=' + array[i].list + '><div class="form-group"><label>' + array[i].list + '</label>' + deleteButton + '</div>' + taskAndButton+ '</div>');
        }
        else {
            $("#", array[i].list).prepend<('<input class= "messageCheckbox" type="checkbox" value=' + array[i].id + '>' );
        }
    }
}

