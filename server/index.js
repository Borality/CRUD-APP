const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

app.post("/create", (req, res) => {
	console.log(req.body);
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

app.get("/users", (req, res) => {
	db.query("SELECT * FROM users", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

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

app.listen(3001, () => {
	console.log("Working");
});
