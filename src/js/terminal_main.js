console.oldLog = console.log;
console.log = (logText) => {
    console.oldLog(logText);
    document.getElementById("br_div").innerHTML += "<br /><code>" + logText + "</code>"
}

function loadCommands(cmd_name, source = "https://source.goindog.cn/terminal/") {
    let request = new XMLHttpRequest();
    request.open("GET", source + cmd_name);
    switch (request.status) {
        case 200:
            console.log("GET " + source + " SUCCESS!");
            eval(request.responseText);
            break;
        default:
            console.log("Bad Connection:" + request.status);
    }
}

function runCommand(commandName = "", Attribute = []) {
    let command_run_str = `${commandName}(${JSON.stringify(Attribute)})`
    eval(command_run_str);
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
                runCommand(name, attr);
            } else if (ev.key === "Backspace") {
                document.getElementById("ip_cmd").innerText = document.getElementById("ip_cmd").innerText.substring(0, document.getElementById("ip_cmd").innerText.length - 1);
            } else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp" || ev.key === "ArrowDown" || ev.key === "ArrowRight") {
            } else if (ev.keyCode === 32) {
                document.getElementById("ip_cmd").innerHTML += "&nbsp;";
            } else if (ev.key === "CapsLock" || ev.metaKey || ev.key === "Tab" || ev.ctrlKey || ev.altKey || ev.shiftKey || ev.key === "Unidentified" || ev.key === "AudioVolumeMute" || ev.key === "AudioVolumeDown" || ev.key === "AudioVolumeUp" || ev.key === "MediaTrackPrevious" || ev.key === "MediaTrackNext" || ev.key === "MediaPlayPause" || ev.key === "Delete" || ev.key === "NumLock" || ev.key === "Home" || ev.key === "PageUp" || ev.key === "End" || ev.key === "PageDown" || ev.key === "Insert") {
            } else {
                document.getElementById("ip_cmd").innerText += ev.key
            }
    })
}

function Http(param) {
    let attr = JSON.parse("{}");
    for (let i = 0; i < param.length; i++) {
        if (param[i].substring(0, 1) === "-") {
            attr[param[i].substring(1, param[i].length)] = param[i + 1];
        }
    }
    let http = new XMLHttpRequest();
    let url = attr["type"] + "://" + attr["url"] + ":" + attr["port"];
    let meth = attr["method"];
    http.open(meth, url);
    http.send();
    http.onload = (ev) => {
        console.log(http.response);
        return http.response;
    }
}
function term(param = []) {
    let attrib = JSON.parse("{}");
    for (let i = 0; i < param.length; i++) {
        if (param[i].substring(0, 1) === "-") {
            attrib[param[i].substring(1, param[i].length)] = param[i + 1];
        }
    }
    if (attrib["add"] !== undefined) {
        loadCommands(attrib["-n"]);
    }
    if (attrib["color"] !== undefined) {
        document.body.innerHTML += `
        <style>
        code {
        color: ${attrib["-new"]} !important;
        }
        #mouse {
        background-color: ${attrib["-new"]} !important;
        }
</style>
        `
    }
}
