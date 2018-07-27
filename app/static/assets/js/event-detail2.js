$(document).ready(function(){

    /*var eventId = $("#eventDetail").attr('eventId');
    if(eventId){
        displayEvent(eventId);
    }*/

    displayEvent = function(eventId) {
    window.location.href = "/event/"+eventId;
        $.ajax({
            type : 'get',
            url : '/rest/event/searchId/'+ eventId,
            }).then(function(data) {
            if(data)
                {
                	console.log("Affichage de l'evenement : " + data.name);
                    $("#content").empty();

                    var labelName = $("<h1><u><div>");
                    labelName.attr("id", data.eventId);
                    labelName.append(data.name);
                    $("#content").append(labelName);

                    var labelStartDateTime = $("<p><label><b><u>");
                    labelStartDateTime.append(data.startDateTime)
                    $("#content").append(labelStartDateTime);

                    var labelDescription = $("<p><label><b><u>");
                    labelDescription.append(data.description)
                    $("#content").append(labelDescription);

                    var labelLocation = $("<p><label><b><u>");
                    labelLocation.append(data.location)
                    $("#content").append(labelLocation);

                    var labelCity = $("<p><label><b><u>");
                    labelCity.append(data.city)
                    $("#content").append(labelCity);

                    var labelType = $("<p><label><b><u>");
                    labelType.append(data.type)
                    $("#content").append(labelType);

                    var labelCountry = $("<p><label><b><u>");
                    labelCountry.append(data.country)
                    $("#content").append(labelCountry);

                    var labelOwner = $("<p><label><b><u>");
                    labelOwner.append(data.owner)
                    $("#content").append(labelOwner);
                }
            });
    }
});