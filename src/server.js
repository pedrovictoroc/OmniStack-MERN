const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const cors = require("cors");


const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on('connection', socket =>{ //Quando se conectar, vou entrar na sala dele, isolado de outros
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
})

//Conecta ao banco de dados
mongoose.connect('mongodb+srv://adm:adm@cluster0-d9wsp.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
});

//Area para conferir o estado do servidor Mongo
mongoose.connection.on('error',(err)=>{
    console.log('Erro na conexão com o banco de dados:' + err);
}); //função para erros na conexão

mongoose.connection.on('disconnect',()=> {
    console.log('Aplicação desconectada do banco de dados!');
}); //função de alerta caso desconecte do DB

mongoose.connection.on('connected',()=>{
    console.log('Aplicação conectada ao banco de dados');
});

app.use((req,res,next) =>{
    req.io = io; //Toda função req terá acesso a função io
    return next();  //Processa o Middleware e passa para outras partes do código
});

app.use(express.json()) //ajuda o servidor a entender a estrutura JSON
app.use(express.urlencoded({ extended: true}));     //permite envio de arquivos

app.use('/files', express.static(path.resolve(__dirname,'..','tmp')));


app.use(require("./routes"));

server.listen(process.env.PORT || 3333);