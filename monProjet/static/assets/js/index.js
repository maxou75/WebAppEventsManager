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
                                  });
                            $("#types").append(button);
		                });
					},
					404: function (data, status, response) {
					}
				}
			});
	}
});