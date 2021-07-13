//React
import React, { useState } from "react";
//MUI components
import { TextField, Grid, Box, Button } from "@material-ui/core";
//Database api
import Axios from "axios";

const data = [
	{
		text: "Name",
	},
	{
		text: "Email",
	},
	{
		text: "User",
	},
];

export default function Main() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState("");

	const setData = (e) => {
		if (e.target.name == "Name") setName(e.target.value);
		else if (e.target.name == "Email") setEmail(e.target.value);
		else if (e.target.name == "User") setUser(e.target.value);
	};

	const addUsers = () => {
		Axios.post("http://localhost:3001/create", {
			name: name,
			email: email,
			user: user,
		}).then(() => {
            console.log("values inserted yessir")
        })
	};

	const textFieldProps = {
		variant: "outlined",
		size: "small",
		fullWidth: "true",
	};
    
	return (
		<div>
			<Box my={30}>
				<h1>Simple CRUD app</h1>
				<Grid container justify="center">
					<Grid item xs={2} style={{ backgroundColor: "green" }} />
					<Grid item xs={8}>
						{data.map((props) => {
							return (
								<TextField
									label={props.text}
									name={props.text}
									{...textFieldProps}
									onChange={setData}
								/>
							);
						})}
					</Grid>
					<Grid item xs={2} style={{ backgroundColor: "green" }} />
				</Grid>
				<Button onClick = {addUsers}>Button</Button>
			</Box>
		</div>
	);
}
