// chris - variable that will be part of limiting result selection to three
var resultsSelect = 0;

// chris - variable used for timer function
var time = 179; // chris - time has to be 1 second less than the time you want to display
var minutes = Math.trunc(time / 60);
var seconds = time % 60;
var timeString = minutes + ":" + seconds;
var intervalId;

$(document).ready(function () {
    //variables for Yelp API calls
    var term = '';
    var location = '';
    var name = '';
    var city = '';
    var longitude = '';
    var latitude = '';
    // initMap();   
    geoInitialize()
    //Global variables for map functions:
    var map

    // chris - used to display 3:00 for timer div
    $("#timer").html("3:00");

    //search onclick that grabs values and stores from term and location
    $("#search").on("click", function (event) {
        location = $("#locationInput").val().trim();
        term = $("#termInput").val().trim();
        yelpAPI();
        geoFirstClick()
        console.log(location);
        console.log(term);
    });
  

    //Ajax Call for Yelp API
    function yelpAPI() {
        var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location;

        $.ajax({
            url: queryUrl,
            headers: {
                'Authorization': 'Bearer u5IOLfLv5NDHJQEgaAnpyOMD904ThILvNdDS5ldBH2VX7a3fuCvRX6MEASunCHQEofphTnitG_YdiO9-pN9xcEDs11XZcbbqRYaIotN0SmE0ySvkvThDNCt7TxmWXXYx',
            },
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $.each(data.businesses, function (i, response) {
                    // console.log(response);
                    name = response.name;
                    location = response.location;
                    city = response.location.city;
                    longitude = response.coordinates.longitude;
                    latitude = response.coordinates.latitude;
                    var resultsDiv = $("<div>");
                    
                    // chris - checkbox code
                    var label = $("<label>");
                    var checkbox = $("<input>");
                    var span = $("<span>");

                    checkbox.attr("type", "checkbox", "class", "ml-1 form-checkbox", "checked", "false");
                    span.attr("class", "ml-2");

                    label.append(checkbox);
                    label.append(span);

                    // chris - code that tracks the amount of results selected
                    checkbox.on("click", function (event)
                    {
                        console.log("Restaurant selected");
                        if ($(this).prop("checked") === true)
                        {
                            if (resultsSelect >= 3)
                            {
                                checkbox.prop("checked", false);
                                // chris - enables Begin Poll button once 3 restaurant options are selected
                                $("#beginPollBtn").removeClass("opacity-50 cursor-not-allowed")
                            }
                            else
                            {
                                resultsSelect++;
                                // chris - disables Begin Poll button until 3 restaurant options are selected
                                $("#beginPollBtn").addClass("opacity-50 cursor-not-allowed")
                            }
                        }
                        else
                        {
                            resultsSelect--;
                            // chris - disables Begin Poll button until 3 restaurant options are selected
                            $("#beginPollBtn").addClass("opacity-50 cursor-not-allowed")
                        }

                        console.log(resultsSelect);

                        //This is required or else 4 clicks on different boxes is needed to get the button to light up.
                        if (resultsSelect === 3)
                        {
                            $("#beginPollBtn").removeClass("opacity-50 cursor-not-allowed")
                        }
                    });
                    
                    //var nameResult = $("<a>")
                    resultsDiv.attr('class', 'selectedRes border-solid border-2 mt-1 border-black')
                    //nameResult.append(name);
                    // chris - changed to span.append from nameResult.append
                    span.append(name);
                    resultsDiv.attr('data-longitude', response.coordinates.longitude);
                    resultsDiv.attr('data-latitude', response.coordinates.latitude);
                    resultsDiv.attr('data-name', response.name);
                    // chris - changed append to label from nameResult
                    resultsDiv.append(label);
                    $("#results").append(resultsDiv);
                });
                clickSelection();
                geoMarker();
            }
        });

    }


    //click function that currently console.logs the latitude and longitude of the selected location
    var mapLongitude = '';
    var mapLatitude = '';


   function clickSelection(){
    $('.selectedRes').on("click", function () {
        mapLongitude = $(this).attr('data-longitude')
        mapLatitude = $(this).attr('data-latitude')
        name = $(this).attr('data-name')
        geoMarker()
        console.log(mapLatitude);
        console.log(mapLongitude);
    });
   }

  
    //google map API js

      function geoInitialize() {
        // Create a map centered in SLC.
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7608, lng: -111.8910 },
            zoom: 15
        });
    }

    function geoFirstClick(city) {

        var geoApiKey = 'AIzaSyCK4EWTo5MHbt_OTstSiYYGKw5twoR8xuk'
        var geoQueryUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + geoApiKey;

        console.log(geoQueryUrl)

        $.ajax({
            url: geoQueryUrl,
            method: "GET"
        }).then(function (response) {

            var geoResponse = response.results[0].geometry.location

            geoFirstClickUpdate(geoResponse)
        });
    }


    function geoFirstClickUpdate(geoResponse) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: geoResponse,
            zoom: 15
        });
    }

    function geoMarker() {
        // CURRENTLY: will add pin for roosters brewery in OGDEN. CITY SEARCH: OGDEN to test.
        var request = {
            location: map.getCenter(),
            radius: '1000',
            query: name
        };

        console.log(request)
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);


        // Checks that the PlacesServiceStatus is OK, and adds a marker
        // using the place ID and location from the PlacesService.
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    place: {
                        placeId: results[0].place_id,
                        location: results[0].geometry.location
                    }
                });
            }
        }
    }

    // chris - functions that starts time when start timer button is clicked. this will be tweaked when the polling section works.
    $("#startTimer").on("click", function (event)
    {
        clearInterval(intervalId);
        intervalId = setInterval(countDown, 1000);
    });


   
});

// chris - function that handles timer when polling is open
function countDown()
{
    $("#timer").html(timeString);
    console.log(timeString);

    if(time <= 0)
    {
        clearInterval(intervalId);
        $("#timer").html("0:00");
        console.log("time's up!")
        // chris - this function below isn't built yet, it will display poll results when time hits zero.
        //voteResult();
    }

    time--;
    minutes = Math.trunc(time / 60);
    seconds = time % 60;
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
    timeString = minutes + ":" + seconds;

}