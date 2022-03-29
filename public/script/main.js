function toggleMobileMenu(menu){
    menu.classList.toggle('open');
}

const app = Vue.createApp({
    data() {
        
        return {
            tierlist: [{name:"S", color:"green"},{name:"A", color:"aqua"},{name:"B", color:"orange"},{name:"C", color:"orangered"},{name:"D", color:"red"} ],
            profiles : [],
        }
    },
    methods: {
        // Permet de contacter l'api pour creer un compte et de s'y connecter
        register() {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://localhost:8001/register')
            xhr.setRequestHeader('Content-Type', 'application/json', false)
            xhr.send(JSON.stringify({email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                password2: document.getElementById('password2').value,
                pseudo: document.getElementById('pseudo').value,
                friendcode: document.getElementById('friendcode').value
            }))
        },
        login() {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://localhost:8001/login')
            xhr.setRequestHeader('Content-Type', 'application/json', false)
            xhr.send(JSON.stringify({email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }))
            console.log({email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
            xhr.onload = () => {
                if(xhr.status==200){
                    window.location.href = 'http://localhost:8001/'
                } else {
                    console.log(xhr.status)
                }
              }
        },
        updateList(){
            const xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://localhost:8001/searchprof')
            xhr.setRequestHeader('Content-Type', 'application/json', false)
            xhr.send(JSON.stringify({search: document.getElementById('nav-bar-input').value
            }))
        },
        },
        created(){
            // requete get 
        }
})