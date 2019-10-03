$(document).ready(function () {

    //variables for Yelp API calls
    var term = '';
    var location = '';


    //search onclick that grabs values and stores from term and location
    $("#search").on("click", function (event) {
        location = $("#locationInput").val().trim();
        term = $("#termInput").val().trim();
        yelpAPI();
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

    //End Document Ready
});