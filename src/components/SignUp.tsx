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
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
          placeholder="aaa@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
          placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
          placeholder="Re-enter Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <p>
          Already have account <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
