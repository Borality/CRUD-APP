//React
import React from "react";
//MUI components
import { TextField, Grid, Box, Button, Card } from "@material-ui/core";
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
	const {setData, addUsers, updateUser, deleteUser, addNewUsers, userList} = useDataBase();

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
								<Box my = {1}>
								<TextField
									label={props.text}
									name={props.text}
									{...textFieldProps}
									onChange={setData}
								/>
								</Box>
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
															addNewUsers(event);
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
