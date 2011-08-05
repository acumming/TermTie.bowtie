
// A global variable for the track length
var currentTrackLength = 0.0;

function trackChanged(theTrack) {

    var title = "\"" + theTrack.title + "\"" || "";
    var artist = theTrack.artist || "";
    var album = theTrack.album || "";

    currentTrackLength = theTrack.length || 0.0;

    document.getElementById('title').innerHTML = title;
    document.getElementById('artist').innerHTML = artist;
    document.getElementById('album').innerHTML = album;

    // Set the rating
    updateStars();
};

function updateStars() {
    var rating = Math.floor(Player.rating() / 20);
    var ratingEl = document.getElementById('rating');
    var score = 5 - rating;

    ratingEl.innerHTML = "";

    for(var i = 0; i < rating; i++) {
        ratingEl.appendChild(createStar("filled", i));
    }

    for(var i = 0; i < score; i++) {
        ratingEl.appendChild(createStar("blank", score));
    }
}

function pollingUpdate() {

    var progressBar = document.getElementById("progress-bar");
    var currentPosition = Player.playerPosition();
    var positionPercentage = (currentPosition / currentTrackLength) * 100.0;

    // Clear out the element first
    progressBar.innerHTML = "";

    // 20 dots
    var numDots = Math.floor(positionPercentage / 5);

    // Add the white dots
    for(var i = 0; i < numDots; i++) {
        progressBar.appendChild(createDot("time-elapsed"));
    }

    // Add the black dots
    for(var i = 0; i < (20 - numDots); i++) {
        progressBar.appendChild(createDot("time-remaining"));
    }

    // In case the stars have changed since we've started playing.
    updateStars();

};

// Create a dot with a supplied class name.
function createDot(className) {

    var el = document.createElement('span');

    el.setAttribute("class", className);
    el.innerHTML = ". ";
    return el;

};

function createStar(className, rating) {

    var el = document.createElement('span');

    el.setAttribute("class", className);
    el.setAttribute("data-rating", rating);
    el.innerHTML = "*";

    return el;
};
