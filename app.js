const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { bindFlmngr } = require("@flmngr/flmngr-server-node-express");

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse JSON bodies
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Serve static files
app.use(express.static('test'));

const PORT = process.env.PORT || 3041;

// Ensure upload directories exist
const uploadDir = './public/upload';
const clipsDir = path.join(uploadDir, 'clips');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(clipsDir)) {
    fs.mkdirSync(clipsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filename = req.body.filename || file.originalname;
        const subDir = path.dirname(filename);
        const fullPath = subDir === '.' ? uploadDir : path.join(uploadDir, subDir);

        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }

        cb(null, fullPath);
    },
    filename: function (req, file, cb) {
        const filename = req.body.filename ? path.basename(req.body.filename) : file.originalname;
        cb(null, filename);
    }
});

// Find this section and update it:
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024 * 1024, // Increased to 500MB (was 100MB)
        fieldSize: 50 * 1024 * 1024  // Add field size limit
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token !== 'clipper-upload-token-2024') {
        return res.status(403).json({ error: 'Invalid access token' });
    }
    next();
};

// Upload endpoint
app.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const relativePath = path.relative(uploadDir, req.file.path);
        const normalizedPath = relativePath.replace(/\\/g, '/');
        const publicUrl = `${req.protocol}://${req.get('host')}/files/${normalizedPath}`;

        console.log(`✅ File uploaded: ${req.file.originalname} -> ${publicUrl}`);

        res.json({
            success: true,
            url: publicUrl,
            filename: req.file.filename,
            size: req.file.size
        });

    } catch (error) {
        console.error('❌ Upload error:', error);
        res.status(500).json({ error: 'Upload failed', message: error.message });
    }
});

// Delete endpoint (DELETE method)
app.delete('/delete', authenticateToken, (req, res) => {
    try {
        const { filename } = req.body;

        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        // Construct the full file path
        const filePath = path.join(uploadDir, filename);

        // Security check: ensure the file path is within the upload directory
        const resolvedPath = path.resolve(filePath);
        const resolvedUploadDir = path.resolve(uploadDir);

        if (!resolvedPath.startsWith(resolvedUploadDir)) {
            return res.status(403).json({ error: 'Access denied: Invalid file path' });
        }

        // Check if file exists
        if (!fs.existsSync(resolvedPath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Delete the file
        fs.unlinkSync(resolvedPath);

        console.log(`🗑️ File deleted: ${filename}`);

        res.json({
            success: true,
            message: 'File deleted successfully',
            filename: filename
        });

    } catch (error) {
        console.error('❌ Delete error:', error);
        res.status(500).json({ error: 'Delete failed', message: error.message });
    }
});

// POST version of delete endpoint for compatibility
app.post('/delete', authenticateToken, (req, res) => {
    try {
        const { filename, action } = req.body;

        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        if (action !== 'delete') {
            return res.status(400).json({ error: 'Invalid action. Use action: "delete"' });
        }

        // Construct the full file path
        const filePath = path.join(uploadDir, filename);

        // Security check: ensure the file path is within the upload directory
        const resolvedPath = path.resolve(filePath);
        const resolvedUploadDir = path.resolve(uploadDir);

        if (!resolvedPath.startsWith(resolvedUploadDir)) {
            return res.status(403).json({ error: 'Access denied: Invalid file path' });
        }

        // Check if file exists
        if (!fs.existsSync(resolvedPath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Delete the file
        fs.unlinkSync(resolvedPath);

        console.log(`🗑️ File deleted: ${filename}`);

        res.json({
            success: true,
            message: 'File deleted successfully',
            filename: filename
        });

    } catch (error) {
        console.error('❌ Delete error:', error);
        res.status(500).json({ error: 'Delete failed', message: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        endpoints: {
            upload: '/upload',
            files: '/files/*'
        }
    });
});

// Test auth
app.get('/test-auth', authenticateToken, (req, res) => {
    res.json({ message: 'Authentication successful!' });
});

// Existing Flmngr binding
bindFlmngr({
    app: app,
    urlFileManager: "/flmngr",
    urlFiles: "/files/",
    dirFiles: uploadDir
});

app.get("/file-server", (req, res) => {
    fs.readFile('./test/flmngr-example.html', 'utf8', (err, text) => {
        if (err) {
            res.status(500).send('Error loading file manager');
            return;
        }
        res.send(text);
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "ClipperUltimatePro File Server",
        endpoints: {
            upload: "/upload",
            files: "/files/*",
            health: "/health"
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 File Server started on PORT: ${PORT}`);
    console.log(`📁 Upload: http://localhost:${PORT}/upload`);
    console.log(`📂 Files: http://localhost:${PORT}/files/`);
});
