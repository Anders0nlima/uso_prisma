import express from "express"
import { prisma } from "./src/db.js"

const app = express()
app.use(express.json())

app.get("/", async function(req, res) {
    try{
        const users = await prisma.veiculos.findMany();
        res.json(users)
    } catch(error){
        console.log(error)
    }
    
})

app.get("/:id", async (req, res) => {
    const veiculosId = req.params.id

    const veiculo = await prisma.veiculos.findFirst({
        where: {
            id: veiculosId
        }
    })

    console.log(veiculosId)
    res.json(veiculo)

})

app.post("/cadatrar", async (req, res) => {
    const { marca, modelo } = req.body

    if(!modelo){
        res.json({mensagem: "O modelo do veiculo é obrigatorio"})
        return
    }

    const veiculo = await prisma.veiculos.create({
        data: {
            modelo: modelo,
            marca: marca
        }
    })

    res.json(veiculo)

})

app.put("/:id", async (req, res) => {
    const{id} = req.params
    const {modelo, marca} = req.body

    if(!modelo){
        res.json({mensagem: "O modelo do veiculo é obrigatorio"})
        return
    }

    const veiculo = await prisma.veiculos.update({
        where: {id: id},
        data: { modelo: modelo, marca: marca }
    })

    res.json(veiculo)
})

app.delete("/:id", async(req, res) => {
    const {id} = req.params

    const veiculo = await prisma.veiculos.delete({
        where: {id: id}
    })

    res.json({
        mensagem: "veiculo excluido com sucesso",
        veiculo
    })

})

app.listen(3000, () => {
    console.log("Servidor rodando em: http://localhost:3000")
})