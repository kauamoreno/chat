//Cria uma instância do Socket.IO
const socket = io()

//Seleciona os input
const mensagemInput = document.getElementById('mensagemInput');
const nome = document.getElementById('nome');

//Adiciona um evento para o envio do formulário
document.querySelector('#enviar').addEventListener('click', evento => {

    const mensagem = mensagemInput.value;
    evento.preventDefault(); //Previne o envio padrão do formulário para não atualizar a página

    // Pegando imagem pela url
    const params = new URLSearchParams(window.location.search);
    const fotoUserEncriptada = params.get('fotoUser');
    const fotoUser = decodeURIComponent(fotoUserEncriptada);

    //EMIT envia um evento chamado "chat message" com um objeto contendo os valores
    //TRIM() é um método que remove os espaços em branco do inicio ao fim de uma string
    mensagem.trim() && socket.emit('chat message', { nome, mensagem, fotoUser });

    //Limpa o input da mensagem 
    mensagemInput.value = '';
});

//Adiciona um evento de mensagem recebido para o servidor
socket.on('chat message', dados => {

    // Mensagem
    const mensagem = document.createElement('div');
    const mensagemHTML = `
    <div class="mensagemhtml">
        <img width="30px" src="${dados.fotoUser}" alt="" id="fotoPerfil3">
        <div id="balaoMensagem">
            <p id="mensagemTexto">${escapeHTML(dados.mensagem)}</p>
        <div>
    </div>`

    console.log('Nome: ' + dados.nome);
    console.log('foto: ' + dados.fotoUser);

    //Acrescentando a mensagem ao html
    const mensagensDisplay = document.getElementById('mensagens');
    mensagensDisplay.appendChild(mensagem);
    mensagem.innerHTML = mensagemHTML;

    // Rolar automaticamente para o final
    mensagensDisplay.scrollTop = mensagensDisplay.scrollHeight;
})

//Cria uma função para escapar os caracteres especiais do HTML
function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function (match) {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "\"":
                return "&quot;";
            case "'":
                return "&#039;";
        }
    });
}