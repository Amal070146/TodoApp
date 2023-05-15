import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setStoredEmail(storedEmail);
      setStoredPassword(storedPassword);
    }
  }, []);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating login success/failure
    if (email === storedEmail && password === storedPassword) {
      // Login success, navigate to home page
      navigate("/home");
    } else {
      // Login failure, display error message
      setError("Invalid email or password");
    }
  };
  const handle = () => {
    console.log(email,password)
    axios
      .post(
        "https://mulearn-internship-task-production.up.railway.app/api/token/",
        { username: email, password: password }
      )
      .then((response) => {
        console.log(response)
        let access = response.data.access
        access && localStorage.setItem("access",access)
        if (response.data) {
          navigate("/home");
        }
      });
      
  };
  return (
    <div className="signup">
      <div className="signupinside">
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <input
              placeholder="Username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handle}>
            Login
          </button>
        </form>
        <div>
          <p>
            Register new account <a href="/">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
