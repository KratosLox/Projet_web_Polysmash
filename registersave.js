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
      hashedPassword = bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validation passed
      pool.query(
        `SELECT * FROM smashuser
          WHERE mail = $1 OR pseudo = $2`,
        [email, pseudo],
        (err, results) => {
          if (err) {
            console.log(err);
          }
  
          if (results > 0) {
            return res.render("register", {
              message: "Email or Pseudo already registered"
            });
          } else {
            pool.query(
              `INSERT INTO smashuser (pseudo, mail, pssworduser, friendcode, adminator)
                  VALUES ($1, $2, $3, $4, 'f')
                  RETURNING idsmash, pssworduser`,
              [pseudo, email, hashedPassword, friendcode],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/");
              }
            );
          }
        }
      );
    }
  })