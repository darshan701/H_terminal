
const MAX_INPUT_BUFFER = 200;


const outputElement = document.getElementById('text-output');
const cursor = document.getElementById('text-cursor');
const screen = document.getElementById('display-screen');
const newLineEvent = new Event('newLine');


let prompt = '⌂ > ';
let inputBuffer = "";
let readonlyBuffer= "> ";
let terminalHistory = [];
let pointInHistory = -1;
let shouldShowInput = true;
let readingLine = false;
let executingCommand = false;

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

    if(event.ctrlKey && shortcuts[['ctrl', keyValue]] && !executingCommand && !readingLine){
        let callback = shortcuts[['ctrl', keyValue]]();
        event.preventDefault();
        return;
    }

    if(event.altKey && shortcuts[['alt', keyValue]] && !executingCommand && !readingLine){
        shortcuts[['alt', keyValue]]();
        event.preventDefault();
        return;
    }

    if(event.metaKey && shortcuts[['meta', keyValue]]&& !executingCommand && !readingLine){
        shortcuts[['alt', keyValue]]();
        event.preventDefault();
        return;
    }

    if(event.shiftKey && shortcuts[['shift', keyValue]] && !executingCommand && !readingLine){
        shortcuts[['shift', keyValue]]();
        event.preventDefault();
        return;
    }
    if(keyValue.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey){
        addToBuffer(keyValue);
        return;
    }

    if (keyValue === 'Backspace'){
        if(inputBuffer.length > 0){
            inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
        }
        onBufferUpdated();
    } else if (keyValue === 'Space') {
        addToBuffer(' ')
    } else if (keyValue === 'ArrowUp') {
        if(terminalHistory.length > 0 && pointInHistory === -1){
            inputBuffer = terminalHistory[terminalHistory.length - 1];
            pointInHistory = terminalHistory.length - 1;
            onBufferUpdated();
        } else if(pointInHistory > 0 && terminalHistory.length > 0){
            pointInHistory--;
            inputBuffer = terminalHistory[pointInHistory];
            onBufferUpdated();
        }
    } else if (keyValue === 'ArrowDown') {
        if(pointInHistory === terminalHistory.length - 1 && terminalHistory.length > 0){
            inputBuffer = '';
            pointInHistory = -1;
            onBufferUpdated();
        } else if(pointInHistory < terminalHistory.length - 1 && pointInHistory >= 0){
            pointInHistory++;
            inputBuffer = terminalHistory[pointInHistory];
            onBufferUpdated();
        }
    } else if(keyValue === 'Tab'){
        event.preventDefault(); // Don't do anything else for now
    } else if(keyValue === 'Enter'){
        let wasReadingLine = readingLine;
        document.dispatchEvent(newLineEvent);
        readonlyBuffer += inputBuffer+'\n';
        if(inputBuffer.trim() !== ''){
            if(!executingCommand && !readingLine && !wasReadingLine){
                handleCommand(inputBuffer);
            }
        }
        inputBuffer = '';
        if(!executingCommand &&!readingLine && !wasReadingLine){

            ensurePrompt();
        }
        onBufferUpdated();
    }
}

document.addEventListener('wheel', (event) => {
    let delta = event.deltaY;
    if(delta > 0){
        scroll();
    } else {

    }
});

function finishCommand() {
    executingCommand = false;
    readingLine = false;
    ensurePrompt();
}

function handleCommand(inputBuffer) {
    terminalHistory.push(inputBuffer);
    pointInHistory = -1;
    executingCommand = true;
    let ret = 0;
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
        ret = commands[command](args);
    } else {
        print("Command not found: " + command);
        ret = 127;
    }
    executingCommand = false;
    return ret;
}

function execCmd(command) {
    handleCommand(command);
}

function addToBuffer(keyValue){
    if(inputBuffer.length < MAX_INPUT_BUFFER) {
        inputBuffer += keyValue;
    }
    onBufferUpdated();
}

function onBufferUpdated() {
    if(shouldShowInput){
        outputElement.innerHTML = '';
        outputElement.attributes.getNamedItem('data-glitch').value = '';
        let text = readonlyBuffer + inputBuffer;
        let parts = text.split('#####');
        if(parts.length > 1){
            // src for images are all odd parts
            let srcs = parts.filter((value, index) => index % 2 === 1);
            let textParts = parts.filter((value, index) => index % 2 === 0);
            let i = 0;
            for(i = 0; i < textParts.length || i < srcs.length; i++) {
                if(i < textParts.length) {
                    outputElement.innerHTML += textParts[i];
                    outputElement.attributes.getNamedItem('data-glitch').value += textParts[i];
                }
                if(i < srcs.length) {
                    let full = srcs[i].replace('-Preview', '');
                    outputElement.innerHTML += "<img class='clickable' onclick=\"window.open('"+full+"')\" src=\"" + srcs[i] + '" style="height: 390px; filter: blur(1px) brightness(120%);">';
                    outputElement.attributes.getNamedItem('data-glitch').value += '\n'.repeat(9);
                }
            }
        }
        else {
            outputElement.innerText = readonlyBuffer + inputBuffer;
            outputElement.attributes.getNamedItem('data-glitch').value = readonlyBuffer + inputBuffer;
        }
    } else {
        outputElement.innerHTML = readonlyBuffer + '*'.repeat(inputBuffer.length);
        outputElement.attributes.getNamedItem('data-glitch').value = readonlyBuffer + '*'.repeat(inputBuffer.length);
    }
    scroll();
}

function scroll() {
    /*if(cursor.getBoundingClientRect().bottom >= screen.getBoundingClientRect().bottom){
        if (readonlyBuffer.includes('\n') && readonlyBuffer.indexOf('\n') !== readonlyBuffer.length - 1){
            let newBuff = readonlyBuffer.substring(readonlyBuffer.indexOf('\n') + 1);
            terminalHistory += readonlyBuffer.substring(0, readonlyBuffer.indexOf('\n') + 1);
            readonlyBuffer = newBuff;
            onBufferUpdated();
        }
        else {
            alert('Unhandled state!!!');
        }
    }*/
    screen.scrollTop = screen.scrollHeight;
}

function readLine() {
    readingLine = true;
    return new Promise((resolve, reject) => {
        document.addEventListener('newLine', () => {
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
        executingCommand = true;
        readingLine = true;
        let intervalId = setInterval(() => {
            if(i < text.length){
                print(text[i]);
                i++;
            } else {
                clearInterval(intervalId);
                resolve();
                executingCommand = false;
                readingLine = false;
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

function clearScreen(showPrompt = false) {
    readonlyBuffer = showPrompt ? prompt : '';
    inputBuffer = '';
    onBufferUpdated();
}

function ensurePrompt() {
    if (!readonlyBuffer.endsWith('\n') && !readonlyBuffer.endsWith(prompt)) {
        readonlyBuffer += '\n';
    }
    if (!readonlyBuffer.endsWith(prompt)) {
        readonlyBuffer += prompt;
    }
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

function printImage(imageSrcP, imageSrcF) {
    print('#####' +imageSrcP+'#####\n');
}
