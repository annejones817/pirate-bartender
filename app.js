$(document).ready(function(event){
/////Declare variables/////////	
	var tastes=['fruity', 'bitter', 'sweet', 'salty', 'strong'];
	var questions=[];
	var preferences={}; 
	var questionCounter = 0; 

////////Question Constructor/////// 
	function Question(taste) {
		this.taste=taste;
		this.question='Do ye like ' + taste + ' drinks?'; 
	}
////////Make Questions///////////
	for (var i=0; i<tastes.length; i++) {
		questions[i] = new Question(tastes[i]);
	}

/////////Ingredients Constructor/////////
	function Ingredient(taste, ingredients) {
		this.strong = ['Glug of rum', 'Slug of whiskey', 'Splash of gin'];
		this.salty = ['Olive', 'Salted rim', 'Rasher of bacon'];
		this.bitter = ['Shake of bitters', 'Splash of tonic', 'Twist of lemon peel'];
		this.sweet = ['Sugar cube', 'Spoonful of honey', 'Splash of cola'];
		this.fruity = ['Orange juice', 'Dash of cassis', 'Cherry on top'];
	}

//////////Make Ingredients ///////////////	
	var ingredients = new Ingredient();
	
///////////Pantry Constructor////////////////
	function Pantry(ingredients) {
		this.ingredients=ingredients;
	}	

////////Make Pantry ////////////
	var pantry = new Pantry(ingredients); 

/////////Bartender Constructor///////////
	function Bartender(){
		this.name='Blackbeard'; 
		this.pets=['Parrot'];
	}	

	Bartender.prototype.createDrink = function(preferences){
		var drink = []; 
		var drinkHtml = '<span>Here\'s ye drink. It has: <ul>'
		console.log(pantry.ingredients.bitter.length);
		for (var i=0; i<tastes.length; i++) {
			
			console.log(tastes[i]);
			var random = getRandom(0, ((pantry.ingredients[tastes[i]].length)-1));
			console.log(random);
			if (preferences[tastes[i]]==='yes') {
				drink.push(pantry.ingredients[tastes[i]][random]); 
			}
		}	
		for (var i=0; i<drink.length; i++) {
		 		drinkHtml += '<li>' + drink[i] + '</li>';
		 	}
		 drinkHtml += '</ul></span>' 	
		 $('main').append(drinkHtml);

	}

////////Get Random Number/////
	function getRandom(min, max){
		return Math.ceil((Math.random() * (max-min) + min)); 
	}	

//////Ask Questions///////////	
	function askQuestions() {
		var bartenderBarbossa = new Bartender(); 
		bartenderBarbossa.name='Barbossa';
		if (questionCounter<questions.length) {
			$('.ask-question').removeClass('hidden').prepend('<h3 class="question">' + questions[questionCounter].question + '</h3>'); 
		} else {
			$('.ask-question').remove();
			bartenderBarbossa.createDrink(preferences);
		}	
	}

///////Record Answers////////////
	function recordAnswer(taste, preference) {
		preferences[taste] = preference;
	}


///////////Event Listeners//////////////
////Click "start"/////
	$('.start').click(function(event){
		$('.welcome').remove();
		$('.start').remove();
		askQuestions(); 
	});

/////Click "next": Check whether an answer has been selected, then show next question///////
	$('.ask-question').submit(function(event){
		event.preventDefault();
		//Check whether user has selected an answer & behave accordingly
		if (($('input[name=answer]:checked').val()) == undefined) {
			$('.ask-question').prepend('<h2 class="require-answer">Please select Aye or Nay.</h2>');
		} else {
			recordAnswer(questions[questionCounter].taste, $('input[name=answer]:checked').val());
			questionCounter++;
			$('.question').remove();
			$('.require-answer').remove();
			$('input[name=answer]:checked').prop('checked', false);
			askQuestions();
		}
	});
});