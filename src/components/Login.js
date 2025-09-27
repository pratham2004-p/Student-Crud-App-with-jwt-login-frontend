import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      });

      console.log("Token:", response.data);
      alert("Login success");
      localStorage.setItem("token", response.data);
      window.location.href = "/"; 
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleLogin} autoComplete="off" style={formStyle}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  margin: '50px auto',
  gap: '10px'
};

export default Login;
