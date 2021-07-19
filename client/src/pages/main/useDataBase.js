//React
import React, {useState, useEffect} from "react";
//Database api
import Axios from "axios";

export default function useDataBase() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState("");
	const [newUser, setNewUser] = useState("");
	const [userList, setUserList] = useState([]);
	
	//Sets the data of name,email,user in useState
	const setData = (e) => {
		if (e.target.name == "Name") setName(e.target.value);
		else if (e.target.name == "Email") setEmail(e.target.value);
		else if (e.target.name == "User") setUser(e.target.value);
	};
	//Adds the user from the useState into the database
	const addUsers = () => {
		Axios.post("https://mysql-deploy-crud.herokuapp.com/create", {
			name: name,
			email: email,
			user: user,
		//Updates userList to display in app
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
	//Gets the users from database and set it into userList
	const getUsers = () => {
		Axios.get("https://mysql-deploy-crud.herokuapp.com/users").then((response) => {
			setUserList(response.data);
		});
	};

	useEffect(() => {
		getUsers();
	});
	//Updates the user name, could change to update anything like email
	const updateUser = (id) => {
		Axios.put("https://mysql-deploy-crud.herokuapp.com/update", { user: newUser, id: id }).then(
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
	//Deletes user from database and updates userList
	const deleteUser = (id) => {
		Axios.delete(`https://mysql-deploy-crud.herokuapp.com/delete/${id}`).then((response) => {
			setUserList(
				userList.filter((val) => {
					return val.id != id;
				})
			);
		});
	};
	//Adds the new users
	const addNewUsers = (event) => {
		setNewUser(event.target.value);
	}
	return { setData, addUsers, getUsers, updateUser, deleteUser, addNewUsers, userList};
}
