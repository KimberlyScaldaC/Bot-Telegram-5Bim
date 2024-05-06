
import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

const port = 3000;

// rota do método GET
app.get("/", function (req, res) {
   res.json({
    status: 200,
    message: "Ola pessoal",
   }) ;
});

app.get("/api/users", async function (req, res) {
    const users = await prisma.user.findMany();
    res.json({
        status: 200,
        message: "Retornar os usuarios",
        users: users,
    });
});

app.post("/api/user", async function (req, res) {
   const body = req.body;
   const newuser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            id_telegram: body.id_telegram,
        },
   });

});

app.patch("/api/user/:id", async function (req, res) {
    const id = req.params.id;
    const {email,name,id_telegram} = req.body;
    try{
        const newuser = await prisma.user.update({
            where: {
                id: id,

            },
            data: {
                name: name,
                email: email,
                id_telegram: id_telegram,
            },
       });
    }catch(error){

    }
    
 
});

// rota do método POST
app.listen(port, function () {
    console.log(`Server running on port -> ${port}`);
});