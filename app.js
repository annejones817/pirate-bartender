$(document).ready(function(event){
/////Declare variables/////////	
	var tastes=['fruity', 'bitter', 'sweet', 'salty', 'strong']
	var questions=[];
	var ingredients=[];
	var pantry=[]; 
	var preferences={}; 
	var questionCounter = 0; 

////////Question Constructor/////// 
	var question = function(taste) {
		this.taste=taste;
		this.question='Do ye like ' + taste + ' drinks?'; 
	}
////////Make Questions///////////
	for (var i=0; i<tastes.length; i++) {
	questions[i] = new question(tastes[i]);
	}

//////Ask Questions///////////	
	function askQuestions() {
		if (questionCounter<questions.length) {
			$('.ask-question').removeClass('hidden').prepend('<h3 class="question">' + questions[questionCounter].question + '</h3>'); 
		} else {
			$('.ask-question').remove();
			$('main').append('<p>Thanks for reviewing. Now I need to build the rest of the app!</p>')
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

/////Click "next"///////
	$('.ask-question').submit(function(event){
		event.preventDefault();
		//Check whether user has selected an answer & behave accordingly
		if (($('input[name=answer]:checked').val()) == undefined) {
			$('.ask-question').prepend('<h2 class="require-answer">Please select Aye or Nay.</h2>');
		} else {
			recordAnswer(questions[questionCounter].taste, $('input[name=answer]:checked').val());
			console.log(preferences);
			questionCounter++;
			console.log(questionCounter);
			$('.question').remove();
			$('.require-answer').remove();
			$('input[name=answer]:checked').prop('checked', false);
			askQuestions();
		}
	});
});