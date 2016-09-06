$(document).ready(function() {

 // This is called with the results from from FB.getLoginStatus().
      statusChangeCallback = function(response) {
        console.log(response);
        console.log(_callback);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
            connectFbUser();
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
            connectFbUser(response, function() {
                checkUserDatabase();
            });
        });
      }


      /*

      window.fbAsyncInit = function() {
      FB.init({
        appId      : '367056473418282',
        cookie     : false,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.7' // use graph api version 2.7
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

*/
      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      connectFbUser = function(response, _callback) {
       console.log(response);
       console.log(_callback);
          if (response.status === "connected")
          {
                var url = '/me?fields=name,id,picture';
                FB.api(url, function(response) {
                    $("#loginFB-button").hide();
                    console.log('Successful login for: ' + response.name);
                  document.getElementById('status').innerHTML = "Bonjour " + response.name + " !";
                    $("#FBprofilImage").attr("src", response.picture.data.url);
                    $("#FacebookUser").attr("FbId", response.id);
                    $("#FacebookUser").attr("FbName", response.name);
                    console.log($("#FacebookUser").attr("FbId"));
                    var disconnectButton = $("<button>");
                    disconnectButton.attr("id","fbLogoutButton");
                    disconnectButton.html("Se déconnecter");
                    disconnectButton.on('click', function(){
                    fbLogoutUser()      });
                    $("#FBDiv").append(disconnectButton);
                    console.log($("#FacebookUser").attr("FbId"));
                    _callback();
                });
          }
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
    }


    function checkUserDatabase(){
			console.log($("#FacebookUser").attr("FbId"));

            $.ajax({
                type: 'get',
                url: "/rest/user/searchId/" + encodeURIComponent($("#FacebookUser").attr("FbId")),
                statusCode : {
                    200: function (data) {
                        if (!data){
                            addUserDatabase($("#FacebookUser").attr("FbName"));
                        }
                    }
                }
            });

    }

    function addUserDatabase(nameP){
        console.log(nameP);/*
        $.ajax({
            type: 'POST',
            url: "/rest/user/create",
            data: {name: nameP, fbId: fbIdP},
            statusCode: {
                201: function (data) {*/
    }
});

