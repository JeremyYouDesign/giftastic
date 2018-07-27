var queries = ["mariah carey", "britney spears", "lady gaga", "lana del ray", "gwen stefani", "taylor swift"];
var searchQuery;

function displayGif() {
    var query = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=QxuyXh3t1krkKZpPg1nNAa5fxYTQJae0&limit=10";
    console.log("You searched " + query);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var title = results[i].title;
            var rating = results[i].rating;

            var p1 = $("<p>").text("Title: " + title);
            var p2 = $("<p>").text("Rating: " + rating);

            var image = $("<img>");
            image.addClass("gif");
            image.attr({
                "data-state": "still",
                "stillURL": results[i].images.fixed_height_still.url,
                "animateURL": results[i].images.fixed_height.url
            });
                
            gifDiv.append(image.attr("src", image.attr("stillURL")));
            (gifDiv).append(p1);
            (gifDiv).append(p2);
    
            $("#gif-div").prepend(gifDiv);
        }
    });
}

var renderButton = function() {
    $("#button-div").empty();

    for (var i = 0; i < queries.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-info gif-btn");
        a.attr("data-name", queries[i]);
        a.text(queries[i]);
        $("#button-div").append(a);        
    }
}

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    var searchQuery = $("#search-form").val().trim();
    queries.push(searchQuery);

    renderButton();
});

$(document).on("click", ".gif-btn", displayGif);

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("animateURL"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("stillURL"));
        $(this).attr("data-state", "still");
    }
});

renderButton();
console.log(queries);
