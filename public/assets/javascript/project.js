$(document).ready(function () {
    initMap();
    //variables for Yelp API calls
    var term = '';
    var location = '';
    

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
                    console.log(response);
                    var name = response.name;
                    var location = response.location;
                    $("#results").append(name);
                    $("#results").append(location);
                });
            }
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