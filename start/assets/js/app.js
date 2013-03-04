$(document).on('click','#player',function(event){
	var button = $(this);
	var myAudio = document.getElementById('audio'); 

	// prevent the default action
	event.preventDefault();

	if (myAudio.paused) { 
		myAudio.play();
		button.text('Pause').addClass('playing');
	} else {
		myAudio.pause();
		button.text('Play').removeClass('playing');
	}

});


$(document).on('ready',function(){


});