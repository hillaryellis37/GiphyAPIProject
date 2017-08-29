var buttonArray = ["The Moon Walk", "Vogue", "The Hustle", "The Sprinkler", "Charleston", "Pop Lock and Drop It", "Grinding", "Twerk", "Crip Walk", "Hip-Hop"];
var url;
var container = $(".button-container");

 $(document).ready(function() {
for (var i = 0; i < buttonArray.length; i++) {

	var btn = $("<button class='btn dance'>"); 
	btn.attr("data-dance", buttonArray[i]);
	var btnDisplay = btn.text(buttonArray[i]);
	container.append(btnDisplay);
}

$(".add").on("click", function() {
	var input = $("#dance-input").val();
	buttonArray.push(input);
	var btn = $("<button class='btn dance'>"); 
	var lastIndex = buttonArray[buttonArray.length - 1];
	btn.attr("data-dance", lastIndex);
	var btnDisplay = btn.text(lastIndex);
	container.append(btnDisplay);

});


$(".button-container").on("click", "button", function() { 


	var dance = $(this).attr("data-dance");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dance + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url:queryURL, 
		method: "GET"})
		.done(function(response) {

			for (var i = 0; i < 10; i++) {

				var urlStill = response.data[i].images.fixed_height_still.url;
				var urlAnimated = response.data[i].images.fixed_height.url;

				
				console.log(response.data[0].rating);

				var imgDiv = $("<img data-state='still'>");
				var rateDiv = $("<p>");
				var divBox = $("<div>");
				var personImage = imgDiv.attr("src", urlStill);
				imgDiv.attr("data-still", urlStill);
				imgDiv.attr("data-animated", urlAnimated);
				var dataAnimated
				var rating = rateDiv.text("rating: " + response.data[i].rating);
				divBox.append(personImage);				
				divBox.prepend(rating);
				$(".gif-container").prepend(divBox);

			}

			$(".gif-container").prepend("<p class='p'>Click the images to see them come alive!</p>");

			$("img").on("click", function() {

				var urlAnimated = $(this).attr("data-animated");
				var urlStill = $(this).attr("data-still");

				if ($(this).attr("data-state") === "still") {
					$(this).attr("src", urlAnimated);
					$(this).attr("data-state", "animated");

				}

				else {
					$(this).attr("src", urlStill);
					$(this).attr("data-state", "still");
				}


			});


	});

});


});



