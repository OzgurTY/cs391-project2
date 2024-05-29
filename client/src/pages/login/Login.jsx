import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, error, dispatch, user } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch)
  };

  console.log(user);

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">OZUGRAM</h3>
                <span className="loginDesc">
                    Find your university friends and share your memories with them!
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" required type="email" className="loginInput" ref={email} />
                    <input placeholder="Password" required minLength="8" type="password" className="loginInput" ref={password} />
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="15px" /> : "Login"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to="/register" style={ {textDecoration: "none" }}>
                        <span className="registerLabel">Don't you have an account? Create here.</span>
                    </Link>
          
                </form>
            </div>
        </div>
    </div>
  )
}
