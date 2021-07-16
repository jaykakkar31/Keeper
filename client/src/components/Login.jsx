import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function Login(props) {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name);
    setLoginDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function submit(event) {

    if (loginDetails.email === "") {
      alert("Email Cannot Be Empty");
    } else if (loginDetails.password === "") {
      alert("Password Cannot Be Empty");
    } else {
      const response = props.login(loginDetails);

    
    }   
     setLoginDetails({
       email: "",
       password: "",
     });
    event.preventDefault();

     
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleLogin = (googleData) => {
    //HANDLED BY GOOGLE
    console.log(googleData);

    props.gLogin(googleData);
    // axios({
    //   method: "post",
    //   url: "/api/googleLogin",
    //   data: { tokenId: googleData.tokenId ,googleId:googleData.googleId},
    // }).then((response) => {
    //   console.log(JSON.stringify(response) + " RESPONSE");
    // });
    // const data = res.json();
    // console.log(data + "  DATA FROM GOOGLE LOGIN");
    // store returned user somehow
  };
  const responseFacebook = (facebookData) => {
    console.log(facebookData);
    props.fLogin(facebookData);
  };
  return (
    <div className="login-reg-panel">
      <div className="white-panel">
        <div className="login-show">
          <h2>LOGIN</h2>
          <form>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
              value={loginDetails.email}
            />
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="on"
              value={loginDetails.password}
            />

            <button type="submit" onClick={submit}>
              LOGIN
            </button>

            {/* <input type="button" value="Login" /> */}
          </form>
          <a href="/forgotPass">Forgot password?</a>
          <div className="response">
            <p>{props.LoginResponse}</p>
          </div>
          {console.log(props.LoginResponse + "  pppppppppppp")}
        </div>
        <a className="panel-footer" href="/register">
          New to Keeper? &nbsp;
          <span>Sign Up</span>
        </a>
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
export default Login;
