console.oldLog = console.log;
let command_list = [];
console.log = (logText) => {
    console.oldLog(logText);
    document.getElementById("br_div").innerHTML += "<br /><code>" + logText + "</code>"
}

function loadCommands(package_, source = "https://source.goindog.cn/terminal/") {
    let packages = package_.split(':');
    let packagePath = packages[0].replaceAll(".", "/");
    let packageName = packages[1];
    let url = source + packagePath + "/" + packageName + "/" + packages[2] + ".js"
    let request = new XMLHttpRequest();
    request.addEventListener("load",() => {
        console.oldLog("GET " +  url + " SUCCESS!");
        eval(request.responseText);
    })
    request.addEventListener("error", () => {
        console.log("GET " + url + " ERROR")
    })
    request.open("GET", url);
    request.send();
}

function runCommand(commandName = "", Attribute = []) {
    let command_run_str = `${commandName}(${JSON.stringify(Attribute)})`
    try {
        console.log(command_run_str);
        
        eval(command_run_str);
    } catch (e) {
        console.log("Unknown command:" + commandName);
    }
    document.getElementById("code_input").setAttribute("id", "code_ip_");
    document.getElementById("ip_cmd").setAttribute("id", "ip_cmd_");
    document.getElementById("br_div").setAttribute("id", "br_div_");
    document.getElementById("mouse").remove();
    document.body.innerHTML += `<br />
<div id="code_input">
    <code>Users@WebTerminal >&nbsp;</code>
    <code id="ip_cmd"></code>
    <div id="br_div"></div>
    <div id="mouse"></div>
</div>`;
}

window.onload = () => {
    document.getElementsByTagName("body")[0].addEventListener("keydown", (ev) => {
            if (ev.key === "Enter") {
                let list = document.getElementById("ip_cmd").innerText.split(/\s+/);
                let name = list[0];
                let attr = list.slice(1, list.length);
    var len = command_list.length;
    command_list[len] = document.getElementById("ip_cmd").innerText;
                runCommand(name, attr);
            } else if (ev.key === "Backspace") {
                document.getElementById("ip_cmd").innerText = document.getElementById("ip_cmd").innerText.substring(0, document.getElementById("ip_cmd").innerText.length - 1);
            } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp" || ev.key === "ArrowDown" || ev.key === "ArrowRight") {
            } else if (ev.code === "Space") {
                document.getElementById("ip_cmd").innerHTML += "&nbsp;";
            } else if (ev.key === "CapsLock" || ev.metaKey || ev.key === "Tab" || ev.ctrlKey || ev.altKey || ev.shiftKey || ev.key === "Unidentified" || ev.key === "AudioVolumeMute" || ev.key === "AudioVolumeDown" || ev.key === "AudioVolumeUp" || ev.key === "MediaTrackPrevious" || ev.key === "MediaTrackNext" || ev.key === "MediaPlayPause" || ev.key === "Delete" || ev.key === "NumLock" || ev.key === "Home" || ev.key === "PageUp" || ev.key === "End" || ev.key === "PageDown" || ev.key === "Insert" || ev.key === "F1" || ev.key === "F2" || ev.key === "F3" || ev.key === "F4" || ev.key === "F5" || ev.key === "F6" || ev.key === "F7" || ev.key === "F8" || ev.key === "F9" || ev.key === "F10" || ev.key === "F11" || ev.key === "F12") {
            } else {
                document.getElementById("ip_cmd").innerText += ev.key
            }
    });
    loadCommands("cn.goindog.commons:commons-io:0.1.1", "./src/sources/mirror/");
}