import React, {useState, useEffect} from "react";
import Axios from "axios";

export default function useDataBase(props) {
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

	const addNewUsers = (event) => {
		setNewUser(event.target.value);
	}
	return { setData, addUsers, getUsers, updateUser, deleteUser, addNewUsers, userList};
}
