const express = require("express");
const app = express();
const mysql = require("mysql");
//Cors needed for app to work
const cors = require("cors");
require("dotenv").config();
const PORT = 3001;

app.use(cors());
app.use(express.json());
//Database
const db = mysql.createConnection({
	user: "bf2d4a3aff7759",
	host: "us-cdbr-east-04.cleardb.com",
	password: "63e06846",
	database: "heroku_6400f1ff7dc47d5",
});
//Function to post to database
app.post("/create", (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const user = req.body.user;

	db.query(
		"INSERT INTO users (name, email, user) VALUES (?,?,?)",
		[name, email, user],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("values inserted");
			}
		}
	);
});
//Function to get data from database 
app.get("/users", (req, res) => {
	db.query("SELECT * FROM users", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
//Function to update the database
app.put("/update", (req, res) => {
	const id = req.body.id;
	const user = req.body.user;
	db.query(
		"UPDATE users SET user = ? WHERE id = ?",
		[user, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});
//Function to delete something from the database
app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(process.env.PORT || PORT, () => {
	console.log("Working");
});
