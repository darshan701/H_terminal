
window.addEventListener("load", (event) => {
    start();
});

const fileSystem = {
    'about.txt': 'Hello World!',
    'contact.txt': 'You can contact me at +1222 999 9999',
    'folder1': {
        'file1.txt': 'This is file 1',
        'file2.txt': 'This is file 2',
        'folder2': {
            'file3.txt': 'This is file 3'
        }
    }
};

const img =
    "                       ▉\n" +
    "               ┈▁      ▉\n" +
    "      ╺▅┒┒▂▁▂▁╺▇▆╸     ▉\n" +
    "      ┕╴╱▇▉ ▊┈▆╸▎╹     ▉\n" +
    "      ▉┙┊▗▉▏▋▃┊┈╺▎▂▃▂╴ ▉\n" +
    "      ▊▎▁▝▘╾╸▄▁ ▊▍▖╾▂▁▏▉\n" +
    "      ┈▅▝▁▃▃▇▂▂▗▝▉▏ ▇┈ ▉\n" +
    "       ╱▆▅▅▅▅▅▅▆▍╴▌    ▉\n" +
    "     ╻▃▖▏     ▗▉▏▃▘    ▉\n" +
    "     ╹┗▝▎▂▂▃▄▆▁▉▘▁╹    ▉\n" +
    "      ┈▇▇▇▇▇▇▇▇▇▇▇     ▉\n" +
    "                       ▉\n" +
    "\n";

function start(){
    registerCommand('help', () => {
        printLine('Available commands:');
        printLine('help -       shows this help message');
        printLine('about - shows information about this terminal');
        printLine('contact - shows contact information');
        printLine('clear - clears the terminal');
    });

    registerCommand('dog', () => {
       print('login: ');
         readLine().then((username) => {
              print('password: ');
              readLine().then((password) => {
                printLine('Access denied');
              });
         });
    });
    registerCommand('clear', () => {
        clearScreen();
    });
    registerShortcut('ctrl', 'l', () => {
        clearScreen();
    });

    registerCommand('ls', () => {
        printLine('about.txt');
        printLine('contact.txt');
    });

    registerCommand('cat', (args) => {
        if(args.length === 0){
            printLine('Usage: cat [filename]');
        } else {
            switch(args[0]){
                case 'about.txt':
                    printLine('Hello World!');
                    break;
                case 'contact.txt':
                    printLine('You can contact me at +1222 999 9999');
                    break;
                default:
                    printLine('File not found');
                    break;
            }
        }
    });

    registerCommand('echo', (args) => {
        printCharacterByCharacter(args.join(' '), 50).then(() => {
            printLine('');
        });
    });
}