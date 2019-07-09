const NUM_POEMS = 8; // one more than max poem value
window.onload = setPoem();

function getPoemNumber() {
    url = window.location.href.split('?')
    if (url.length > 1) {
        return parseInt(url.pop());
    } else {
        return NUM_POEMS-1;
    }
}

function previous() {
    current = getPoemNumber();
    // trick for making negative modulo cycle
    previous = ((current - 1) % NUM_POEMS + NUM_POEMS) % NUM_POEMS;
    window.location.replace('?' + previous);
}

function next() {
    current = getPoemNumber();
    next = (current + 1) % NUM_POEMS;
    window.location.replace('?' + next);
}

function setPoem() {
    poemNumber = getPoemNumber();
    document.getElementById('testpoem').src = 'poems/' + poemNumber;
    document.getElementById('testpoem').alt = getTranscription(poemNumber);
}

function getTranscription(last) {
    // TODO
    return "image of poem";
}
