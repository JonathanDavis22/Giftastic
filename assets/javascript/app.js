$(document).ready(function() {

// Set initial array for queries.
let persons = ["The Beatles", "Nirvana", "Velvet Underground"]

// For loop to create buttons from array.
for (var i = 0; i < persons.length; i++) {
    let button = $("<button>");
    button.addClass("gif-button");
    button.attr("data-band", persons[i]);
    button.text(persons[i]);
    $("#buttons-display").prepend(button);
}

$(document).on('click', ".gif-button", function(){
    $("#gifs-appear-here").empty();
    var person = $(this).text();
    console.log(person);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person +
    "&api_key=dc6zaTOxFJmzC&limit=15";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {

        var results = response.data;

        for (var i = 0;  i < results.length; i++) {
          
          let animated = results[i].images.fixed_height.url;
          let still = results[i].images.fixed_height_still.url;

          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var personImage = $("<img>");
          
          personImage.attr("src", animated);

          personImage.attr("state", "a");
          personImage.attr("still", still);
          personImage.attr("animated", animated);
          personImage.attr("src", animated);
          
          gifDiv.prepend(p);
          gifDiv.prepend(personImage);
          $("#gifs-appear-here").prepend(gifDiv);
        };
      })
    });

    $("#add-person").on("click", function(event) {
      event.preventDefault();
      var person = $("#person-input").val().trim();
      console.log(person);
      persons.push(person);
      newButton(person);
    });

    function newButton(person) {
        var btn = $("<button>");
        btn.addClass("gif-button");
        btn.text(person);
        $("#buttons-display").append(btn);
    }

   $(document).on("click", "img", function() {
     console.log("working");

     let state = $(this).attr("state");
     
     if (state === "a") {
      $(this).attr("state", "s");
      $(this).attr("src", $(this).attr("still"));
    } else if (state === "s") {
      $(this).attr("state", "a");
      $(this).attr("src", $(this).attr("animated"));
    }
   });

});