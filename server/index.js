const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "root",
	database: "crud-app",
});
module.exports =  db;


app.post("/create", (req, res) => {
    console.log(req.body);
	const name = req.body.name;
	const email = req.body.email;
	const user = req.body.user;

    db.query("INSERT INTO users (name, email, user) VALUES (?,?,?)"
    [name, email, user],
    (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send("values inserted")
        }
    }
    )
});

app.listen(3001, () => {
	console.log("Working");
});
