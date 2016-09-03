$(document).on('click', '.animalButton', function(){
	var p = $(this).data('animal');

	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+p+"&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'})
	.done(function(response){
		$('#gifArea').empty();
		var results = response.data;

		for (var i=0; i < results.length; i++){
			var gifDiv = $('<div class="item">')
			var rating = results[i].rating;
			var p = $('<p>').text("Rating: "+ rating);
			var animalImage = $('<img>');
			animalImage.attr('src', results[i].images.fixed_height_still.url);
			animalImage.attr('data-still', results[i].images.fixed_height_still.url);
			animalImage.attr('data-animate', results[i].images.fixed_height.url);
			animalImage.attr('data-state', 'still');
			console.log(results[i]);

			gifDiv.append(p);
			gifDiv.append(animalImage);

			$('#gifArea').prepend(gifDiv);

		}

	});
});

$(document).on('click', 'img', function(){
	var state = $(this).attr('data-state');

	if ( state == 'still'){
				$(this).attr('src', $(this).data('animate'));
				$(this).attr('data-state', 'animate');
	}
	else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}


});

$('#submitButton').on('click', function(){
	var input = $('#searchInput').val().trim();
	console.log(input);

	var newButton = $('<button>').text(input);
	newButton.attr('class', 'btn animalButton');
	newButton.attr('data-animal', input)
	$('#buttonArea').append(newButton);

	$(newButton).click();
	return false;

});