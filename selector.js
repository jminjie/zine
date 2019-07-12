const NUM_POEMS = 10; // one more than max poem value
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
    document.getElementById('poem_image').alt = getTranscription(poemNumber);
}

function getTranscription(last) {
    // TODO
    return "image of poem";
}
