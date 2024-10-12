const http = require("http")

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader("Access-Control-Allow-Methods","*")
    if (req.url === "/" && req.method === 'OPTIONS') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("Hello, world!")
    }  
    else if (req.url === "/" && req.method === 'POST') {
        let body = '';
        req.on('data', buffer => {
            body += buffer.toString(); // converte Buffer para string
        });
        req.on('end', () => {
            // verificar id, inserir no .json
        });
        res.writeHead(200, { "Content-Type": "text/plain" })
    }  
    else if (req.url === "/" && req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
    }
    else if (req.url === "/" && req.method === 'PUT') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
    }
    else if (req.url === "/" && req.method === 'DELETE') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
    }
    else {
        console.log("Erro 404")
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Page not found")
    }
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
