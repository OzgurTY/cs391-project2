import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
        passwordAgain.current.setCustomValidity("Passwords are not matching!");
    } else {
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        
        try {
            await axios.post("/auth/register", user);
            history("/login");
        } catch (error) {
            console.log(error)
        }
    }
  };

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">OZUGRAM</h3>
                <span className="registerDesc">
                    Find your university friends and share your memories with them!
                </span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="Email" required ref={email} type="email" className="registerInput" />
                    <input placeholder="Username" required ref={username} type="text" className="registerInput" />
                    <input placeholder="Password" required minLength="8" ref={password} type="password" className="registerInput" />
                    <input placeholder="Password Again" required ref={passwordAgain} type="password" className="registerInput" />
                    <button className="registerButton" type="submit">Sign Up</button>
                    <Link to="/login" style={ {textDecoration: "none" }}>
                        <span className="registerLabel">You already have an account? Login here.</span>
                    </Link>
                    {/* <button className="registerLoginButton">Log into your Account</button> */}
                </form>
            </div>
        </div>
    </div>
  )
}
