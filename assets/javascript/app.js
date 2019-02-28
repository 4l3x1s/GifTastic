
var topics = ["Casablanca","The Godfather","Forbidden Games","Rashomon","In The Mood For Love","Alphaville","Breathless","Wings (1927)","It Happened One Night","Gone with the Wind (1939)"];
	
var button;
var newTopic = "";

// function to create new buttons from the topics array
var buttonGenerator = function () {
	// the previous div elements are emptied 
	$("#buttonArea").empty();
	// loops through the array and creates buttons
	for (i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data", topics[i]);
		$("#buttonArea").append(button);
	};
}

// The user clicks on a generated button, which generates 10 gifs from the GIPHY API and places them on the page. 
$("#buttonArea").on("click", ".btn", function () {
	var thing = $(this).attr("data");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=dc6zaTOxFJmzC&limit=10";


	$.ajax({
		url: queryURL,
		method: "GET"

	}).done(function (response) {
		console.log(response);

		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			// A div is created to hold a gif
			var topicDiv = $("<div>");

			// Under every gif, display its rating (PG, G,...)
			var p = $("<p>");
			p.text(results[i].rating);
			var p = $("<p>").text("Rating: " + results[i].rating);

			// Add a CSS style that fade in the gifs
			var topicImage = $("<img>").fadeIn(3000);

			// Add states of animate and still which will be toggled 
			topicImage.attr("src", results[i].images.fixed_height_still.url);
			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
			topicImage.attr("data-animate", results[i].images.fixed_height.url)
			topicImage.attr("data-state", "still")
			topicImage.addClass("gif");

			// Image is appended to the div
			topicDiv.append(topicImage);
			// Rating is appended to the div below the gif
			topicDiv.append(p);
			// New images will be placed at the beginning (top) of the containing gif area
			$("#gifArea").prepend(topicDiv);
		}
	})
})


// When the mouse pointer enters the gifArea, the gif changes its state to animate.
$("#gifArea").on("mouseenter", ".gif", function (event) {
	event.preventDefault();
	var state = $(this).attr("data-state");
	$(this).attr("src", $(this).attr("data-animate"));
	$(this).attr("data-state", "animate");
})

// When the mouse pointer leaves the gifArea, the gif changes its state to still.
$("#gifArea").on("mouseleave", ".gif", function (event) {
	event.preventDefault(); 
	var state = $(this).attr("data-state");
	$(this).attr("src", $(this).attr("data-still"));
	$(this).attr("data-state", "still");
})


// The form takes the value from the input box and adds it into the topics  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.


$(".submit").on("click", function (event) {
	event.preventDefault();

	console.log("submit");
	// Sets inputted value to newTopic 
	newTopic = $("#topic-input").val();
	// New topic is added to the topics array 
	topics.push(newTopic);
	console.log(topics);
	// Call the function that creates the new button
	buttonGenerator();
});

buttonGenerator();