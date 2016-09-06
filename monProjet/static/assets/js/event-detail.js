$(document).ready(function(){

    var eventId = $("#eventDetail").attr('eventId');
    if(eventId){
        displayEvent(eventId);
    }

    function displayEvent(eventId) {
        $.ajax({
            type : 'get',
            url : '/rest/event/searchId/'+ eventId,
            }).then(function(data) {
            if(data)
                {
                    $("#name").append(data.name);
                    $("#startDateTime").append(data.startDateTime);
                    $("#description").append(data.description);
                    $("#location").append(data.location);
                    $("#city").append(data.city);
                    $("#type").append(data.type.name);
                    $("#country").append(data.country);
                    $("#owner").append(data.ownerName);
                }
            });
    }
});