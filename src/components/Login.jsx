import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../config/firebase';

// firebse auth instance

const auth = getAuth(app);

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your email address.')
    .email('Incorrect Email'),
  password: z.string().min(1, 'Please enter your password.'),
});
// Login component
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema), mode: 'onTouched' });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitLoginForm = async (data) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const idToken = await credentials.user.getIdToken();
      const emailId = credentials.user.email;
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('emailId', emailId);
      // console.log(idToken);
      navigate('/dashboard');
    } catch (loginError) {
      console.log(loginError);
      if (loginError.code === 'auth/invalid-credential') {
        setError('password', { message: 'Incorrect Credentilas' });
        setError('email', { message: 'Invalid Credentilas' });
      } else {
        setError('root', { message: 'something went wrong ' });
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(submitLoginForm)}>
        <h2>Login</h2>
        {errors.email && (
          <span style={{ color: 'red' }}>{errors.email.message}</span>
        )}
        <input
          id="email"
          {...register('email')}
          placeholder="Email"
          className="login-input"
        />
        <div className="password-field-wrapper">
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password.message}</span>
          )}
          <input
            id="password"
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />

          <button
            type="button"
            className="password-toggle-btn"
            onClick={togglePassword}
          >
            {showPassword ? <Eye size={23} /> : <EyeOff size={23} />}
          </button>
        </div>

        <button type="submit" disabled={isSubmitting} className="login-button">
          Login
        </button>
      </form>

      <div className="forgot-link">
        <Link to="/" className="forgot-password">
          Forgot password
        </Link>
      </div>
      <div className="signUp-redirect">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
