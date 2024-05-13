import express from "express";
import UserRouter from "./routes/UserRoutes";

const port = 3000;

const app = express();
app.use(express.json());

app.use(UserRouter);



// rota do método POST
app.listen(port, function () {
    console.log(`Server running on port -> ${port}`);
});