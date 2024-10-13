const http = require("http")
const fs = require("fs");
var url = require('url');

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader("Access-Control-Allow-Methods","*")
    const vetorClientes = await carregaClientes();
    if (req.url === "/" && req.method === 'OPTIONS') {
        console.log(req.method)
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("OPTIONS ok")
    }  
    else if (req.url === "/" && req.method === 'POST') {
        console.log(req.method)
        let body = '';
        req.on('data', buffer => {
            body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
        });
        req.on('end', async () => {
            const novoCliente = JSON.parse(body);
            // gerar um ID não-repetido para este cliente
            vetorClientes.cliente.push(novoCliente)
            await inserirCliente(vetorClientes);
        });
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("POST ok");
    }  
    else if (req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        var parametros = url.parse(req.url, true).query;
        // se houver id, retorna o usuario dessa id
        // se não, retorna todos
        if(parametros.id === undefined)
        {
            console.log("id não informado")
        }
        else console.log("id = " + parametros.id)
        res.end("GET ok");
    }
    else if (req.method === 'PUT') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        var parametros = url.parse(req.url, true).query;
        // se houver id, atualiza o usuario dessa id
        // se não, retorna erro
        console.log("id = " + parametros.id)
        res.end("PUT ok");
    }
    else if (req.method === 'DELETE') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        var parametros = url.parse(req.url, true).query;
        // se houver id, deleta e retorna o usuario dessa id
        // se não, retorna erro
        console.log("id = " + parametros.id)
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

async function carregaClientes()
{
    return new Promise((resolve,reject) => {
        fs.readFile('../json/clientes.json', "utf8", (error, data) => {
            if (error) {
              reject(error);
            }
            const objClientes = JSON.parse(data);
    
            if (Array.isArray(objClientes.cliente)) {
                resolve(objClientes);
            }
            else resolve([])
        });
    })
}

async function inserirCliente(vetorClientes)
{
    return new Promise((resolve,reject) => {
        fs.writeFile('../json/clientes.json', JSON.stringify(vetorClientes, null, "\t"), 'utf8', err => {
            if (err) {
              console.error(err);
            } else {
              console.log("Arquivo atualizado com sucesso")
            }
        });
    })
}

