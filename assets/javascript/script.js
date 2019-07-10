// Movie Array
var movieArr = ["Serial Mom", "Heathers", "Jawbreaker", "Superstar", "Child's Play"," National Lampoon's Vacation", "Airplane", "Animal House",
                  "Naked Gun", "The Meaning of Life", "Dumb and Dumber", "The Weather Man", "Dazed and Confused", "White Chicks",
                  "Trick 'r Treat", "The Burbs", "American Psycho", "American Beauty", "Seven Psychopaths",
                  "Office Space", "Dodgeball", "Scream", "It Follows", "Rushmore", "Slums of Beverly Hills", "The Jerk", 
                  "Caddyshack", "Dogma", "Sleepaway Camp", "Nightmare on Elm Street", "A Night at the Roxbury"];

// Creates buttons for movies
function renderButtons() {
  // Empty the buttons panel 
  $("#buttonPanel").empty();

  // Loop through the array of movies
  for (var i = 0; i < movieArr.length; i++) {
    // Buttons for movies in array
    var button = $("<button>");
    button.addClass("movieButton");
    button.attr("movie-data", movieArr[i]);
    button.text(movieArr[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}


// Add movie to array
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  var movie = $("#movie").val().trim();
  movieArr.push(movie);
  $("#movie").val("");
  renderButtons();
});

// Get movie Gifs from API
function fetchMovieGifs() {
  var movieName = $(this).attr("movie-data");
  var movieStr = movieName.split(" ").join("+");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieStr + 
                 "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

  // AJAX GET request
  $.ajax({
    method: "GET",
    url: queryURL,
  })

  .done(function( result ) {
    var dataArray = result.data;
    // Ratings
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("movieGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#gifPanel").append(newDiv);
    }
  });
}

// Animate and still Gifs
function animateMovieGif() {
  var state = $(this).find("img").attr("data-state");

  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Puts movie buttons on page
$(document).ready(function() {
  renderButtons();
});

// Gets Gifs appropriate Gifs
$(document).on("click", ".movieButton", fetchMovieGifs);

// Animate Gifs
$(document).on("click", ".movieGif", animateMovieGif);