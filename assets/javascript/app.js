var buttonArray = ["The Moon Walk", "Vogue", "The Hustle", "The Sprinkler", "Charleston", "Pop Lock and Drop It", "Grinding", "Twerk", "Crip Walk"];
var url;
var container = $(".button-container");

for (var i = 0; i < buttonArray.length; i++) {

	var btn = $("<button class='btn'>"); 
	btn.attr("data-dance", buttonArray[i]);
	// btn.attr("data-state", "animated");
	var btnDisplay = btn.text(buttonArray[i]);

	container.append(btnDisplay);
}




$("button").on("click", function() { 



	var dance = $(this).attr("data-dance");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dance + "&api_key=dc6zaTOxFJmzC&limit=10";

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
				var personImage = imgDiv.attr("src", urlStill);
				imgDiv.attr("data-still", urlStill);
				imgDiv.attr("data-animated", urlAnimated);
				var dataAnimated
				var rating = rateDiv.text(response.data[i].rating);
				$(".gif-container").prepend(personImage);
				
				$(".gif-container").prepend(rating);

			}




			$("img").on("click", function() {

					var urlAnimated = $(this).attr("data-animated");
					var urlStill = $(this).attr("data-still");

					console.log($(this).attr("data-state"));
					console.log($(this).attr("data-state") === "animated");
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


