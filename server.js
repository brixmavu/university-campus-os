const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript', 
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  
  // Normalize URL path
  let filePath = req.url === '/'? '/index.html' : req.url;
  filePath = path.join(PUBLIC_DIR, filePath);
  
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/plain';
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if(err) {
      // SPA FALLBACK: If file not found and no extension, serve index.html
      // This makes client-side routing work on refresh
      if(err.code === 'ENOENT' &&!ext) {
        fs.readFile(path.join(PUBLIC_DIR, '/index.html'), (err, content) => {
          if(err) {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
        return;
      }
      
      // Real 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
        <head><title>404 - Not Found</title>
        <style>
          body{font-family:sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
         .box{background:#1a1a1a;padding:40px;border-radius:12px;border:1px solid #2a2a2a;text-align:center}
          h1{color:#ef4444;margin-bottom:12px}
        </style>
        </head>
        <body>
          <div class="box">
            <h1>404</h1>
            <p>File not found: ${req.url}</p>
            <a href="/" style="color:#3b82f6;">Go Home</a>
          </div>
        </body>
        </html>
      `);
      return;
    }
    
    // Success - serve file with correct content type
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache' // Disable cache during development
    });
    res.end(content, 'utf-8');
  });
});

server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(` University Campus OS Server Running`);
  console.log(` http://localhost:${PORT}`);
  console.log(` http://127.0.0.1:${PORT}`);
  console.log(`========================================\n`);
  console.log(`Serving from: ${PUBLIC_DIR}`);
  console.log(`Press CTRL+C to stop\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nServer stopped. XNOR = 1');
  process.exit(0);
});
