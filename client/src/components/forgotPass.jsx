import React, { useState } from "react";

function ForgotPass(props) {
  const [resetDetails, setResetDetails] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setResetDetails((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }
  function submit(event) {
    event.preventDefault();

    if (resetDetails.email === "") {
      alert("Email Cannot Be Empty");
    } else if (resetDetails.password === "") {
      alert("Password Cannot Be Empty");
    } else {
      props.forgotPassword(resetDetails);
      console.log(resetDetails);

      setResetDetails({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="login-reg-panel-forgotPass">
      <div className="white-panel-forgotPass">
        <div className="login-show-forgotPass">
          <h2>RESET PASSWORD </h2>
          <form>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
              value={resetDetails.email}
              autoComplete="on"
            />
            <input
              onChange={handleChange}
              type="password"
              placeholder="New Password"
              name="password"
              autoComplete="on"
              value={resetDetails.password}
            />

            <button type="submit" onClick={submit}>
              RESET
            </button>
          </form>
        </div>
        <div className="panel-footer">
          <a href="/login">Sign In</a>
          <span> | </span>
          <a href="/register"> Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
