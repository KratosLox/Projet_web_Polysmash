const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const bcrypt = require("bcrypt")
/*
const session = require("express-session")
const passport = require("passport")
const flash = require("express-flash")
*/

app.use(express.urlencoded({ extended: false }));

app.use(cors())

const port = 8001;

/*
app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
)*/

const Pool = require('pg').Pool
const pool = new Pool({
  host: "dokku-postgres-polysmash-db",
  user: "postgres",
  port: "5432",
  password: "62d3612b1942b3a20f0a4985c88a956d",
  database: "polysmash_db"
  
})


//app.use(express.json())
const fs = require('fs')
let cookieParser = require('cookie-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
*/
app.use(cookieParser())
const COOKIE_SECRET = 'dashldhe128ewhgcvasdy7et2hvhwytt2'
const SESSIONS = {}


app.get('/', function(req, res) {
  console.log("Connexion page home")
  res.sendFile( __dirname  + '/public/pages/home.html');
})
app.get('/login', function(req, res) {
  if(SESSIONS.hasOwnProperty(req.cookies.sessionId)) {
    console.log("Connexion page home")
    res.sendFile( __dirname  + '/public/pages/home.html');
  }
  else {
    console.log("Connexion page login")
    res.sendFile( __dirname  + '/public/pages/login.html');
  }
})
app.get('/register', function(req, res) {
  if(SESSIONS.hasOwnProperty(req.cookies.sessionId)) {
    console.log("Connexion page home")
    res.sendFile( __dirname  + '/public/pages/home.html');
  }
  else {
    console.log("Connexion page register")
    res.sendFile( __dirname  + '/public/pages/register.html');
  }
})
app.get('/profile', function(req, res) {
  if(SESSIONS.hasOwnProperty(req.cookies.sessionId)) {
    console.log("Connexion page profile")
    res.sendFile( __dirname  + '/public/pages/profile.html');
  }
  else {
    console.log("Connexion page home")
    res.sendFile( __dirname  + '/public/pages/home.html');
  }
})
app.get('/tierlist', function(req, res) {
  console.log("Connexion page tierlist")
  res.sendFile( __dirname  + '/public/pages/tierlist.html');
})
app.get('/search', function(req, res) {
  console.log("Connexion page search")
  res.sendFile( __dirname  + '/public/pages/search.html');
})
app.get('/advfunction', function(req, res) {
  if(SESSIONS.hasOwnProperty(req.cookies.sessionId)) {
    console.log("Connexion page advfunc")
    res.sendFile( __dirname  + '/public/pages/advfunction.html')
  }
  else{
    res.status(401).send("Error 401 : Unauthorized")
  }
  ;
})
app.get('/delete', function(req, res) {
  if(SESSIONS.hasOwnProperty(req.cookies.sessionId)) {
    console.log("Connexion page delete")
    res.sendFile( __dirname  + '/public/pages/delete.html')
  }
  else{
    res.status(401).send("Error 401 : Unauthorized")
  }
  ;
})


app.post('/public/pages/register.html', (req, res) => {
  let { email, password, password2, pseudo, friendcode} = req.body;

  console.log({email, password, password2, pseudo, friendcode});
})




app.post('/login', (req, res) => {
  if(SESSIONS.hasOwnProperty(req.cookies.sessionId)) {
    res.status(401).send("Error 401 : Unauthorized")
  }
  else {
    pool.query("SELECT count(*) FROM smashuser WHERE mail='" + req.body.email + "' and pssworduser='" + req.body.password + "' and isbanned ='f';", (error, results) => {
      if (error) {
          res.status(500).send("Error 500 : Internal Server Error")
          throw error
      } else if(results.rows[0].count==0){
          console.log('Login refused')
          res.status(401).send("Error 401 : Unauthorized")
      } else if(results.rows[0].count==1) {
          console.log('Login authorized')

          const nextSessionId = randomBytes(16).toString('base64')
          res.cookie('sessionId', nextSessionId)
          SESSIONS[nextSessionId] = req.body.email
          console.log(SESSIONS)
          res.redirect(200, '/')
      } else {
          res.status(500).send("Error 500 : Internal Server Error")
          throw error
      }
    })
  }
})

app.post('/register', (req, res) => {
  let { email, password, password2, pseudo, friendcode} = req.body
  console.log({ email, password, password2, pseudo, friendcode})

  let errors = []

  if (!email | !password |!password2 | !pseudo ) {
    errors.push({ message : "Please enter all fields"})
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    console.log('Register refused')
  } else {

    // Validation passed
    pool.query(
      `SELECT * FROM smashuser
        WHERE mail = $1 OR pseudo = $2`,
      [email, pseudo],
      (err, results) => {
        if (err) {
          console.log(err);
        }

        if (results.rows.length > 0) {
          console.log("Email or Pseudo already registered")
        } else {
          pool.query(
            `INSERT INTO smashuser (pseudo, mail, pssworduser, friendcode, adminator, isbanned)
                VALUES ($1, $2, $3, $4, 'f', 'f')
                RETURNING idsmash, pssworduser`,
            [pseudo, email, password, friendcode],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              //req.flash("success_msg", "You are now registered. Please log in");
              res.redirect(200, "/")
            } 
          );
          
        }
      }
    );
  }
})

app.post('/changepsw', (req, res) => {

  let { email, password, password2, password3, friendcode} = req.body
  console.log({ email, password, password2, password3, friendcode})

  let errors = []

  if (!email | !password |!password2 | !password3 ) {
    errors.push({ message : "Please enter all fields"})
  }

  if (password2.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password3 !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    console.log('Change refused')
  } else {

    // Validation passed
    pool.query(
      `SELECT * FROM smashuser
        WHERE mail = $1 AND pssworduser = $2`,
      [email, password],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.rows.length == 0) {
          console.log("Not good password")
        } else {
          if(friendcode == ''){
            pool.query(
              `Update smashuser set pssworduser = $1
               where mail = $3`,
              [password2, email],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                res.redirect(200, "/")
              } 
            );
          }
          else{
            pool.query(
            `Update smashuser set pssworduser = $1,
            friendcode = $2 where mail = $3`,
            [password2, friendcode, email],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              res.redirect(200, "/")
            } 
          );
          }
        }
      }
    );
  }
})

app.post('/deleter', (req, res) => {
  let { email, password, password2, safety} = req.body
  console.log({ email, password, password2, safety})

  let errors = []

  if (!email | !password |!password2 | !safety ) {
    errors.push({ message : "Please enter all fields"})
  }

  if (safety !== 'yes') {
    errors.push({ message: "Safety still on" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    console.log('Delete refused')
  } else {

  // Validation passed
  pool.query(
    `SELECT * FROM smashuser
      WHERE mail = $1 AND pssworduser = $2`,
      [email, password],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.rows.length == 0) {
          console.log("Not good password")
        } else {
          pool.query(
            `Delete from smashuser where mail = $1 and pssworduser = $2`,
            [email, password],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              res.redirect(200, "/")
            } 
          );
          
        }
      }
    );
  }
})

app.get('/logout', function(req, res) {
  const sessionId = req.cookies.sessionId
  delete SESSIONS[sessionId]
  res.clearCookie('sessionId')
  res.redirect('/')
})


app.get('/profile/info', (req, res) => {
   pool.query( `select idsmash, pseudo, mail, friendcode from smashuser where mail='` + SESSIONS[req.cookies.sessionId] + `';`,
    (err, results) => {
      if (err) {
        res.status(500).send('Error 500 : Internal Server Error')
        throw err
      }
      console.log(results.rows[0])
      res.send(results.rows[0]) 
    })
})

app.post('/tierlist/register', (req, res) => {
  let { S } = req.body
  console.log({ S })
})

/*
var dirPath = __dirname;
app.get('/', function (req, res) {
    res.sendFile(`${dirPath}/tierlist.html`);
});
*/


app.post('/searchprof', (req, res) => {
  let search = req.body.search
  if (search.length < 3){
    console.log("Not enough letter")
  }
  else{
    console.log(search)
    pool.query("SELECT * FROM smashuser WHERE pseudo like '%"+ search+ "%'",
    (error, results) => {
      if (error) {
        res.status(500).send('Error 500 : Internal Server Error')
        throw error
      }
      console.log(results.rows[0])
      res.send(results.rows[0]) 
  })
  }
})



// patcher injection sql



/*
app.get('/*', function(req, res, next) {
  let path = __dirname  + '/assets/images/smash icon' + req.originalUrl
  if (fs.existsSync(path)) {
      res.sendFile(path)
  } else {
      next()
  }
})*/
app.get('/*', function(req, res, next) {
  let path = __dirname  + '/public' + req.originalUrl
  if (fs.existsSync(path)) {
      res.sendFile(path)
  } else {
      next()
  }
})

app.use((req, res) => {
  //Erreur URI
  switch(req.method){
      case 'GET':
          res.status(404).send("Error 404 : Not Found</br></br>Ressource " + req.originalUrl);
          console.log("Erreur GET non reconnu : " + req.url)
          break
      case 'POST':
          console.log("Erreur POST non reconnu")
          break
      case 'PUT':
          console.log("Erreur PUT non reconnu")
          break
      case 'DELETE':
          console.log("Erreur DELETE non reconnu")
          break
      default:
          console.log("Méthode '" + req.method + "' non reconnue")
  }
})
// Démarre le serveur à l'adresse 127.0.0.1 sur le port 8001
// Affiche un message dès que le serveur commence à écouter les requêtes
app.listen(port, () => {
  console.log(`Le serveur tourne à l'adresse http://localhost:${port}`);
})
