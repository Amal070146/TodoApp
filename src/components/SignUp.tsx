import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerurl } from "../api";
import { axiosPrivate } from "../api/api";
import { AxiosError } from "axios";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle = async () => {
    console.log(username, password);
    if (password == confirmPassword) {
      try {
       const response = await axiosPrivate.post(
         registerurl,
         JSON.stringify({ username: username, password: password }),
         {
           headers: { "Content-Type": "application/json" },
         }
       );
       console.log(response);
       console.log(response?.data);
       console.log(JSON.stringify(response));
      
       setTimeout(() => {
         navigate("/login");
       }, 3000);
      } catch (err: unknown) {
        const errors = err as AxiosError;
        if (!errors?.response) {
          console.log("No Server Response");
          setError("No Server Response");
        } else {
          console.log("Registration Failed");
          console.log(errors.response);
          setError("Registration Failed");
        }
      }
    } else {
      setError("PAssword Mismatched");
    }
  };
  return (
    <div className="signup">
      <div className="signupinside">
        <h2>Register</h2>
        {error && <p>{error}</p>}
        <form>
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
          <div>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={handle}>
            Register
          </button>
        </form>
        <div>
          <p>
            Already have account <a href="/login">LogIn Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
