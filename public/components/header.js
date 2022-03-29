app.component('header-smash', {
    template: 
    /*html*/
    `
    <header>
      <div id="brand"><a href="/">PolySmash</a>
      </div>
      <nav>
        <ul>
          <li><a id="heada" href="/">Home</a></li>
          <li><a id="heada" href="/profile">Profile</a></li>
          <li><a id="login" href="/login">Login</a></li>
          <li><a id="register" href="/register">Register</a></li>
          <li><a id="logout" href="/logout">Logout</a></li>
        </ul>
      </nav>
      <div id="hamberger-icon" onclick="toggleMobileMenu(this)">
        <div id="heada" class="bar1"></div>
        <div id="heada" class="bar2"></div>
        <div id="heada" class="bar3"></div>
        <ul class="mobile-menu">
          <li><a id="heada" href="/">Home</a></li>
          <li><a id="heada" href="/profile">Profile</a></li>
          <li><a id="login" href="/login">Login</a></li>
          <li><a id="register" href="/register">Register</a></li>
          <li><a id="logout" href="/logout">Logout</a></li>
        </ul>
      </div>
    </header>`
  })