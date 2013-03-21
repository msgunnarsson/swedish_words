$(document).on('ready',function(){

/*	$('.navigation').buildNav();*/

	$('#audio').loadAudio();


});
/*

$.fn.buildNav = function(){
	return this.each(function(){
		var wantedPages = []; // array to hold pages to build navigation from

		var container = $(this);
		var prevLink = container.find('.prev>a');
		var nextLink = container.find('.next>a');
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
	});
}
*/
$.fn.loadAudio = function(){
	return this.each(function(){
		var audio = $(this);
		var button = $('#player');
		var word = $('h2.swedish').text().toLowerCase();

		var setButtonState = function(){
			if (audio.get(0).paused) { 
				button.text('Play').removeClass('playing');
			} else {
				button.text('Pause').addClass('playing');
			}
		}

		$.ajax({
			url: 'http://apifree.forvo.com/key/15df09f4963d56498e03c97a8e5602e1/format/json/callback/loadaudio/action/standard-pronunciation/word/'+word+'/language/sv',
			jsonpCallback: "loadaudio",
			dataType: "jsonp",
			type: "jsonp",
			success: function (json) {
				var mp3 = json.items[0].pathmp3;
				var ogg = json.items[0].pathogg;
				audio.prepend('<source src="'+mp3+'" type="audio/mp4"><source src="'+ogg+'" type="audio/ogg; codecs=vorbis">');
			},
			error: function(){
				console.error('Audio not available 😰');
				audio.remove();
				$('#player').remove();
			}
		});

		$('#player').on('click',function(event){
			var myAudio = document.getElementById('audio'); 

			// prevent the default action
			event.preventDefault();

			if (myAudio.paused) { 
				myAudio.play();
			} else {
				myAudio.pause();
			}

			setButtonState();
		});

		audio.on('ended',function(){
			audio.get(0).load(); // Chrome + Safari need the audio to be reloaded at the end
			setButtonState();
		});
	});
}