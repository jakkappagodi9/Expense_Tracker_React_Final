import React, { useContext } from 'react';
import './Emailverification.css';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import { email } from 'zod';

function Emailverification() {
  const navigator = useNavigate();
  const { emailVerification } = useContext(authContext);
  const handleLogin = () => {
    navigator('/login');
  };
  const handleResendEmail = async () => {
    await emailVerification();
    alert('Verification mail resent!! check your inbox');
  };
  return (
    <div className="parent-container">
      <div className="card-verification">
        <div className="icon-wrapper">
          <i className="envelope-icon">✉️</i>
        </div>
        <h2>Verify your email</h2>
        <p>
          We've sent a verification link to your inbox. Please click the link to
          activate your account.
        </p>
        <button className="login-btn" onClick={handleLogin}>
          Go to Login
        </button>
        <span className="resend-text">
          Didn't receive it?{' '}
          <button className="link-btn" onClick={handleResendEmail}>
            Resend email
          </button>
        </span>
      </div>
    </div>
  );
}

export default Emailverification;
