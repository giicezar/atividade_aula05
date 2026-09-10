const express = require("express")
const inventario = require("../inventario.json")

// Mostrar todos os itens
const mostrarItens = (req, res) => {
    res.send(inventario)
}

// Cadastrar novo item
const novoItem = (req, res) => {
    if (req.body) {
        let novoId = 1

        if (inventario.length > 0) {
            let ultimo = inventario[inventario.length - 1]
            novoId = ultimo.id + 1
        }

        const item = {
            id: novoId,
            item: req.body.item,
            local: req.body.local,
            dataRegistro: req.body.dataRegistro,
            valor: req.body.valor,
            patrimonio: req.body.patrimonio
        }

        inventario.push(item)
        res.send("Item cadastrado com sucesso!")
    } else {
        res.send("Erro ao cadastrar item")
    }
}

// Buscar item por ID
const buscarPorId = (req, res) => {
    const id = req.params.id
    let status = 0

    inventario.forEach((item) => {
        if (item.id == id) {
            res.send(item)
            status = 1
        }
    })

    if (status == 0) {
        res.status(404).send("Item não encontrado")
    }
}

// Excluir item
const excluirItem = (req, res) => {
    const id = req.params.id
    let status = 0

    inventario.forEach((item, indice) => {
        if (item.id == id) {
            inventario.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        res.send("Item excluído com sucesso")
    } else {
        res.status(404).send("Erro ao excluir item")
    }
}

// Atualizar item
const atualizarItem = (req, res) => {
    const id = req.params.id
    const dados = req.body
    let status = 0

    inventario.forEach((item) => {
        if (item.id == id) {
            item.item = dados.item
            item.local = dados.local
            item.dataRegistro = dados.dataRegistro
            item.valor = dados.valor
            item.patrimonio = dados.patrimonio
            status = 1
        }
    })

    if (status == 1) {
        res.send("Item atualizado com sucesso")
    } else {
        res.status(404).send("Erro ao atualizar item")
    }
}

const porta = 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/inventario", novoItem)
app.get("/inventario", mostrarItens)
app.get("/inventario/:id", buscarPorId)
app.delete("/inventario/:id", excluirItem)
app.put("/inventario/:id", atualizarItem)

app.listen(porta, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${porta}/inventario`)
})
