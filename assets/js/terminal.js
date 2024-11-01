
const MAX_INPUT_BUFFER = 200;


const outputElement = document.getElementById('text-output');
const cursor = document.getElementById('text-cursor');
const screen = document.getElementById('display-screen');

let inputBuffer = "";
let readonlyBuffer= "> ";
let shouldShowInput = true;

document.addEventListener('keydown', (event) => {
    let keyValue = event.key;
    let codeValue = event.code;
    console.log("keyValue: " + keyValue);
    console.log("codeValue: " + codeValue);
    onKeyPressed(event);
}, false);

function onKeyPressed(event) {
    let keyValue = event.key;
    let codeValue = event.code;

    if(keyValue === 'l' && event.ctrlKey){
        readonlyBuffer = '> ';
        inputBuffer ='';
    } else if(keyValue.length === 1){
        addToBuffer(keyValue);
    } else if (keyValue === 'Backspace'){
        if(inputBuffer.length > 0){
            inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
        }
    } else if (keyValue === 'Space') {
        addToBuffer(' ')
    } else if(keyValue === 'Enter'){
        readonlyBuffer += inputBuffer + '\n> ';
        inputBuffer = '';
    }

    else {
        return; // Not Handled
    }
    event.preventDefault(); // Handled
    onBufferUpdated();
}

function addToBuffer(keyValue){
    if(inputBuffer.length < MAX_INPUT_BUFFER) {
        inputBuffer += keyValue;
    }
}

function onBufferUpdated() {
    if(shouldShowInput){
        outputElement.innerText = readonlyBuffer + inputBuffer;
        outputElement.attributes.getNamedItem('data-glitch').value = readonlyBuffer + inputBuffer;
    }
    scroll();
}

function scroll() {
    if(cursor.getBoundingClientRect().bottom >= screen.getBoundingClientRect().bottom){
        if (readonlyBuffer.includes('\n') && readonlyBuffer.indexOf('\n') !== readonlyBuffer.length - 1){
            readonlyBuffer = readonlyBuffer.substring(readonlyBuffer.indexOf('\n') + 1);
            onBufferUpdated();
        }
        else {
            alert('Unhandled state!!!');
        }
    }
}