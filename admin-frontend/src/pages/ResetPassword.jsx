import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("fb7a23e3d1d92bf9252fe0ecaef0aa00397b92a46b4899ebc9181e0691b448bb");   // ✅ fixed
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }), // ✅ send correct token
      });
      const data = await res.json();
      setMessage(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-card">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {message && <p style={{ textAlign: "center", marginTop: "1rem" }}>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
