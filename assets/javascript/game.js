// ======= NOTES TO FOLLOW ======= //
// Create a variable - array called topics
// The app should take the topics in this array and create buttons in your HTML
// Try using a loop that appends a button for each string in the array
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page
// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing
// Under every gif, display its rating (PG, G, so on)
// Add a form to your page takes the value from a user input box and adds it into your topics array 
// Then make a function call that 
// Takes each topic in the array remakes the buttons on the page


// Open Document Ready Function // 

$(document).ready(function() {

    var topics = {
        searchTerms: ["dogs","sports","cartoons","superheroes","cars","videogames"],
        createButtons: function() {
            for (var i = 0; i < topics.searchTerms.length; i++) {  // Create Buttons Function 
                var newBttn = $('<button>');
                newBttn.attr("data-search", topics.searchTerms[i]);
                newBttn.addClass("btn" + "");
                newBttn.addClass("searchButtons");
                newBttn.text(topics.searchTerms[i]);
                $('#searchButtonsContainer').append(newBttn);    
            }
        },
        addSearchTerms: function(e) {
          e.preventDefault();
          var userTerm = $('#submitBox').val();

          if (topics.searchTerms.indexOf(userTerm) < 0 && userTerm.length > 0) {
              topics.searchTerms.push(userTerm);
              var newBttn = $('<button>');
              newBttn.attr("data-search", userTerm);
              newBttn.addClass("btn");
              newBttn.addClass("searchButtons");
              newBttn.text(userTerm);
              $('#searchButtonsContainer').append(newBttn);
          }

        },
        displayResults: function(e) {
            $('#showGIFS').empty();
            e.preventDefault();

            var userQuery = $(this).data('search'); 
            var key = "&api_key=dc6zaTOxFJmzC";
            var limit = "&limit=15"
            var reqUrl = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;
            
            console.log(reqUrl);

            $.ajax({             // Ajax get call - response       
                url: reqUrl,
                method: "GET"
            }).done(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var gifContain = $('<div>');
                    gifContain.addClass('gifContainer');
                    var animateLink = response.data[i].images["fixed_height"].url;
                    var stillLink = response.data[i].images["fixed_height_still"].url;
                    var rating = response.data[i].rating;
                    console.log(rating);
                    var ratingSpan = $('<p>');
                    ratingSpan.addClass('gifRating');
                    ratingSpan.text("Rating: " + rating);
                    var newImg = $('<img>');
                    newImg.attr('src', stillLink);
                    newImg.attr('data-animate', animateLink);
                    newImg.attr('data-still', stillLink);
                    newImg.attr('data-state', "still")
                    newImg.addClass('gif');
                    gifContain.prepend(ratingSpan);
                    gifContain.append(newImg);

                    $('#showGIFS').append(gifContain);
                }

                $('.gif').on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr('src', $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr('src', $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        },

    }
    topics.createButtons();



    $('#submitTerm').click(topics.addSearchTerms);
    $(document).on('click', '.searchButtons', topics.displayResults);
});