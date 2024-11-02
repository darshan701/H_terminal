
window.addEventListener("load", (event) => {
    start();
});

function start(){
    registerCommand('help', () => {
        printLine('Available commands:');
        printLine('help - shows this help message');
        printLine('about - shows information about this terminal');
        printLine('contact - shows contact information');
        printLine('clear - clears the terminal');
    });

    registerCommand('clear', () => {
        clearScreen();
    });
    registerShortcut('ctrl', 'l', () => {
        clearScreen();
    });
}