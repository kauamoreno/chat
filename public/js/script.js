//Cria uma instância do Socket.IO
const socket = io()

//Seleciona os input
//const nomeInput = document.getElementById('nome');
const mensagemInput = document.getElementById('mensagemInput');
const mensagens = document.getElementById('mensagens');

//Adiciona um evento para o envio do formulário
document.querySelector('#enviar').addEventListener('click', evento => {
    //const nome = nomeInput.value;
    const mensagem = mensagemInput.value;

    evento.preventDefault(); //Previne o envio padrão do formulário para não atualizar a página

    //Método JAVASCRIPT que verifica os valores válido (Não está em branco os campos)
    //EMIT envia um evento chamado "chat message" com um objeto contendo os valores
    //TRIM() é um método que remove os espaços em branco do inicio ao fim de uma string
    mensagem.trim() && socket.emit('chat message', { nome, mensagem });

    //Limpa o input da mensagem e desabilita o input do nome do usuário após a primeira mensagem
    mensagemInput.value = '';
    // nomeInput.disabled = true;
});

//Adiciona um evento de mensagem recebido para o servidor
socket.on('chat message', dados => {
    //Cria um elemento de lista para exibir a mensagem
    const lista = document.createElement('li');
    //Atribuir uma ID de acordo com o seu nome de usuário
    
    
    
    // if (dados.nome === nomeInput.value) {
    //     lista.setAttribute('id', 'usuario')
    // } else {
    //     lista.setAttribute('id', 'outro')
    // }


    //Define o texto da mensagem
    lista.textContent = `${dados.mensagem}`;
    //Adiciona o elemento de mensagens
    mensagens.appendChild(lista);
})