// モジュール準備
const express = require("express");
const app = express();

// エンドポイント
app.get("/", function (_, res) {
    res.send("Hello express");
});

// サーバーを起動する
const port = 3000;
app.listen(port, function () {
    console.log("Node.js Server Started http://localhost:" + port);
});
