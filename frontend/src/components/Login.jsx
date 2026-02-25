import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // go to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">

      {/* left side quote panel */}
      <div className="login-left">
        <div className="quote-box">
          <h1>TaskFlow</h1>
          <p>
            “Discipline is choosing between what you want now and
            what you want most.”
          </p>
        </div>
      </div>

      {/* form */}
      <div className="login-right">
        <form className="login-form" onSubmit={submitHandler}>
          <h2>Welcome Back</h2>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Enter Workspace</button>
        </form>
      </div>
    </div>
  );
}