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

	// strip out just the file name to match stored URL
	var path = '/'+location.pathname.split('/').pop();

	// remove index page and current page from pages
	$.each(pages,function(index,element){
		if ((element.url != '/index.html') && (element.url != path)) {
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

	// fetching background image with Flickr
	var searchTerm = $('.english').text();
	var flickrApi = '35b89464ff1274fa7a172348ef664a28';
	var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrApi + "&safe_search=1&extras=url_l&per_page=10&text=" + searchTerm;
	
	$.getJSON(url + "&format=json&jsoncallback=?", function(response) {
        var randomIndex = Math.floor((Math.random()*10)+1);
        var randomImageUrl = response.photos.photo[randomIndex].url_l;
        console.log(randomImageUrl);
        $("html").css('background-image', 'url('+ randomImageUrl +')');
    });
});
