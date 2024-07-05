function start() {
    return fetch("./api/start")
        .then((res) => res.json())
        .then((v) => {
            document.getElementById("msg-system").innerHTML = v.systemMessage;
            document.getElementById("msg-answer").innerHTML = v.resMessage;
        });
}

function fetchAPI(answer) {
    const body = new FormData();
    body.append("answer", answer);

    return fetch("./api/game", {
        method: "POST",
        body,
    })
        .then((res) => res.json())
        .then((v) => {
            document.getElementById("msg-system").innerHTML = v.systemMessage;
            document.getElementById("msg-answer").innerHTML = v.resMessage;
        });
}

function fetchAPIWithNumber() {
    const inputNum = document.getElementById("input-num").value;
    fetchAPI(inputNum);
}