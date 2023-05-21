//Cria uma instância do Socket.IO
const socket = io()

//Seleciona os input
//const nomeInput = document.getElementById('nome');
const mensagemInput = document.getElementById('mensagemInput');
const mensagens = document.getElementById('mensagens');

//Adiciona um evento para o envio do formulário
document.querySelector('#enviar').addEventListener('click', evento => {

    const mensagem = mensagemInput.value;
    evento.preventDefault(); //Previne o envio padrão do formulário para não atualizar a página

    //Método JAVASCRIPT que verifica os valores válido (Não está em branco os campos)
    //EMIT envia um evento chamado "chat message" com um objeto contendo os valores
    //TRIM() é um método que remove os espaços em branco do inicio ao fim de uma string
    const fotoUser = localStorage.getItem('fotoUser');
    mensagem.trim() && socket.emit('chat message', { nome, mensagem, fotoUser });

    //Limpa o input da mensagem e desabilita o input do nome do usuário após a primeira mensagem
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