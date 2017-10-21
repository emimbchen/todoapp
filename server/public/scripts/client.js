console.log('js in');
$(document).ready(goQuery);

function goQuery(){
    console.log('jq in');
    $('#createButton').on('click', createList);
    getTasks();
    $('#listContiner').on('click', '.addButton', addTask);
}

function addTask(){
    
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
    var deleteButton = "<button class='btn btn-danger'>Delete List</button>";
    var taskAndButton = "<input type='text'><button class= 'addButton btn btn-primary'>Create</button>";
    for (var i = 0; i < array.length; i++){
        if (array[i].title == true){
            $("#listContainer").prepend('<div class= "list form-inline" id=' + array[i].list + '><label>' + array[i].list + '</label>' + deleteButton + taskAndButton+ '</div>');
        }
        else {
            $("#", array[i].list).prepend<('<input class= "messageCheckbox" type="checkbox" value=' + array[i].id + '>' );
        }
    }
}