console.log('js in');
$(document).ready(goQuery);

function goQuery(){
    console.log('jq in');
    $('#createButton').on('click', createList);
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
        url: '/task/',
        data: { objectIn }
    }).done(function(response){
       console.log(response);
    });
} // end of post