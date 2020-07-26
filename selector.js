const NUM_PAGES = 13; // one more than max page value
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
    previous = current - 1;
    if (previous >= 0) {
        window.location.replace('?' + previous);
    }
}

function next() {
    current = getPageNumber();
    next = current + 1;
    if (next < NUM_PAGES) {
        window.location.replace('?' + next);
    }
}

function setPage() {
    pageNumber = getPageNumber();
    var img = new Image;
    img.src = 'pages/' + pageNumber;
    img.id = 'page_image';
    document.getElementById('page').appendChild(img);
    document.getElementById('page_num').textContent = pageNumber + "/" + (NUM_PAGES-1);
    fetchAndSetTranscription(pageNumber);
}

function fetchAndSetTranscription(pageNumber) {
    fetch('transcriptions/' + pageNumber + '.json')
        .then(response => response.json())
        .then(function (response) {
            if (response['transcription']) {
                transcript = response['transcription'];
            } else {
                transcript = "No transcription available.";
            }
            document.getElementById('page_image').alt = transcript;
            document.getElementById('page_image').title = transcript;
        });
}

document.getElementById('page_image').onclick = next;
