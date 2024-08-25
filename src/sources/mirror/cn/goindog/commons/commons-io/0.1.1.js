// initialize
let files;
if (window.localStorage.getItem("files") == null) {
    files = `
    DIRECTORY: /home/User/ 777
    DIRECTORY: /usr/share/ 777
    DIRECTORY: /WebTerminal/ 777
    FILE: /WebTerminal/intro.txt 777 You are using WebTerminal, the terminal application in web.
    `
} else {
    files = window.localStorage.getItem("files")
}

let ls = function() {
    console.log(files);
}