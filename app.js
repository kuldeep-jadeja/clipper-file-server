const express = require('express');
const bindFlmngr = require("@flmngr/flmngr-server-node-express").bindFlmngr;
const multer = require('multer');
const path = require('path');

const app = express();

// Configure multer
const upload = multer({ dest: './public/upload/' });

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token !== 'clipper-upload-token-2024') {
        return res.status(403).json({ error: 'Invalid token' });
    }
    next();
};

// Add upload endpoint
app.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const publicUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    res.json({ url: publicUrl });
});
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