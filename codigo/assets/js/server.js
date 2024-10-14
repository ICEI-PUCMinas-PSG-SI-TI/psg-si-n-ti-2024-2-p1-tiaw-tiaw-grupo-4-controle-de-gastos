const http = require("http")
const fs = require("fs");
var url = require('url');

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader("Access-Control-Allow-Methods","*")
    const vetorClientes = await carregaClientes();
    if (req.url === "/" && req.method === 'OPTIONS') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("OPTIONS ok")
    }  
    else if (req.url === "/" && req.method === 'POST') {
        let body = '';
        req.on('data', buffer => {
            body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
        });
        req.on('end', async () => {
            let idAutomatico =  gerarId(vetorClientes); 
            const novoCliente = {id:idAutomatico , ...JSON.parse(body)};
            vetorClientes.cliente.push(novoCliente)
            await atualizarArquivo(vetorClientes);
        });
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("POST ok");
    }  
    else if (req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" })
        console.log(req.method)
        let parametros = url.parse(req.url, true).query;
        if(req.url === "/") {
            res.end(JSON.stringify(vetorClientes.cliente, null, "\t"))
        }
        else {
            let usuarioEncontrado = false, indice
            for(let i = 0; i < vetorClientes.cliente.length; i++) {
                if(parametros.id == vetorClientes.cliente[i].id) {
                    usuarioEncontrado = true;
                    indice = i;
                }
            }
            if(usuarioEncontrado)
            {
                res.end(JSON.stringify(vetorClientes.cliente[indice], null, "\t"));
            }
            else res.end("Usuário não encontrado")
        }
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

function gerarId(vetorClientes) {
    let valido;
    let i;
    if(vetorClientes.cliente.length == 0) {
        return 0;
    }
    else {
        for(i = 0; i <= vetorClientes.cliente.length; i++) {
            valido = true;
            for(let j = 0; j < vetorClientes.cliente.length; j++) {
                if(i == vetorClientes.cliente[j].id) {
                    valido = false;
                }
            }
            if(valido) {
                return i;
            }
        }
    }
}

async function carregaClientes() {
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

async function atualizarArquivo(vetorClientes) {
    return new Promise((resolve,reject) => {
        fs.writeFile('../json/clientes.json', JSON.stringify(vetorClientes, null, "\t"), 'utf8', err => {
            if (err) {
              console.error("Erro ao atualizar o arquivo");
            } else {
              console.log("Arquivo atualizado com sucesso")
            }
        });
    })
}

