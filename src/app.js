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
    return res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    const usuarioCadastrado = usuarios.find(user => user.username === username);
    const avatar = usuarioCadastrado.avatar;
    
    if(!usuarioCadastrado){
        return res.status(401).send("UNAUTHORIZED");
    }

    const novoTweet = { username, tweet, avatar };
    tweets.push(novoTweet);
    return res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
    const ultimosTweets = tweets.slice(-10);
    return res.send(ultimosTweets);
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));