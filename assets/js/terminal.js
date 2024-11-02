
const MAX_INPUT_BUFFER = 200;


const outputElement = document.getElementById('text-output');
const cursor = document.getElementById('text-cursor');
const screen = document.getElementById('display-screen');
const newLineEvent = new Event('newLine');


let prompt = '> ';
let inputBuffer = "";
let readonlyBuffer= "> ";
let shouldShowInput = true;
let readingLine = false;

let commands = {};
let shortcuts = {}; //[modifierKey, key] -> callback

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

    if(event.ctrlKey && shortcuts[['ctrl', keyValue]]){
        let callback = shortcuts[['ctrl', keyValue]]();
        event.preventDefault();
        return;
    }

    if(event.altKey && shortcuts[['alt', keyValue]]){
        shortcuts[['alt', keyValue]]();
        event.preventDefault();
        return;
    }

    if(event.metaKey && shortcuts[['meta', keyValue]]){
        shortcuts[['alt', keyValue]]();
        event.preventDefault();
        return;
    }

    if(event.shiftKey && shortcuts[['shift', keyValue]]){
        shortcuts[['shift', keyValue]]();
        event.preventDefault();
        return;
    }
    if(keyValue.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey){
        addToBuffer(keyValue);
    } else if (keyValue === 'Backspace'){
        if(inputBuffer.length > 0){
            inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
        }
        onBufferUpdated();
    } else if (keyValue === 'Space') {
        addToBuffer(' ')
    } else if(keyValue === 'Enter'){
        document.dispatchEvent(newLineEvent);
        readonlyBuffer += inputBuffer+'\n';
        if(inputBuffer.trim() !== ''){
            handleCommand(inputBuffer);
        }
        inputBuffer = '';
        if(!readonlyBuffer.endsWith('\n') && !readonlyBuffer.endsWith(prompt)){
            readonlyBuffer += '\n';
        }
        if(!readonlyBuffer.endsWith(prompt)) {
            readonlyBuffer += prompt;
        }
        onBufferUpdated();
    }
}

function handleCommand(inputBuffer) {
    inputBuffer = inputBuffer.trim();
    let command = '';
    let args = [];
    let inQuotes = false;
    let currentArg = '';
    let argsStarted = false;
    for (let i = 0; i < inputBuffer.length; i++){
        let character = inputBuffer[i];
        if(!argsStarted){
            if(character === ' '){
                argsStarted = true;
            } else {
                command += character;
            }
            continue;
        }
        if(character === ' ' && !inQuotes){
            if(currentArg.trim() !== ''){
                args.push(currentArg.trim());
                currentArg = '';
            }
        } else {
            if(character === '"'){
                inQuotes = !inQuotes;
            } else {
                currentArg += character;
            }
        }
    }

    if(currentArg.trim() !== ''){
        args.push(currentArg.trim());
    }
    if(commands[command]){
        return commands[command]();
    } else {
        print("Command not found: " + command);
    }
}

function addToBuffer(keyValue){
    if(inputBuffer.length < MAX_INPUT_BUFFER) {
        inputBuffer += keyValue;
    }
    onBufferUpdated();
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

function readLine() {
    return new Promise((resolve, reject) => {
        readingLine = true;
        document.addEventListener('newLine', () => {
            readingLine = false;
            resolve(inputBuffer);
        });
    });
}

function printLine(text) {
    print(text + '\n');
}

function printCharacterByCharacter(text, interval) {
    return new Promise((resolve, reject) => {
        let i = 0;
        let intervalId = setInterval(() => {
            if(i < text.length){
                print(text[i]);
                i++;
            } else {
                clearInterval(intervalId);
                resolve();
            }
        }, interval);
    });
}

function print(text) {
    readonlyBuffer += text;
    onBufferUpdated();
}

function setPrompt(newPrompt) {
    prompt = newPrompt;
}

function hideInput() {
    shouldShowInput = false;
}

function showInput() {
    shouldShowInput = true;
}

function clearScreen() {
    readonlyBuffer = prompt;
    inputBuffer = '';
    onBufferUpdated();
}

function registerCommand(command, callback) {
    commands[command] = callback;
}

function removeCommand(command) {
    delete commands[command];
}

function registerShortcut(modifierKey, key, callback) {
    shortcuts[[modifierKey, key]] = callback;
}

function removeShortcut(modifierKey, key) {
    delete shortcuts[[modifierKey, key]];
}
