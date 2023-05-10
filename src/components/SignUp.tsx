import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");



   const handleSignUp = (e: React.FormEvent) => {
     e.preventDefault();

     // Simulating signup success/failure
     if (email === email && password === confirmPassword) {
       // Signup success, navigate to home page
       localStorage.setItem('email',email);
       localStorage.setItem('password',password);
       window.location.href='/login'
     } else {
       // Signup failure, display error message
       setError("Invalid email or password");
     }
   };

  return (
    <div className="signup">
      <div className="signupinside">
        <h2>Register</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSignUp}>
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
          <div>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
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
