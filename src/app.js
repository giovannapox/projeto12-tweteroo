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
    console.log(usuarioCadastrado)
    
    if(!usuarioCadastrado){
        return res.status(401).send("UNAUTHORIZED");
    }

    const novoTweet = { username, tweet };
    tweets.push(novoTweet);
    return res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
    const ultimosTweets = [];

    for (let i = 0; i < 10; i++) {
        
        if (i < tweets.length) {
            ultimosTweets.push({
                username: tweets[i].username,
                avatar: acharAvatar(tweets[i].username),
                tweet: tweets[i].tweet,
            });
        }
      }

    return res.send(ultimosTweets);
})

function acharAvatar (username) {
    const user = usuarios.find((u) => username === u.username);
    return user.avatar;
  }

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));