import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import useAuth from "../api/auth";
import { tokenurl } from "../api";
import { axiosPrivate } from "../api/api";

const Login: React.FC = () => {
  const { setAuth }: any = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [storedusername, setStoredUsername] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setStoredUsername(storedUsername);
      setStoredPassword(storedPassword);
    }
  }, []);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating login success/failure
    if (username === storedusername && password === storedPassword) {
      // Login success, navigate to home page
      navigate("/home");
    } else {
      // Login failure, display error message
      setError("Invalid username or password");
    }
  };
  const handle = async () => {
    console.log(username, password);
    axios
      .post(
        "https://mulearn-internship-task-production.up.railway.app/api/token/",
        { username: username, password: password }
      )
      .then((response) => {
        console.log(response);
        let access = response.data.access;
        access && localStorage.setItem("access", access);
        if (response.data) {
          navigate("/home");
        }
      });

    try {
      const response = await axiosPrivate.post(
        tokenurl,
        JSON.stringify({ username: username, password: password })
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access;
      localStorage.setItem("accessToken", accessToken);
      setAuth({ username, password, accessToken });

      localStorage.clear();
      localStorage.setItem("access", accessToken);
      setTimeout(() => {
        navigate("/home");
      }, 500);
      console.log("login successful");
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (!error?.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (error.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
