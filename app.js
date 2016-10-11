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
			questionCounter++;
		} else {
			$('.ask-question').remove();
			$('main').append('<p>Thanks for reviewing. Now I need to build the rest of the app!</p>')
		}	
	}

///////////Event Listeners//////////////
	$('.start').click(function(event){
		$('.welcome').remove();
		$('.start').remove();
		askQuestions(); 
	});

	$('.ask-question').submit(function(event){
		event.preventDefault();
		if (($('input[name=answer]:checked').val()) == undefined) {
			$('.ask-question').prepend('<h2 class="require-answer">Please select Aye or Nay.</h2>');
		} else {
			$('.question').remove();
			$('.require-answer').remove();
			$('input[name=answer]:checked').prop('checked', false);
			askQuestions();
		}
	});
});