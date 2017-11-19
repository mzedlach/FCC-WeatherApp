var url = "https://fcc-weather-api.glitch.me/api/current?"
var lat, long; 
// var key = "061e7b768525a32d246f44a29b887978"; 

$(document).ready(function() {
   if ("geolocation" in navigator) {
//If geolocation in navigator works, determine ulr based on latitude & longitute 
     navigator.geolocation.getCurrentPosition( function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        url = url + "lat=" + lat + "&lon=" + long; 
        console.log(url);
        
//Extract information from object recieved from API. Change html elements accordingly
        $.getJSON(url, function(json) {
            currentWeather = json.weather[0].description;
            currentLocation = json.name;
            currentTemp = json.main.temp;
           
            $("#temp").html(currentTemp);
            $("#descrip").html(currentLocation + "&nbsp;" + "has" + "&nbsp;" + currentWeather);

//Change background of website accourding to weather
            weatherID = json.weather[0].id;
            weatherImage(weatherID);
        });

//If units button is clicked 
//        1. Checks class of tempUnit ID
//        2. Changes to opposite class - celsius or farenheit
//        3. Changes text of button
//        4. Converts units 
//        5. If converted to *F - runs calculation to two decimal points
         
         $("#btn").on("click", function(){
           var tempCalculation; 
        
           if ($("#tempUnit").hasClass("celsius")) {
               $("#tempUnit").addClass("farenheit").removeClass("celsius");
               $("#tempUnit").html("&#8457");
               $("button").html("TO METRIC");
               tempCalculation = Math.round((currentTemp*(9/5)+32)*100)/100;
               $("#temp").html(tempCalculation);
           } else {
               $("#tempUnit").removeClass("farenheit").addClass("celsius");
               $("#tempUnit").html("&#8451");
               $("button").html("TO IMPERIAL");
               $("#temp").html(currentTemp);
           };
         });             
     });
       
   } else {
//If gelocation data does NOT work in navigator, change all text to following:
     $("#content").html("Your browser does not support geolocation");
   };
    
    function weatherImage(weatherID) {
        if (weatherID >=200 && weatherID < 300) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/thunderstorm.jpeg)");
        } else if (weatherID >= 300 && weatherID < 400) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/misty.jpeg)");
        } else if (weatherID >= 500 && weatherID < 600) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/rain.jpeg)");
        } else if (weatherID >= 600 && weatherID < 700) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/snow.jpeg)");
        } else if (weatherID >= 700 && weatherID < 800) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/atmosphere.jpeg)");
        } else if (weatherID > 800 && weatherID < 900) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/clouds.jpeg)");
        } else if (weatherID >= 907 && weatherID < 961) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/windy.jpeg)");
        } else if (weatherID === 800) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/clear.jpeg)");
        } else if (weatherID === 903) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/cold.jpeg)");
        } else if (weatherID === 904) {
            $("#background").css("background-image", "url(https://s3.eu-central-1.amazonaws.com/photos-for-fcc-projects/hot.jpeg)");
        } 
        
    }
});


    