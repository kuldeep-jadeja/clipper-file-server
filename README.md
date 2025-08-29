# 📁 Clipper File Server

> 🚀 A powerful and elegant Node.js file server powered by Express and Flmngr for seamless file management

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

## 📖 Description

Welcome to **Clipper File Server** - your go-to solution for lightweight yet powerful file management! 🎯

This project creates a robust server environment that seamlessly handles file uploads, organization, and management. Built with the reliability of Express.js and enhanced with the feature-rich Flmngr library, it provides an intuitive web interface for all your file management needs.

Whether you're building a content management system, creating a file sharing platform, or just need a simple way to handle file uploads, Clipper File Server has got you covered! 💪

## ✨ Features

-   📤 **Effortless File Uploads**: Drag and drop files with ease
-   🗂️ **Smart File Organization**: Browse, organize, and manage your files intuitively
-   🎨 **Rich UI Experience**: Beautiful, responsive file manager interface powered by Flmngr
-   ⚡ **Express.js Foundation**: Built on the rock-solid Express.js framework for reliability
-   🔧 **Zero-Config Setup**: Get up and running in minutes with minimal configuration
-   🌐 **Cross-Platform**: Works seamlessly across different operating systems
-   📱 **Responsive Design**: Access your files from any device

## 🚀 Getting Started

Ready to dive in? Let's get your file server up and running!

### 📋 Prerequisites

Before we begin, make sure you have these tools installed:

-   🟢 [Node.js](https://nodejs.org/) (v14 or later recommended)
-   📦 [npm](https://www.npmjs.com/) (comes with Node.js)

### 🛠️ Installation

Follow these simple steps to set up your file server:

1. **Clone the repository** 📥

    ```bash
    git clone https://github.com/kuldeep-jadeja/clipper-file-server.git
    cd clipper-file-server
    ```

2. **Install dependencies** 📚
    ```bash
    npm install
    ```

### 🎬 Running the Server

Time to bring your server to life!

1. **Start the server** 🚦

    ```bash
    node app.js
    ```

2. **Success!** 🎉 You'll see this message in your console:

    ```
    Server Started at PORT: 3041
    ```

3. **Access your file manager** 🌐

    Open your favorite browser and navigate to:

    🏠 **Home Page**: [http://localhost:3041](http://localhost:3041)

    📁 **File Manager**: [http://localhost:3041/file-server](http://localhost:3041/file-server)

The Flmngr interface will load, giving you full control over your file management operations!

## 🎯 Usage Examples

### Basic File Operations

-   **Upload files**: Simply drag and drop files into the interface
-   **Create folders**: Right-click to create new directories
-   **Move files**: Drag files between folders
-   **Delete files**: Select and delete unwanted files
-   **Preview files**: Click on files to preview them

### API Endpoints

-   `GET /` - Welcome message
-   `GET /file-server` - File manager interface
-   `POST /flmngr` - File management operations
-   `GET /files/*` - Access uploaded files

## 📁 Project Structure

Here's what's inside your file server:

```
clipper-file-server/
├── 📄 app.js                    # 🚀 Main server application
├── 📄 package.json              # 📦 Project metadata and dependencies
├── 📄 README.md                 # 📖 You are here!
├── 📂 public/
│   └── 📂 upload/              # 💾 File storage directory
└── 📂 test/
    ├── 📄 flmngr-example.html   # 🎨 File manager demo page
    └── 📄 flmngr-example.js     # ⚙️ Client-side JavaScript
```

### 📝 File Descriptions

| File                       | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `app.js`                   | 🎯 The heart of your server - handles routing and Flmngr integration |
| `package.json`             | 📋 Contains project info, scripts, and dependency management         |
| `public/upload/`           | 🗃️ Your file storage vault - all uploaded files live here            |
| `test/flmngr-example.html` | 🖥️ Demo interface showcasing the file manager capabilities           |
| `test/flmngr-example.js`   | 🔧 Client-side logic for the file manager interface                  |

## 🛠️ Dependencies

Our carefully chosen tech stack:

| Package                                 | Version | Purpose                                    |
| --------------------------------------- | ------- | ------------------------------------------ |
| 🚀 `express`                            | Latest  | Fast, minimalist web framework for Node.js |
| 📁 `@flmngr/flmngr-server-node-express` | ^1.5.3  | Server-side Flmngr integration for Express |
| 🎨 `flmngr`                             | ^2.0.19 | Rich file manager client-side library      |

## 🔧 Configuration

### Environment Variables

You can customize your server using these environment variables:

```bash
PORT=3041                    # 🚪 Server port (default: 3041)
```

### Custom Configuration

Want to customize your setup? Here are some options:

```javascript
// In app.js, you can modify:
const PORT = process.env.PORT || 3041; // 🚪 Change default port
dirFiles: "./public/upload"; // 📁 Change upload directory
urlFiles: "/files/"; // 🌐 Change file access URL
urlFileManager: "/flmngr"; // 🎛️ Change manager URL
```

## 🚨 Troubleshooting

### Common Issues

| Problem                            | Solution                                                                |
| ---------------------------------- | ----------------------------------------------------------------------- |
| 🚫 Port already in use             | Change the PORT environment variable or kill the process using the port |
| 📁 Upload folder not found         | The server creates it automatically, but ensure write permissions       |
| 🌐 Can't access from other devices | Use `0.0.0.0` instead of `localhost` and check firewall settings        |

### Debug Mode

Run the server with debug information:

```bash
DEBUG=* node app.js
```

## 🤝 Contributing

We love contributions! Here's how you can help make Clipper File Server even better:

1. 🍴 **Fork** the repository
2. 🌟 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💫 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🎉 **Open** a Pull Request

## 📜 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   💝 Built with love using [Express.js](https://expressjs.com/)
-   🎨 Powered by the amazing [Flmngr](https://flmngr.com/) file manager
-   🌟 Inspired by the need for simple yet powerful file management solutions

## 📞 Support

Having issues or questions? We're here to help!

-   🐛 **Bug Reports**: [Create an issue](https://github.com/kuldeep-jadeja/clipper-file-server/issues)
-   💡 **Feature Requests**: [Start a discussion](https://github.com/kuldeep-jadeja/clipper-file-server/discussions)
-   📧 **Contact**: Open an issue for any questions

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by [Kuldeep Jadeja](https://github.com/kuldeep-jadeja)

</div>
