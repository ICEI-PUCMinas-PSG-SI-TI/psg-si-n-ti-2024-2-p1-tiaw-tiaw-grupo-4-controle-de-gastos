const http = require("http")
const fs = require("fs");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader("Access-Control-Allow-Methods","*")  
    const cliente = carregaClientes()
    if (req.url === "/" && req.method === 'OPTIONS') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("OPTIONS ok")
    }  
    else if (req.url === "/" && req.method === 'POST') {
        console.log(req.method)
        let body = '';
        req.on('data', buffer => {
            body += buffer.toString(); // converte Buffer para string
        });
        req.on('end', () => {
            // console.log(body);
        });
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("POST ok");
    }  
    else if (req.url === "/" && req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        res.end("GET ALL ok")
    }
    else if (req.url === "/:id" && req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        res.end("GET ID ok");
    }
    else if (req.url === "/:id" && req.method === 'PUT') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        res.end("PUT ok");
    }
    else if (req.url === "/:id" && req.method === 'DELETE') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        res.end("DELETE ok");
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

function carregaClientes()
{
    fs.readFile('../json/clientes.json', "utf8", (error, data) => {
        if (error) {
          console.log(error);
        }
        const clientes = JSON.parse(data);
        
        /*
        console.log(clientes["nome"])
        if (Array.isArray(clientes)) {
            console.log("z")
            return clientes;
        }
        console.log("x")
        return []
        */
    });
}
