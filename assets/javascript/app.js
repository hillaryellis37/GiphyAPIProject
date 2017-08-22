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
				var rating = rateDiv.text(response.data[i].rating);
				$(".gif-container").prepend(personImage);
				
				$(".gif-container").prepend(rating);

			}


			$("img").on("click", function() {



					console.log($(this).attr("data-state"));
					if ($(this).attr("data-state") === "still") {
						$(this).attr("src", urlAnimated);
						$(this).attr("data-state", "animated");


					}

					if ($(this).attr("data-state") === "animated") {
						$(this).attr("src", urlStill);
						$(this).attr("data-state", "still");

					}


				});


	});

});


