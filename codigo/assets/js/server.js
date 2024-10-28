const http = require("http");
const fs = require("fs");
var url = require('url');

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    const vetorClientes = await carregaClientes();
    if (req.url.startsWith('/clientes/') && req.method === 'OPTIONS') {
        console.log(req.method);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("OPTIONS ok");
    }  
    else if (req.url.startsWith('/clientes/') && req.method === 'POST') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        console.log(req.method);
        let body = '';
        req.on('data', buffer => {
            body += buffer.toString(); // converte do buffer para string à medida que bytes são recebidos (assincrono)
        });
        req.on('end', async () => {
            let idAutomatico =  gerarId(vetorClientes); 
            const novoCliente = {...JSON.parse(body), id:idAutomatico, idContaConjunta:null , metas: [], gastos: [], entradas: []};
            if(verificaClienteEmail(novoCliente.email,vetorClientes) == null) {
                vetorClientes.cliente.push(novoCliente);
                atualizarArquivo(vetorClientes);
                res.end(JSON.stringify(novoCliente)); 
            }
            else res.end("Já existe outra conta com este email");
        });
    }  
    else if (req.url.startsWith('/clientes/') && req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        let parametros = url.parse(req.url, true).query;
        if(!parametros.id) {
            console.log("GET ALL");
            res.end(JSON.stringify(vetorClientes.cliente, null, "\t"));
        }
        else {
            console.log("GET id:" + parametros.id)
            const indiceCliente = verificaClienteId(parametros.id, vetorClientes);
            if(indiceCliente != null) {
                res.end(JSON.stringify(vetorClientes.cliente[indiceCliente], null, "\t"));
            }
            else res.end("Usuário não encontrado");
        }
    }
    else if (req.url.startsWith('/clientes/') && req.method === 'PUT') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        let body = '';
        req.on('data', buffer => {
            body += buffer.toString();
        });
        req.on('end', async () => {
            const clienteAlterado = JSON.parse(body);
            console.log("PUT id:" + clienteAlterado.id);
            if(clienteAlterado.id != null) {
                let indiceCliente = verificaClienteId(clienteAlterado.id, vetorClientes);
                if(indiceCliente != null) {
                    if(clienteAlterado.email == vetorClientes.cliente[indiceCliente].email 
                    || verificaClienteEmail(clienteAlterado.email, vetorClientes) == null) {
                        if(clienteAlterado.nome != null && clienteAlterado.nome !== "") {
                            vetorClientes.cliente[indiceCliente].nome = clienteAlterado.nome;
                        }
                        if(clienteAlterado.email != null && clienteAlterado.email !== "") {
                            vetorClientes.cliente[indiceCliente].email = clienteAlterado.email;
                        }
                        if(clienteAlterado.pw_hash != null && clienteAlterado.pw_hash !== "") {
                            vetorClientes.cliente[indiceCliente].pw_hash = clienteAlterado.pw_hash;
                        }
                        if(clienteAlterado.metas != null) {
                            vetorClientes.cliente[indiceCliente].metas = clienteAlterado.metas;                        
                        }
                        if(clienteAlterado.gastos != null) {
                            vetorClientes.cliente[indiceCliente].gastos = clienteAlterado.gastos;
                        }
                        if(clienteAlterado.entradas != null) {
                            vetorClientes.cliente[indiceCliente].entradas = clienteAlterado.entradas;
                        }
                        atualizarArquivo(vetorClientes);
                        res.end(JSON.stringify(clienteAlterado));
                    }
                    else {
                        res.end(JSON.stringify(vetorClientes.cliente[indiceCliente]));
                    }
                }
                else {
                    res.end("Cliente não encontrado");
                }
            } 
            else res.end("id não foi informado");
        });
    }
    else if (req.url.startsWith('/clientes/') && req.method === 'DELETE') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        var parametros = url.parse(req.url, true).query;
        console.log("DELETE id:" + parametros.id);
        let indiceCliente = verificaClienteId(parametros.id, vetorClientes);
        if(indiceCliente != null) {
            const clienteDeletado = vetorClientes.cliente.splice(indiceCliente,1);
            atualizarArquivo(vetorClientes);
            res.end(JSON.stringify(clienteDeletado, null, "\t"));
        } else {
            res.end("Cliente não encontrado")
        }
    }
    else {
        console.log("Erro 404")
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
    }
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

function verificaClienteId(id, vetorClientes) {
    for(let i = 0; i < vetorClientes.cliente.length; i++) {
        if(id == vetorClientes.cliente[i].id) {
            return i;
        }
    }
    return null;
}

function verificaClienteEmail(email, vetorClientes) {
    for(let i = 0; i < vetorClientes.cliente.length; i++) {
        if(email == vetorClientes.cliente[i].email) {
            return i;
        }
    }
    return null;
}

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
        fs.readFile('./codigo/assets/json/clientes.json', "utf8", (error, data) => {
            if (error) {
              reject(error);
            }
            const objClientes = JSON.parse(data);
            if (Array.isArray(objClientes.cliente)) {
                resolve(objClientes);
            }
            else resolve([]);
        });
    })
}

async function atualizarArquivo(vetorClientes) {
    return new Promise((resolve,reject) => {
        fs.writeFile('./codigo/assets/json/clientes.json', JSON.stringify(vetorClientes, null, "\t"), "utf8", err => {
            if (err) {
              console.error("Erro ao atualizar o arquivo");
            } else {
              console.log("Arquivo atualizado com sucesso")
            }
        });
    })
}

