import { useState } from "react";
import "./auth.css";
import { auth } from "../../api/api";

export default function Auth() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginUsername, setLoginUsername] = useState("sianami123@gmail.com");
  const [loginPassword, setLoginPassword] = useState("12345678");
  const [signupUsername, setSignupUsername] = useState("sianami123");
  const [signupEmail, setSignupEmail] = useState("sianami123@gmail.com");
  const [signupPassword, setSignupPassword] = useState("12345678");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // const response = await auth.login(loginUsername, loginPassword);
    // console.log(response);
    // if (response.accessToken) {
    //   localStorage.setItem("token", response.accessToken);
    //   //   window.location.href = "/";
    // }

    window.location.href = "/";
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const response = await auth.signup(
      signupUsername,
      signupEmail,
      signupPassword
    );
    console.log(response);
    if (response.accessToken) {
      localStorage.setItem("token", response.accessToken);
      window.location.href = "/";
    }
  }

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              {["facebook-f", "twitter", "google", "linkedin-in"].map(
                (icon) => (
                  <a key={icon} href="#" className="social-icon">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                )
              )}
            </div>
          </form>

          <form className="sign-up-form" onSubmit={handleSignup}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              {["facebook-f", "twitter", "google", "linkedin-in"].map(
                (icon) => (
                  <a key={icon} href="#" className="social-icon">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                )
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={() => setIsSignUpMode(true)}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={() => setIsSignUpMode(false)}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
