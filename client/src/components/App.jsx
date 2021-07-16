import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
    NavLink
} from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./createArea";
import Register from "./Register";
import ForgotPass from "./forgotPass";

import {
	getAllNotes,
	createNotes,
	deleteNoteById,
	loginData,
	registerData,
	GLogin,
	FLogin,
	resetPassword,
} from "../services/UserService";

function App() {
	const [isRegister, setIsRegister] = useState(false);

	const [mNotes, setmNotes] = useState([]);
	const [loginResponse, setResponse] = useState();

	const rememberMe = localStorage.getItem("rememberMe");
	const username = localStorage.getItem("username");



	const fetchAllNotes = () => {
		if (rememberMe !== null) {
			console.log("FETCH");

			getAllNotes(rememberMe).then((response) => {
				console.log("Fetch All Notes Called");
				console.log(JSON.stringify(response) + "      Fetch All App");
				setmNotes([...response.data.notes]);
			});
		}
	};

	function handleLogin(data) {
		loginData(data).then((response) => {
			console.log(response + "RESPONSE");
			if (
				response.data === "Invalid email or password" ||
				response.data === "Password Is incorrect"
			) {
				setResponse("Invalid email or password");
			} else {
				console.log(JSON.stringify(response) + " LOGIN HANDLe");
				localStorage.setItem("rememberMe", response.data.email);
				localStorage.setItem("username", response.data.username);
				window.location.reload();
			}
		});
	}

	function handleRegister(data) {
		registerData(data).then((response) => {
			console.log(JSON.stringify(response.data) + "  RESPONSe");

			switch (response.data) {
				case "success":
					setIsRegister(true);
					break;
				case "Failure":
					alert("User with this email id already exist");

					setIsRegister(false);
					break;
			}
		});
	}

	function handleClick(newNote) {
		createNotes(newNote, rememberMe).then((response) => {
			console.log("RESPONSE " + response);
			fetchAllNotes();
		});
	}

	function deleteNotesData(data) {
		deleteNoteById(data, rememberMe).then(() => {
			fetchAllNotes();
		});
	}

	function handleLogout() {
		localStorage.clear();
		window.location.reload();
	}

	function googleLogin(googleData) {
		const google = GLogin(googleData);
		google.then((response) => {
			localStorage.setItem("rememberMe", response.data.email);
			localStorage.setItem("username", response.data.username);
			window.location.reload();
		});
	}
	function facebookLogin(facebookData) {
		FLogin(facebookData).then((response) => {
			localStorage.setItem("rememberMe", response.data.email);
			localStorage.setItem("username", response.data.username);
			localStorage.setItem("facebookId", response.data.facebookId);
			window.location.reload();
		});
	}

	
	function newPasswordHandle(resetDetails) {
		resetPassword(resetDetails);
	}
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/login">
						{rememberMe !== null ? (
							<Redirect to="/" />
						) : (
							<Login
								gLogin={googleLogin}
								login={handleLogin}
								LoginResponse={loginResponse}
								fLogin={facebookLogin}
							/>
						)}
					</Route>

					<Route path="/register">
						{isRegister ? (
							<Redirect to="/login" />
						) : (
							<Register
								register={handleRegister}
								gLogin={googleLogin}
								fLogin={facebookLogin}
							/>
						)}
					</Route>
					<Route path="/forgotPass">
						{rememberMe ? (
							<Redirect to="/login" />
						) : (
							<ForgotPass forgotPassword={newPasswordHandle} />
						)}
					</Route>

					<Route path="/">
						{rememberMe !== null ? (
							<div>
								<Header heading={username} logout={handleLogout} />

								<CreateArea addingItems={handleClick} fetchAllNotes={fetchAllNotes} />
								{/* {notes.map((notesData, index) => {  */}

								{mNotes.map((notesData, index) => {
									const { title, content, _id } = notesData;
									{
										/* console.log(index + "  MAP  " + JSON.stringify(notesData)); */
									}

									return (
										<Note
											key={index}
											id={_id}
											title={title}
											notesData={notesData}
											content={content}
											deleteNoteById={deleteNotesData}
										/>
									);
								})}
								<Footer />
							</div>
						) : (
							<Redirect to="/login" />
						)}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
