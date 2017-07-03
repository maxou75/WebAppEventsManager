$(document).ready(function() {

    displayTypes();

    function displayTypes(){
		$.ajax({
            type: 'get',
            url: "/rest/event/types",
            statusCode: {
                200: function (data) {
                    $.each(data, function(i, item) {
                        var button = $("<button>");
                        button.attr("id", item.id);
                        button.html(item.name);
                        button.on('click', function(){
                              searchEventsByType(item.id)});
                        $("#typesSearch").append(button);
                    });
                },
                404: function (data, status, response) {
                }
            }
			});
	}

	function searchEventsByType(type){
        var city = $("#userLocation").val();
        $.ajax({
            type: 'get',
            url: "rest/event/searchEventCityType/city/type",
            statusCode: {
                200: function(data) {
                },
                404: function(data) {
                }
            }
        })
	}
});