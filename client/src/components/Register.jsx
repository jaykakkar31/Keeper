import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
function Register(props) {
	const [registerDetails, setRegisterDetails] = useState({
		email: "",
		username: "",
		password: "",
	});
	function handleChange(event) {
		const { name, value } = event.target;
		console.log(name);
		setRegisterDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}
	function submit(event) {
		event.preventDefault();

		if (registerDetails.email === "") {
			alert("Email Cannot Be Empty");
		} else if (registerDetails.username === "") {
			alert("Username Cannot Be Empty");
		} else if (registerDetails.password === "") {
			alert("Password Cannot Be Empty");
		} else {
			props.register(registerDetails);
			console.log(registerDetails);
		}
		setRegisterDetails({
			email: "",
			username: "",
			password: "",
		});
	}
	const handleLogin = (googleData) => {
		//HANDLED BY GOOGLE
		console.log(googleData);

		props.gLogin(googleData);
	};
	const responseFacebook = (facebookData) => {
		console.log(facebookData);
		props.fLogin(facebookData);
	};
	return (
		<div className="login-reg-panel">
			<div className="white-panel">
				<div className="register-show">
					<h2>REGISTER</h2>
					<form>
						<input
							onChange={handleChange}
							type="email"
							placeholder="Email"
							name="email"
							value={registerDetails.email}
						/>
						<input
							onChange={handleChange}
							type="text"
							placeholder="Username"
							name="username"
							value={registerDetails.username}
						/>
						<input
							onChange={handleChange}
							type="password"
							placeholder="Password"
							name="password"
							value={registerDetails.password}
						/>
						<button onClick={submit}>Register</button>
					</form>
					{/* <input type="button" value="Register" /> */}
				</div>
			</div>
			<div className="text-box">
				<div className="text-box-google">
					<GoogleLogin
						clientId="837365515394-u5pmlk1o41fb91hk735a6bjrgmk2m80n.apps.googleusercontent.com"
						buttonText="Log in with Google"
						render={(renderProps) => (
							<button className="google" onClick={renderProps.onClick}>
								<div className="icon">
									<img src="https://prodcmscdn.azureedge.net/careerconnectresources/p/MICRUS/en_us/desktop/assets/images/google.png"></img>
								</div>
								<div className="text">
									<h3>Sign in with Google</h3>
								</div>
							</button>
						)}
						onSuccess={handleLogin}
						onFailure={handleLogin}
						cookiePolicy={"single_host_origin"}
					/>
				</div>
				<p>OR</p>
				<div className="text-box-facebook">
					<FacebookLogin
						appId="2596745693959725"
						callback={responseFacebook}
						render={(renderProps) => (
							<button className="facebook" onClick={renderProps.onClick}>
								<div className="icon">
									<img src="https://prodcmscdn.azureedge.net/careerconnectresources/p/MICRUS/en_us/desktop/assets/images/fb.jpg"></img>
								</div>
								<div className="text">
									<h3>Sign in with Facebook</h3>
								</div>
							</button>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
export default Register;
