// Variaveis
let nomeUser;
let githubUser;

document.addEventListener('DOMContentLoaded', () => {

    Swal.fire({
        title: 'Seu GitHub username',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then(response => {
                    githubUser = login;
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {



            console.log(result);
            localStorage.setItem('fotoUser', result.value.avatar_url);

            const fotoUser = result.value.avatar_url;

            // Define o valor do cookie com o link da fotoUser
            document.cookie = `fotoUser=${encodeURIComponent(fotoUser)}`;

            //Setando as informações no chat
            document.querySelector('#fotoPerfil1').src = result.value.avatar_url
            document.querySelector('#fotoPerfil2').src = result.value.avatar_url
            document.querySelector('body').style.backgroundImage = "url('/public/img/background.jpg')";
            document.querySelector('body').style.backgroundRepeat = "no-repeat";
            verificaNome(result.value.name); //Verficando se o user tem nome e o colocando 
            document.querySelector('#main').style.display = 'block';

            // Mensagem de confirmação
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Entrando...',
                showConfirmButton: false,
                timer: 1500
            })



        }
    })
})

function verificaNome(nome){
    if (nome == null) {
        nomeUser = 'Sem nome';
        document.querySelector('#nome').innerHTML = nomeUser;
    } else {
        nomeUser = nome;
        document.querySelector('#nome').innerHTML = nomeUser;
    }
}