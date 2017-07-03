$(document).ready(function(){

   // rechercher();
    function createTable(data){
		var table = $("<table>");
		var n=0;

		$.each(data, function(i, item) {
			n=n+1;
			var tr = $("<tr>");
			tr.attr("db-id",item.id);
			tr.attr("id","tr-view-"+i);
			var td = $("<td>");
			td.attr("id","td-view-"+i+"1");
			td.text(item.name);
			tr.append(td);
			var td2 = $("<td>");
			td2.attr("id","td-view-"+i+"2");
			td2.text(item.city);
			tr.append(td2);
			var td3 = $("<td>");
			td3.attr("id","td-view-"+i+"4");
			var viewButton = $("<button>");
			viewButton.attr("id","view-btn-"+i);
			viewButton.html("Voir");
			viewButton.attr("class","view-btn");

			viewButton.on('click', function(){
				var eventId = $(this).parent().parent().attr("db-id");
				window.location.href = "/event/"+eventId;
				/*
				$.getScript('/static/assets/js/event-detail.js', function() {
				    displayEvent(eventId);
				})
				*/
			});

			td3.append(viewButton);
			tr.append(td3);
			table.append(tr);
		});

		$('#msg').text("Il ya "+n+" evenement(s) correspondant à la recherche.");
		$("#content").append(table);
	}

    $('#search-event-form').submit(function(e){
        //Efface l'ancien contenue
        $("#content").empty();

        //On change l'URL sans le charger
        var newURL = window.location.protocol + "//" + window.location.host + "/search/" + $("#inputID").val() + "/";
        history.pushState( {path: this.path }, '', newURL);

        //création de la bar de message
        var info = $("<div>");
        info.attr("id", "msg");
        info.attr("style", "height: 30px; width: 800px; background: #e4e4e4");
        $("#content").append(info);

        rechercher();
        return false;
    });

      function rechercher(){
        $("#inputID").val($("#inputID").val().trim());
    	if($("#inputID").val()) {
			console.log("Search for : " + $("#inputID").val());
			$.ajax({
				type: 'get',
				url: "/rest/event/searchName/" + encodeURIComponent($("#inputID").val()),
				statusCode: {
					200: function (data) {
						createTable(data);
					},
					404: function (data, status, response) {
						$('#msg').text("Error 404");
					}
				}
			});
		   }
		}

});