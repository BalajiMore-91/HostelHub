import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../styles/OwnerLogin.css'; // Ensure the path is correct

function OwnerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/owner-login', { // Adjust URL if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.owner_id) {
          localStorage.setItem('owner_id', data.owner_id);
          
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Redirecting to your dashboard...',
            timer: 2000,
            showConfirmButton: false,
          });

          setTimeout(() => navigate('/owner-dashboard'), 2000);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Owner ID Not Found',
            text: 'Please try again.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email or Password',
          text: 'Please check your credentials and try again.',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Swal.fire({
        icon: 'error',
        title: 'Unexpected Error',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  const handleRegistration = () => {
    Swal.fire({
      icon: 'info',
      title: 'Don’t have an account?',
      text: 'Register now!',
      showConfirmButton: true,
    }).then(() => navigate('/owner-register'));
  };

  const handleLoginClick = () => {
    Swal.fire({
      icon: 'info',
      title: 'Redirecting...',
      text: 'Going back to the main website!',
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>🔑 HostelHub - Owner Login</h1>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="📧 Enter your email"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="🔒 Enter your password"
        />
        <button type="submit" className="login-button">🚀 Login</button>

        <div className="info">
          <p>Don't have an account? <button onClick={handleRegistration} className="link-button">Register here</button></p>
        </div>
        <button type="button" className="back-button" onClick={handleLoginClick}>⬅️ Back to Website</button>
      </form>
    </div>
  );
}

export default OwnerLogin;
