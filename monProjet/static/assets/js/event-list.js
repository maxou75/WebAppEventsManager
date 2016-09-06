/**
 * Created by Maxime on 27/07/2016.
 */
$(document).ready(function(){

	$.ajax({
		type: 'get',
		url: "/rest/event/list",
	}).then(function(data) {
		var table = $("<table>");

		$.each(data, function(i, item) {
			var tr = $("<tr>");
			var td = $("<td>");
			td.text(item.name);
			tr.append(td);
			var td2 = $("<td>");
			td2.text(item.description);
			tr.append(td2);
			var td3 = $("<td>");
        	td3.text(item.city);
			tr.append(td3);
			table.append(tr);
		});
		$("#table").append(table);
	});

});