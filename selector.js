const NUM_POEMS = 24; // one more than max poem value
window.onload = setPoem();

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        // left arrow
        previous();
    }
    else if (e.keyCode == '39') {
        // right arrow
        next();
    }
}


function getPoemNumber() {
    url = window.location.href.split('?')
    if (url.length > 1) {
        number = parseInt(url.pop());
        if (!isNaN(number)) {
            return number;
        }
    }
    return NUM_POEMS-1;
}

function previous() {
    current = getPoemNumber();
    next = (current + 1) % NUM_POEMS;
    window.location.replace('?' + next);
}

function next() {
    current = getPoemNumber();
    // trick for making negative modulo cycle
    previous = ((current - 1) % NUM_POEMS + NUM_POEMS) % NUM_POEMS;
    window.location.replace('?' + previous);
}

function setPoem() {
    poemNumber = getPoemNumber();
    document.getElementById('poem_image').src = 'poems/' + poemNumber;
    fetchAndSetTranscription(poemNumber);
}

function fetchAndSetTranscription(poemNumber) {
    fetch('transcriptions/' + poemNumber + '.json')
        .then(response => response.json())
        .then(function (response) {
            if (response['transcription']) {
                transcript = response['transcription'];
            } else {
                transcript = "No transcription available.";
            }
            document.getElementById('poem_image').alt = transcript;
            document.getElementById('poem_image').title = transcript;
        });
}

document.getElementById('poem_image').onclick = next;
