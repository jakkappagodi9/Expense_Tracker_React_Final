import React from 'react';
import './ForgotPassword.css';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../context/AuthContextProvider';
import toast from 'react-hot-toast';
import { email, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .email('Invalid email'),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useContext(authContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, setError },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: 'onTouched',
  });

  const handleReset = async (data) => {
    try {
      await resetPassword(data.email);
      toast.success('Reset link sent! Please check your inbox.');
      navigate('/login');
    } catch (error) {
      console.error('Reset Error:', error.code);
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found'
      ) {
        toast.error('email not found');
      } else {
        toast.error('Failed to send reset link. Try again later.');
      }
    }
  };

  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-card">
        <div className="icon-wrapper">
          <span>🔒</span>
        </div>
        <h2>Reset Password</h2>
        <p>
          Enter the email associated with your account and we'll send you a link
          to reset your password.
        </p>

        <form onSubmit={handleSubmit(handleReset)}>
          <div className="input-group">
            <input type="email" placeholder="Email " {...register('email')} />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="forgot-footer">
          <span>
            Remember your password? <Link to="/login">Back to Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
