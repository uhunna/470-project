import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs
      );
    
      const { token, user } = response.data;
      // Store token and user info in sessionStorage (specific to each tab)
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("username", user.username);
  
      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.response?.data || "An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        {error && <span className="error">{error}</span>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;