$(document).ready(function () {
    initMap();
    
    //variables for Yelp API calls
    var term = '';
    var location = '';
    var name = '';
    var city = '';
    var longitude = '';
    var latitude = '';

    

    //search onclick that grabs values and stores from term and location
    $("#search").on("click", function (event) {
        location = $("#locationInput").val().trim();
        term = $("#termInput").val().trim();
        yelpAPI();
        searchMap()
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
                    var nameResult = $("<a>")
                    
                    resultsDiv.attr('class', 'selectedRes border-solid border-2 mt-1 border-black')
                    nameResult.append(name);
                    resultsDiv.attr('data-longitude', response.coordinates.longitude);
                    resultsDiv.attr('data-latitude', response.coordinates.latitude);
                    resultsDiv.append(nameResult);
                    $("#results").append(resultsDiv);
                });
                clickSelection();
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
        console.log(mapLatitude);
        console.log(mapLongitude);
    });
   }

  
    //google map API js
    

    var map
    var slc = {lat: 40.7608, lng: -111.8910};
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7608, lng: -111.8910},
        zoom: 8
      });
    }

    function searchMap() {
        // The location of Uluru
        var searchLocation = {lat: 41.7608, lng: -115.8910}
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 4, center: slc});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: searchLocation, map: map});
      }
    
   
});