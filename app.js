//Importar o módulo express
const express = require('express');
const app = express();

//Importar o módulo HTTP e atribuindo a constante do express e criando um servidor
const http = require('http').createServer(app);

//Importar o socket.io e colocando o http como parâmetro
const io = require('socket.io')(http);

app.use('/public', express.static('public'));

//Rota para página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//Evento para o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log("Um novo Usuário foi conectado")
    //Evento para quando o usuario enviar uma mensagem via socket.io
    socket.on('chat message', (dados) => io.emit('chat message', dados));

    //Evento para quando o usuário se desconectar
    socket.on('disconnect', () => console.log("Um Usuário foi desconectado"));
})

//Iniciar o servidor
const port = 3000;
http.listen(port, () => {
    console.log(`Servidor iniciado: http://localhost:${port}`);
})
