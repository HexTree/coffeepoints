/* This script will handle the authentication of the identity of the users
 *
 */
 //ID scan
 //Mechanism for logging in via scanning an id
 function scanID()
 {
   cordova.plugins.barcodeScanner.scan
   (
     function(result)
     {
       if(result.format == "CODE_39"){
           var value = result.text;

           //MAke sure accounts Don't overlap
           if(window.localStorage.getItem("Identity") != result.text){

              //Wipe profile details if someone else is logging in.
              if(window.localStorage.getItem("Name")){
                  window.localStorage.removeItem("Name");
              }
           }
           window.localStorage.setItem("Identity", result.text);

           //Make sure local storage has the name
           if(!window.localStorage.getItem("Name")){
                navigator.notification.prompt(
                    // message
                    'Please enter your name',

                    // callback to invoke
                    function (input){

                      //Store profile data
                      window.localStorage.setItem("Name", input.input1);

                      //User is logged in
                      window.localStorage.setItem("Loggedin", "True");
                      window.localStorage.setItem("Type", "SCAN");
                      window.location.href = "home.html";
                    },

                    // title
                    'Profile',

                     // buttonLabels
                    ['Ok','Call me Greeny'],

                    // defaultText
                    'Greeny'
                );
           }
           else{
             //User is logged in
             window.localStorage.setItem("Loggedin", "True");
             window.localStorage.setItem("Type", "SCAN");
             window.location.href = "home.html";
           }


       }
       else if (!result.cancelled) {
         document.getElementById("message").innerHTML = "Message: You are scanning a " + result.format + ". Please scan a barcode, (They are at the back of your card!)";
       }
     },
     function(error)
     {
       //error callback
       document.getElementById("message").innerHTML = "Error: " + error;
     }
   );
 }

 //Google Auth
 function googleSignIn(){
   window.plugins.googleplus.login({
         'scopes': 'default', // optional space-separated list of scopes, the default is sufficient for login and basic profile info
       },
       function (obj) {
         window.location.href = "home.html";
         alert(JSON.stringify(obj)); // do something useful instead of alerting
       },
       function (msg) {
         alert('error: ' + msg);
       }
   );
 }
 function googleSignOut(){
     window.plugins.googleplus.logout(
     function (msg) {
        window.location.href = "index.html";
        }
     );
 }
