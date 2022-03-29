const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "sakurai",
    port: "5432",
    password: "smash5",
    database: "polysmash"
})

client.connect();

client.query(`Select * from smashuser`, (err, res) =>{
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})