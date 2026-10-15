import '../styles/auth.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import ForgotPassword from './ForgotPassword';

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginText,setLoginText] = useState("Login")
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleForgotPasswrod = async (e) =>{
    navigate('/admin/forgot-password')

  }
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoginText("Loading...")
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      console.log(data.role);
      dispatch(setUser({ username: data.username, role: data.role }));

      alert('Login successful!');
      navigate("/admin/dashboard");
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
      setLoginText("Login")
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-card" style={{ maxWidth: '450px' }}>
        <h2 className="form-title">Welcome Back</h2>
        
        <form onSubmit={onSubmitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email Address" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              placeholder="Password" 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </span>
          </div>

          <button type="submit">{loginText}</button>
        </form>

        <p style={{ color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}>
          Haven't an account? <Link to="/admin/register" className="login-link">Register</Link>
        </p>
        <button onClick={handleForgotPasswrod} className='text-sm' style={{boxShadow:'none',font:'12px' ,backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <span style={{ color: 'red',font:'12px' }}>Forgot Password!</span>
        </button>
      </div>
    </div>
  );
};

export default LoginAdmin;
