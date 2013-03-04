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

	var wantedPages = []; // array to hold pages to build navigation from

	var prevLink = $('.navigation>.prev>a');
	var nextLink = $('.navigation>.next>a');
	var prevIndex, nextIndex;

	// remove index page and current page from pages
	$.each(pages,function(index,element){
		if ((element.url != '/index.html') && (element.url != location.pathname)) {
			wantedPages.push(element);
		}
	});

	// generate random previous and next page links
	prevIndex = Math.floor(Math.random()*wantedPages.length);
	do {
		nextIndex = Math.floor(Math.random()*wantedPages.length);
	} while (nextIndex == prevIndex);

	prevLink.text(wantedPages[prevIndex].title).attr('href',wantedPages[prevIndex].url.slice(1));
	nextLink.text(wantedPages[nextIndex].title).attr('href',wantedPages[nextIndex].url.slice(1));

});
