app.component("delete", {
  template:
  `
  <header-smash></header-smash>
      <navi-dex></navi-dex>
      <div id="loginator">
        <img draggable="false" src="../assets/images/user.jpg">
        <form id="reg-form" @submit.prevent="deleter">

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
            placeholder="Password*"
            required
          >
          <input 
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm password*"
            required
          >
          <input
            type="safety"
            id="safety"
            name="safety"
            placeholder="Are you sure?* ('yes')"
            required
          >

          <div>
            <input type="submit" value="Delete" style="color : red; font-weight: bold; ">
          </div>
        </form>
      </div>
      <footer-smash></footer-smash>
  `,
  methods: {
      // Permet de contacter l'api pour supprimer son compte
      deleter() {
          const xhr = new XMLHttpRequest()
          xhr.open('POST', 'https://polysmash.cluster-ig3.igpolytech.fr/deleter')
          xhr.setRequestHeader('Content-Type', 'application/json', false)
          xhr.send(JSON.stringify({email: document.getElementById('email').value,
              password: document.getElementById('password').value,
              password2: document.getElementById('password2').value,
              safety: document.getElementById('safety').value
          }))
      }
  }
})