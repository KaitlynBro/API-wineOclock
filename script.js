var wine = {}
wine.whiteWineData = [];
wine.redWineData = [];
var userInput = ""
var whiteWineStyles = ["Light & fruity", "Off-dry & Fruity", "Full-bodied & Rich", "Soft & Off-dry", "Aromatic & Flavourful"]
var redWineStyles = ["Medium-bodied & Fruity", "Full-bodied & Smooth", "Light-bodied & Fruity", "Full-bodied & Firm"]


//api key
wine.key = 'MDozMDc3N2FmNi01Njk4LTExZTctOGY5Yy04YjgwY2RlZmVlNjQ6MnMyTlAyRjBKYWRqNUx4MlFhYmhoejBZangySkhRa2s3SmNw'


//initialize code
//1. when the document loads, call the init function
wine.init = function() {
	wine.getWine();
}	

//make a request to lcbo API for wine data
function getWineByType(wineType) {
	return $.ajax({
		url: 'https://lcboapi.com/products',
		headers: { 
			'Authorization': 'Token MDozMDc3N2FmNi01Njk4LTExZTctOGY5Yy04YjgwY2RlZmVlNjQ6MnMyTlAyRjBKYWRqNUx4MlFhYmhoejBZangySkhRa2s3SmNw'
		},
		data: {
			per_page: 100,
			q: wineType,
		}
	});
};

wine.getWine = function() {
	$.when(getWineByType("Red Wine"),getWineByType("White Wine"))
	.then(function(redWine, whiteWine){
		//create object that holds data
		//for both whiteWine and redWine
		//the property names MUST correspond to the value in the html elements
		var wineObjects = {
			whiteWine: whiteWine[0].result,
			redWine: redWine[0].result
		}
		//pass the object with the wine data
		//into the listenForUserInput function
		wine.listenForUserInput(wineObjects);
	});
};

//ajax requests ends


//listening for user input, if they press on white wine radio button, or red wine
//if user input is white, they will then choose from white wine list of styles
//if user input is red,  they will then choose from red wine list of styles
wine.listenForUserInput = function(wineObjects) {
	$('form').on('submit', function(e){
		e.preventDefault();
		//below value will either be "whiteWine" or "redWine"
		var selectedWineType = $('input[name=typeOfWine]:checked').val();
		//the selected Array will either look like..
			// whiteWine[0].result OR redWine[0].result
		var selectedArray = wineObjects[selectedWineType];
		var selectedStyle = $('input[name="style"]:checked').val();	
		var filtered = selectedArray.filter(function(wineItem){
			return wineItem.style === selectedStyle
		});
		//if there is no match to user input, return 'sorry no results'
			//if there is a match, filter and display results
		if (filtered.length === 0){
			$('#wineResults').addClass('noResultsText').append('<p>Sorry, no results found.</p>');
		} else {
			$('#wineResults').removeClass('noResultsText')
			console.log(filtered);
			wine.displayResults(filtered)		
		}
	});
}
	
wine.displayResults = function(selectedArray) {
	for(var i=0; i < selectedArray.length; i++){
		var currentWine = selectedArray[i];
		//Check to see if the wine has the select variaty 
		//and only show that
		var style = selectedArray[i].style;
		var nameElement = $('<h2>').text(currentWine.name);
		var varietyElement = $('<p>').addClass('varietyOfWine').text(currentWine.varietal);
		var styleElement = $('<p>').addClass('styleOfWine').text(currentWine.style);
		var imageElement = $('<img>').attr('src', currentWine.image_thumb_url);
		var wineInfo = $('<div>').addClass('wine wrapper').append(nameElement, varietyElement, styleElement, imageElement);
		$('.wineResults').append(wineInfo);
	}
}

//reload button that will reload the page
function reloadButton(){
	$('#reloadButton').on('click', function(){
		console.log(reloadButton);
		location.reload();
	});
};

//smooth scroll so results display on screen in a more obvious manner
$(".submitButton").on('click', function() {
    $('html,body').animate({
        scrollTop: $(".wineResults").offset().top},
        'slow');
});

$(document).ready(function() {
	wine.init();
	reloadButton();
});

 
