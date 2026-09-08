import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (!username || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.status === 400) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      if (response.ok) {
        dispatch(setUser({ username: data.username, role: data.role }));
        setLoading(false);
        navigate("/");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-card">
        <h2 className="form-title">Create Account</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleRegister} className="register-form">
          <div className="profile-grid"> 
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Enter username" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                placeholder="••••••••" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword" 
                name="confirmPassword"
                placeholder="••••••••" 
                required 
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"} Passwords
              </span>
            </div>
          </div>

          <button type="submit">{loading ? "Loading..." : "Register Now"}</button>
        </form>

        <p style={{ color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
