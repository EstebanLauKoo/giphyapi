$(document).ready(function () {
    var queries = ['new york', 'bunny', 'turtles',]
    function displayButtons() {
        $('#queryButtonViewer').empty()
        for (var i = 0; i < queries.length; i++){
            var gifButton = $('<button>');
            gifButton.addClass('query');
            gifButton.addClass('btn btn-primary')
            gifButton.attr('data-name', queries[i])
            gifButton.text(queries[i])
            $('#queryButtonViewer').append(gifButton)

        }}
    function NewButton() {
        $('#addGif').on('click', function () {
            var query = $('#query-input').val().trim()

            if (query == "") {
                return false
                console.log('returned false')
            }

            queries.push(query)
            displayButtons()
            return false

        })
    }
    function displayGifs() {
        var query = $(this).attr('data-name')
        var queryUrl = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + query + "&api_key=dc6zaTOxFJmzC"
        $.ajax ({
            url: queryUrl,
            method: "GET"
        })
            .done(function (response) {
                $('#queryImgDisplay').empty()
                var results = response.data
                if (results == ""){
                    alert("There ain't no gifs homie")
                }
                console.log(response)
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    $("#queryImgDisplay").prepend(gifDiv);
                    console.log("this loop works")
            }})

    }
    displayButtons()
    NewButton()

    $(document).on("click", ".query", displayGifs)
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr("src", $(this).data('animate'))
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still')
        }
    })

})


