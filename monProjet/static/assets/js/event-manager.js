/**
 * Created by Maxime on 23/07/2016.
 */
$(document).ready(function(){
/*
    // This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
            connectFbUser();
            showEventsCreated();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
      }

      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
      checkLoginState = function () {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

      window.fbAsyncInit = function() {
      FB.init({
        appId      : '367056473418282',
        cookie     : false,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.7' // use graph api version 2.5
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
      });

      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function connectFbUser() {
        console.log('Welcome!  Fetching your information.... ');
          var url = '/me?fields=name,id,picture';
        FB.api(url, function(response) {
            $("#loginFB-button").hide();
            console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML = "Bonjour " + response.name + " !";
            $("#FBprofilImage").attr("src", response.picture.data.url);

			$("#FacebookUser").attr("FbId", response.id);
			$("#FacebookUser").attr("FbName", response.name);
            var disconnectButton = $("<button>");
            disconnectButton.attr("id","fbLogoutButton");
            disconnectButton.html("Se déconnecter");
            disconnectButton.on('click', function(){
            fbLogoutUser()      });
            $("#FBDiv").append(disconnectButton);
        });
      }


    function fbLogoutUser()
    {
        FB.getLoginStatus(function (ret) {
           /// are they currently logged into Facebook?
            if (ret.authResponse) {
                //they were authed so do the logout
                FB.logout(function (response) {
                 ///   FB.Auth.setAuthResponse(null, 'unknown');
                    console.log('Logout from FB ...');
                    document.location.reload();
                });
            }
        });
    }*/

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