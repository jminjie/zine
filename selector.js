const NUM_POEMS = 13; // one more than max poem value
window.onload = setPage();

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


function getPageNumber() {
    url = window.location.href.split('?')
    if (url.length > 1) {
        number = parseInt(url.pop());
        if (!isNaN(number)) {
            return number;
        }
    }
    return 0;
}

function previous() {
    current = getPageNumber();
    // trick for making negative modulo cycle
    previous = current - 1;
    if (previous >= 0) {
        window.location.replace('?' + previous);
    }
}

function next() {
    current = getPageNumber();
    next = current + 1;
    if (next < NUM_POEMS) {
        window.location.replace('?' + next);
    }
}

function setPage() {
    poemNumber = getPageNumber();
    document.getElementById('page_image').src = 'pages/' + poemNumber;
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
            //document.getElementById('page_image').alt = transcript;
            document.getElementById('page_image').title = transcript;
        });
}

document.getElementById('page_image').onclick = next;
