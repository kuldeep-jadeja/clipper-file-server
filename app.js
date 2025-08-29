const express = require('express');
const bindFlmngr = require("@flmngr/flmngr-server-node-express").bindFlmngr;

const app = express();
app.use(express.static('test'));
const PORT = process.env.PORT || 3041;

bindFlmngr({
    app: app,
    urlFileManager: "/flmngr",
    urlFiles: "/files/",
    dirFiles: "./public/upload"
});

app.get("/file-server", (req, res) => {
    require('fs').readFile('./test/flmngr-example.html', 'utf8', (err, text) => {
        res.send(text);
    });
});

app.get("/", (req, res) => {
    res.send("Hello World !");
})

app.listen(PORT, () => {
    console.log("Server Started at PORT:", PORT);
});