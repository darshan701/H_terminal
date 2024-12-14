
window.addEventListener("load", (event) => {
    start();
});


let currentFolder = '';

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

function disableDebugAccess() {
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            event.preventDefault();
        }
        if(event.key === 'F12'){
            event.preventDefault();
        }
        if(event.ctrlKey && event.key === 'U'){
            event.preventDefault();
        }
    });
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
}

function start(){
    disableDebugAccess();
    registerCommand('help', () => {
        printLine('Available commands:');
        printLine('help - show this help');
        printLine('ls - list files');
        printLine('cd [folder] - change directory');
        printLine('cat [filename] - read specified file');
        printLine('echo [text] - print text');
        printLine('clear - clear screen');
        printLine('pwd - print current folder');
        printLine('logout - logout from current session');
    });

    registerCommand('logout', () => {
        const askLogin = (realUsername, realPassword, clear = true) => {
            if (clear)
                clearScreen();
            print('login: ');
            readLine().then((username) => {
                print('password: ');
                hideInput();
                readLine().then((password) => {
                    showInput();
                    if(username === realUsername && password === realPassword){
                        //printLine('Access granted');
                        clearScreen();
                        currentFolder = '/home/' + realUsername;
                        printCharacterByCharacter("Welcome, " + atob('QWxkZW4gLkY=').trim() + " !\n", 50)
                            .then(() => {
                                finishCommand();
                            });
                        return;
                    }
                    //clearScreen();
                    printLine('Access denied');
                    askLogin(realUsername, realPassword, false);
                });
            });
        }
        askLogin(atob('MzI3NTI4NDM5').trim(), atob('UDE2MjQ4aGwjNQ==').trim());
    });

    registerCommand('clear', () => {
        clearScreen(true);
    });
    registerShortcut('ctrl', 'l', () => {
        clearScreen(true);
    });
    registerCommand('pwd', () => {
        printLine(currentFolder);
    });

    registerCommand('ls', () => {
        if(currentFolder === '/home/'+atob('MzI3NTI4NDM5').trim()){
            printLine('Documents/');
            printLine('Images/');
            printLine('Logs/');
            printLine('contract_506.txt');
            printLine('project736.txt');
        } else {
            printLine('');
        }
    });

    registerCommand('cat', (args) => {
        if(args.length === 0){
            printLine('Usage: cat [filename]');
        } else {
            switch(args[0]){
                case 'contract_506.txt':
                    if(currentFolder !== '/home/'+atob('MzI3NTI4NDM5').trim()){
                        printLine('File not found');
                        break;
                    }
                    printCharacterByCharacter(`
HELLION DYNAMICS INTERNAL MEMODocument ID: HD-14X-09-PROJINFTOP SECRET – AUTHORIZED ACCESS ONLYDigital Copy 01/03

SUBJECT: Project Inferno – Acquisition and Release Agreement
DATE: [REDACTED]STATUS: ACTIVE

MEMORANDUM OF UNDERSTANDING
This agreement, though unauthorized under formal jurisdiction, serves as a binding resolution between:
HELLION DYNAMICS, LLCRepresented by: Dr. Alden Frost (Chief Biochemical Researcher)
&
[REDACTED ENTITY] – MINISTRY OF NATIONAL SECURITY (MNS)
KEY PROVISIONS
1.\tAsset Transfer:Hellion Dynamics shall provide comprehensive schematics and prototype documentation for the Project Inferno (GDB-X01) bio-dispersal weapon.
2.\tExchange Terms: 
o\tThe immediate release of Prisoner #019F23 (Alias: “Shadow”) from [REDACTED DETENTION FACILITY].
o\tFinancial compensation of $8,750,000 USD to be wired to the offshore account [HORIZON TRUST - 0039X442AF], registered under A.Frost International Holdings.
3.\tNon-Disclosure and Nullification Clause:All parties involved are to ensure the destruction of evidence post-transfer. Any traceability of this agreement will result in immediate nullification of terms.
4.\tPenalty Stipulation:Failure to comply with the above provisions shall lead to the forfeiture of Prisoner #019F23 and the termination of pre-established channels.

Dr. Alden FrostLead Researcher, Hellion Dynamics
[REDACTED]Authorized Representative, Ministry of National Security\n
                    `, 10).then(() => finishCommand());
                    break;
                case 'project736.txt':
                    if(currentFolder !== '/home/'+atob('MzI3NTI4NDM5').trim()){
                        printLine('File not found');
                        break;
                    }
                    printLine('This is a project description document.');
                    break;
                default:
                    printLine('File not found');
                    break;
            }
        }
    });

    registerCommand('cd', (args) => {
        if(args.length === 0){
            if(currentFolder.startsWith('/home/'+atob('MzI3NTI4NDM5').trim())){
                currentFolder = '/home/'+atob('MzI3NTI4NDM5').trim();
            }
        } else {
            switch(args[0]){
                case 'Documents':
                    if(currentFolder !== '/home/'+atob('MzI3NTI4NDM5').trim()){
                        printLine('Folder not found');
                        break;
                    }
                    currentFolder += '/Documents';
                    break;
                case 'Images':
                    if(currentFolder !== '/home/'+atob('MzI3NTI4NDM5').trim()){
                        printLine('Folder not found');
                        break;
                    }
                    currentFolder += '/Images';
                    break;
                case 'Logs':
                    if(currentFolder !== '/home/'+atob('MzI3NTI4NDM5').trim()){
                        printLine('Folder not found');
                        break;
                    }
                    currentFolder += '/Logs';
                    break;
                case '..':
                    if(currentFolder === '/home/'+atob('MzI3NTI4NDM5').trim()){
                        printLine('Cannot go back');
                        break;
                    }
                    currentFolder = '/home/'+atob('MzI3NTI4NDM5').trim();
                    break;
                default:
                    printLine('Folder not found');
                    break;
            }
        }
    });

    registerCommand('echo', (args) => {
        printCharacterByCharacter(args.join(' '), 50).then(() => {
            printLine('');
        });
    });

    execCmd('logout');
}