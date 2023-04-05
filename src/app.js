import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const usuario = req.body;

    usuarios.push(usuario);
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    const usuarioCadastrado = usuarios.find(user => user.username === username);
    
    if(!usuarioCadastrado){
        return res.send("UNAUTHORIZED");
    }

    const novoTweet = { username, tweet };
    tweets.push(novoTweet);
    return res.send("OK");
})

app.get("/tweets", (req, res) => {
    
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));