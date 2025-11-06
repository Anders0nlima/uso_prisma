import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function getUser() {
    const user = await prisma.veiculos.findMany()
    console.log(user)
}

getUser()