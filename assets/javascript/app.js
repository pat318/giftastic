var superheroes = ["Black Panther", "Wonderwoman", "The Hulk", "Batman", "Captain America", "Superman", "The Black Widow", "Jesus Christ", "Luke Cage",];

var button;
var newTopic = ""; // new super hero

// for loop for creating buttons and putting them in button area
var buttonGenerator = function (){
	for(i = 0; i < superheroes.length; i++) {
		button = $("<button type=" + "button" + ">" + superheroes[i] + "</button>").addClass("btn btn-warning").attr("data",superheroes[i]);
		$("#buttonArea").append(button);
	};
}

 
$("#buttonArea").on("click", ".btn", function(){
  		var superhero = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=dc6zaTOxFJmzC&limit=10";



  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		// creating a div to hold gif using jquery
	          	var topicDiv = $("<div>");
	 			
	          	// creation of p tag to hold gif rating
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			// creation of img tag to hold gif
	 			var topicImage = $("<img>");

	 			// adding dynamic and static function
	 			topicImage.attr("src", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			topicImage.attr("data-animate", results[i].images.fixed_height.url)
	 			topicImage.attr("data-state", "still")
	 			topicImage.addClass("gif");
	 			
	 			// pushing image into div
	 			topicDiv.append(topicImage);
	 			// same with rating
	 			topicDiv.append(p); 			
	 			// prepend as opposed to append means that new images will display on top
	 			$("#gifArea").prepend(topicDiv);
 			}
  		})
  })


// event handler for dynamatizing gifs
$("#gifArea").on("click", ".gif", function(event){
	event.preventDefault();
	
	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	// according to the current state gifs toggle between animate and still 
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
   

// The form takes the value from the input box and adds it into the topics  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.


$(".submit").on("click", function(event){
    //prevent defualt is a method that will not allow for the default action of the event
    event.preventDefault();
    //this must go in or buttons will duplicate themselves
    $("#buttonArea").empty();

	console.log("submit");
	newTopic = $("#topic-input").val();
	// new superhero is added to array 
	superheroes.push(newTopic);
	console.log(superheroes);
	// calling the function for creating button 
	buttonGenerator();
});



buttonGenerator();