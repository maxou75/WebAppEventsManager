$(document).ready(function(){

    var userId = $("#userDetail").attr('userId');
    if(userId){
        displayUser(userId);
    }

    function displayUser(userId) {
        $.ajax({
            type : 'get',
            url : '/rest/user/searchId/'+ userId,
            }).then(function(data) {
            if(data)
                {
                    $("#name").append(data.name);
                }
            });
    }
});