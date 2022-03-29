app.component("advfunc", {
    template:
    `
    <header-smash></header-smash>
      <navi-dex></navi-dex>
        <div id="loginator">
          <img draggable="false" src="../assets/images/user.jpg">
          <form id="reg-form" @submit.prevent="changepsw">

            <input 
              type="email"
              id="email"
              name="email"
              placeholder="E-mail*"
              required
            >
            <input 
              type="password"
              id="password"
              name="password"
              placeholder="Old Password*"
              required
            >
            <input 
              type="password"
              id="password2"
              name="password2"
              placeholder="New password*"
              required
            >
            <input 
              type="password"
              id="password3"
              name="password3"
              placeholder="Confirm new password*"
              required
            >
            
            <input
              type="friendcode"
              id="friendcode"
              name="friendcode"
              placeholder="add/change Friend Code"
            >
            <div>
            <input type="submit" value="Make modification">
          </div>
          </form>
          
          <a href="/delete">Delete account?</a>
        </div>
      <footer-smash></footer-smash>
    `,
    methods: {
        // Permet de contacter l'api pour changer le mdp et le friendcode
        changepsw() {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', 'https://polysmash.cluster-ig3.igpolytech.fr/changepsw')
            xhr.setRequestHeader('Content-Type', 'application/json', false)
            xhr.send(JSON.stringify({email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                password2: document.getElementById('password2').value,
                password3: document.getElementById('password3').value,
                friendcode: document.getElementById('friendcode').value
            }))
        }
    }
})