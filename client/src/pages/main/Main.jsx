//React
import React, { useState, useEffect } from "react";
//MUI components
import { TextField, Grid, Box, Button, Card } from "@material-ui/core";
//Database api
import Axios from "axios";
//Logic components
import useDataBase from "./useDataBase";



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
	const [newUser, setNewUser] = useState("");
	const [userList, setUserList] = useState([]);

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
			setUserList([
				...userList,
				{
					name: name,
					email: email,
					user: user,
				},
			]);
		});
	};

	const getUsers = () => {
		Axios.get("http://localhost:3001/users").then((response) => {
			setUserList(response.data);
		});
	};

	useEffect(() => {
		getUsers();
	});

	const updateUser = (id) => {
		Axios.put("http://localhost:3001/update", { user: newUser, id: id }).then(
			(response) => {
				setUserList(
					userList.map((val) => {
						return val.id == id
							? {
									id: val.id,
									name: val.name,
									email: val.email,
									user: newUser,
							  }
							: val;
					})
				);
			}
		);
	};

	const deleteUser = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
			setUserList(
				userList.filter((val) => {
					return val.id != id;
				})
			);
		});
	};

	const textFieldProps = {
		variant: "outlined",
		size: "small",
		fullWidth: "true",
	};

	return (
		<div>
			<Box my={20}>
				<Box component="h1">Simple CRUD app</Box>
				<Grid container justify="center">
					<Grid item xs={2} md={4} />
					<Grid item xs={8} md={4}>
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
						<Box my={1}>
							<Button
								style={{ paddingBottom: "10px" }}
								variant="contained"
								color="primary"
								onClick={addUsers}
							>
								Add user
							</Button>
						</Box>
						<Grid container justify="center" spacing={2}>
							{userList.map((val, key) => {
								return (
									<Grid item xs={12}>
										<Card>
											<Box my={2}>
												<Box fontWeight={700}>Name: {val.name}</Box>
												<Box fontWeight={700}>Email: {val.email}</Box>
												<Box fontWeight={700}> User: {val.user}</Box>
											</Box>
											<Box
												my={1}
												display="flex"
												justifyContent="center"
												flexDirection={{ xs: "column", sm: "row" }}
											>
												<Box px={1} py={1}>
													<TextField
														label="Rename user"
														size="small"
														variant="outlined"
														onChange={(event) => {
															setNewUser(event.target.value);
														}}
													/>
												</Box>
												<Box px={1} py={1}>
													<Button
														style={{ paddingBottom: "10px" }}
														variant="contained"
														color="primary"
														onClick={() => {
															updateUser(val.id);
														}}
													>
														Update user
													</Button>
												</Box>
												<Box px={1} py={1}>
													<Button
														style={{ paddingBottom: "10px" }}
														variant="contained"
														color="primary"
														onClick={() => {
															deleteUser(val.id);
														}}
													>
														Delete user
													</Button>
												</Box>
											</Box>
										</Card>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
					<Grid item xs={2} md={4} />
				</Grid>
			</Box>
		</div>
	);
}
