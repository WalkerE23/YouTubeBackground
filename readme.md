
*******
TO TEST:
	just open up the index.html and this example ~should~ run
*******


You need to include the script.js file somewhere close, and have your index.html, or whatevel html page, pointing to it.

alternatively, you should be able to put the entire .js file into a script tag and run it that way


and then all you need to do is put the div in the body and set its id to whatever you are calling the object. 

its all commented out, adn there are a few places where you can decide on options. 
	-random video 
	vs
	-next video

	-if you want to shuffle it at all

	-fullscreen or not

	-mute or not

	-and then some ytp options. the link is in the comment. 



i havent figured it out fully, but if you want to change the video, what you could do is move the code from the "video end" part into the "video pause" option.
this would have the effect of you clicking on it one time, and it changes altogether. 


One Final thought.. you'll see where the playlist is where you can pick which videos you want. its straitforward. i left 4 examples up, and they play for 5 seconds, so you can get a pretty clear idea of how the transitions work..