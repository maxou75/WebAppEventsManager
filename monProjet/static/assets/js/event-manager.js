/**
 * Created by Maxime on 23/07/2016.
 */
$(document).ready(function(){

    getAllTypes($("#type"));

    showEventsCreated = function() {
        $("#facebookEvent").show();
        var url = 'me?fields=events{owner,name,start_time,end_time,place,description}';
        FB.api(url, function(response) {
            console.log("display FB events for current user.");
            var userId = response.id;
            var n = 0;
            var table = $("<table>");
            $.each(response.events.data, function (i, item) {
                if (item.owner.id == userId) {
                    n = n + 1;
                    var tr = $("<tr>");
                    tr.attr("fb-id", item.id);
                    tr.attr("id", "tr-view-" + i);
                    var td = $("<td>");
                    td.attr("id", "td-view-" + i + "1");
                    td.text(item.name);
                    tr.append(td);
                    var td2 = $("<td>");
                    td2.attr("id", "td-view-" + i + "2");
                    td2.text(item.place.name + ", " + item.place.location.city + ", " + item.place.location.country);
                    tr.append(td2);
                    var td3 = $("<td>");
                    td3.attr("id", "td-view-" + i + "3");
                    td3.text(item.start_time);
                    tr.append(td3);
                    var td4 = $("<td>");
                    td4.attr("id", "td-view-" + i + "4");
                    var td5 = $("<td>");
                    td5.attr("id", "td-view-" + i + "5");
                    $.ajax({
                        type: 'get',
                        url: "/rest/event/searchFbId/" + item.id,
                    }).then(function (data) {
                        //data ==null : L'evenement n'existe pas en base
                        if (!data) {
                            //Select
                            var select = $("<select>");
                            select.attr("id", "select-type-" + i);
                            select.attr("name", "select-type-" + i);
                            getAllTypes(select);
                            td4.append(select);
                            //Import Button
                            var importButton = $("<button>");
                            importButton.attr("id", "import-btn-" + i);
                            importButton.html("Importer");
                            importButton.attr("class", "import-btn");
                            importButton.on('click', function () {
                                var fbId = $("#tr-view-" + i).attr("fb-id");
                                var typeSelected = $("#select-type-"+i).val();
                                //importEvent(fbId, typeSelected);
                                addEvent(item.name, item.id, item.start_time, item.description, item.place.name, item.place.location.city, item.place.location.country, item.owner.id, typeSelected);
                                showEventsCreated();
                            });
                            td5.append(importButton);
                        }
                        else { //data!=null : l'evenement existe deja en base
                            td4.text(data.type.name);
                            td5.text("Evenement déjà importé !");
                        }
                    });
                    tr.append(td4);
                    tr.append(td5);
                    table.append(tr);
                }
            });
            $("#table").empty();
            $("#table").append(table);
        });
    }


    function getAllTypes(select){
        $.ajax({
            type:'GET',
            url : '/rest/event/types'
        }).then(function(data) {
            $.each(data, function(i, item) {
                var option = $("<option>");
				option.attr("value",item.id);
				option.append(item.name);
				select.append(option);
            })
        })
    }


    $('#create-event-form').submit(function(e) {
        //Remet par défault le style, enleve le rouge si il yavait
        $("#name").attr("style", "");
        $("#startDate").attr("style", "");
        $("#startTime").attr("style", "");
        $("#description").attr("style", "");
        $("#location").attr("style", "");
        $("#city").attr("style", "");
        $("#country").attr("style", "");
        //trim les valeurs afin d'enlever les espaces
        var nameInput = $("#name").val($("#name").val().trim()).val();
        var startDateInput = $("#startDate").val();
        var startTimeInput = $("#startTime").val();
        var descriptionInput = $("#description").val($("#description").val().trim()).val();
        var locationInput = $("#location").val($("#location").val().trim()).val();
        var cityInput = $("#city").val($("#city").val().trim()).val();
        var countryInput = $("#country").val($("#country").val().trim()).val();
        var facebookUserId = $("#FacebookUser").attr("FbId");
        var facebookUserName = $("#FacebookUser").attr("FbName");
        var type = $("#type").val();
        if (nameInput && startDateInput && startTimeInput && descriptionInput && locationInput && cityInput && countryInput) {
            var startDateTimeInput=startDateInput + "T" + startTimeInput + ":00";
            addEvent(nameInput, null, startDateTimeInput, descriptionInput, locationInput, cityInput, countryInput, facebookUserId, type);
        }
        else {
            $('#msg').text("Veuillez compléter le(s) champ(s) suivant(s) : ");
            if (!nameInput) {
                $("#name").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Name ");
            }

            if (!startDateInput) {
                $("#startDate").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Date de début ");
            }

            if (!startTimeInput) {
                $("#startTime").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Heure de début ");
            }

            if (!descriptionInput) {
                $("#description").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Description ");
            }

            if (!locationInput) {
                $("#location").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Lieu ");
            }

            if (!cityInput) {
                $("#city").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Ville ");
            }

            if (!countryInput) {
                $("#country").attr("style", "border: 2px solid #ff0000");
                $('#msg').append("Pays ");
            }
        }

    return false;
    });

   function addEvent(nameP, fbIdP, startDateTimeP, descriptionP, locationP, cityP, countryP, ownerIdP, typeP) {
        console.log(ownerIdP);
        $.ajax({
            type: 'post',
            url: "/rest/event/create",
            data: {name: nameP, fbId: fbIdP, startDateTime: startDateTimeP, description: descriptionP,
                location: locationP, city: cityP, country: countryP, owner: ownerIdP, type : typeP},
            statusCode: {
                201: function (data) {
                    console.log(data);
                    $('#msg').text("Evenement " + data.name + " créé avec pour début : " + data.startDateTime);
                    $("#name").val('');
                    $("#startDate").val('');
                    $("#startTime").val('');
                    $("#description").val('');
                    $("#location").val('')
                    $("#city").val('');
                    $("#country").val('')
                },
                400: function (data, status, response) {
                    $('#msg').text(data.responseJSON);
                }
            }
        });
    }

});