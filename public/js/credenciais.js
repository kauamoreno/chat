let nome;

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

            //Setando as informações no chat
            document.querySelector('#fotoPerfil1').src = result.value.avatar_url
            document.querySelector('#fotoPerfil2').src = result.value.avatar_url
            
            document.querySelector('body').style.backgroundImage = "url('/public/img/background.jpg')";
            document.querySelector('body').style.backgroundRepeat = "no-repeat";
            
            //Verficando se o user tem nome e o colocando
            if(result.value.name == null){
                nome = 'Sem nome';
                document.querySelector('#nome').innerHTML = nome;
            }else{
                nome = result.value.name
                document.querySelector('#nome').innerHTML = nome;
            }
            document.querySelector('#main').style.display = 'block';

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