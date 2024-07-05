// モジュールの準備
const express = require("express");
const multer = require("multer");
const app = express();
app.use(multer().none());

// 静的コンテンツHTMLファイルの返却準備
app.use(express.static("public"));

// 現在の数値を管理
let num = 0;
let flag = true;

// ゲーム開始用エンドポイント
app.get("/api/start", function (_, res) {
    num = Math.floor(Math.random() * 2);

    if (num === 0) {
        res.send({
            systemMessage: "あなたから開始です",
            resMessage: "(答えてください)",
        });
    } else {
        res.send({
            systemMessage: "あなたの番です",
            resMessage: "1!",
        });
    }

    num++;
});

// ゲーム進行用エンドポイント
app.post("/api/game", async function (req, res) {
    const answer = req.body.answer;
    if (!flag) {
        res.send({
            systemMessage: "Game Over",
            resMessage: "×"
        });
        return;
    }

    if (num % 2 === 0) {
        // プレイヤーのターン
        let response = checkFizzBuzz(num, answer);
        if (response.systemMessage === "Game Over") {
            flag = false;
            return res.send(response);
        } else {
            res.send(response);
            num++;

            // コンピュータのターン
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Uncaught Error Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            let computerResponse = computerTurn(num);
            if (computerResponse.systemMessage === "Game Over") {
                flag = false;
            }
            return res.send(computerResponse);
        }
    } else {
    // コンピュータのターン
    let computerResponse = computerTurn(num);
    num++;
    return res.send(computerResponse);
}
});

function checkFizzBuzz(num, answer) {
    if (num % 3 === 0 && num % 5 === 0 && answer === "FizzBuzz") {
        return {
            systemMessage: "相手の番です",
            resMessage: "FizzBuzz!"
        };
    } else if (num % 3 === 0 && answer === "Fizz") {
        return {
            systemMessage: "相手の番です",
            resMessage: "Fizz!"
        };
    } else if (num % 5 === 0 && answer === "Buzz") {
        return {
            systemMessage: "相手の番です",
            resMessage: "Buzz!"
        };
    } else if (answer == num) {
        return {
            systemMessage: "相手の番です",
            resMessage: num + "!"
        };
    } else {
        return {
            systemMessage: "Game Over",
            resMessage: "×"
        };
    }
}

function computerTurn(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return {
            systemMessage: "あなたの番です",
            resMessage: "FizzBuzz!"
        };
    } else if (num % 3 === 0) {
        return {
            systemMessage: "あなたの番です",
            resMessage: "Fizz!"
        };
    } else if (num % 5 === 0) {
        return {
            systemMessage: "あなたの番です",
            resMessage: "Buzz!"
        };
    } else {
        return {
            systemMessage: "あなたの番です",
            resMessage: num + "!"
        };
    }
}

// サーバーを起動する
const port = 3000;
app.listen(port, function () {
    console.log("Node.js Server Started: http://localhost:" + port);
});