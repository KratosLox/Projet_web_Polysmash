app.component("profile", {
    template:
    `
    <div>
      <header-smash></header-smash>
      <navi-dex></navi-dex>
      <div id="profil">
        <div id="content">
          <div>
            <img draggable="false" src="../assets/images/user.jpg">
            <br>
            <br>
            Pseudo : {{user.pseudo}}
            <br>
            <br>
            Friend code :
            <br>
            {{user.friendcode}}
            <br> <br> <br>
          </div>
          <div >
            <a id="toMaster" href="/tierlist">
              See {{user.pseudo}}'s Mater Level
            </a>
          </div>
          <div>
            <br>
            <br> <br>
            <br> 
            My personnal data :
            <br>
            <br> 
            Email :
            <br> 
            {{user.mail}}
            <br> 
          </div>
          <a href="/advfunction">Advanced function</a>
          <br>
          <a href="/logout">Logout</a>
        </div>
        
      </div>
      <footer-smash></footer-smash>
    </div>
    `,

    //Permet de récupérer les informations en requêtes json pour les afficher
    data() {
        return {
            user : {}
        }
    },
    created(){
            this.recupInfo()
    },
    methods: {
        recupInfo(){
            const xhr = new XMLHttpRequest()
            xhr.open('GET', 'https://polysmash.cluster-ig3.igpolytech.fr/profile/info')
            xhr.responseType = 'json'
            xhr.onload = () => {
              if(xhr.status == 200) {
                this.user = xhr.response
                console.log(this.user)
              } else {
                alert('Error')
              }
            }
            xhr.send()
            
        },
        computed: {
            user(){return this.user}
        }




        /*
        Va servir pour la recherche de profile
        updateList(){
            let texte = document.getElementById('nav-bar-input').value.toLowerCase()
            
                for(element of document.getElementsByClassName('pokemon')){
                    if(element.querySelector('h3').innerText.toLowerCase().includes(texte)){
                        console.log('j affiche le' + texte)
                        element.style.display = 'block';
                    }
                    else{
                        console.log('je cache le' + texte)
                        element.style.display = 'none';
                    }
            }
        }*/
    },
  })