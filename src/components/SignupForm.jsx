import React from 'react';
import './SignupForm.css';

function SignupForm() {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>SignUp</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
      <div className="login-redirect">
        <p>
          Have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
