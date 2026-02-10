import './SignupForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { app } from '../config/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

//Firebase Auth Instance creation
const auth = getAuth(app);

// signUpuserSchema put outside component to avoid re initialization on re render
const signUpSchema = z
  .object({
    email: z.string().trim().toLowerCase().email('Email is invalid'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password cannot exceed 32 characters')
      .regex(/[A-Z]/, 'Add an uppercase letter')
      .regex(/[a-z]/, 'Add an lowercase letter')
      .regex(/[\!\@\#\$\%\^\&\*]/, 'Add an special character'),
    confirmPassword: z.string().min(1, 'Please confrim your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'], //This attaches the error to the confirmPassword field
  });

// SignUp Component

function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched', // triggers validation when the user leaves the field
  });
  const submitForm = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;
      try {
        await sendEmailVerification(userCredential.user);

        console.log('verification email sent to ', user.email);
        navigate('/login');
      } catch (verificationError) {
        console.error('failed to send verification mail :', verificationError);
        setError('root', {
          message: 'account created but verification mail not send',
        });
        return;
        // stop here
      }
      // Redirect the user to dashboard
    } catch (errors) {
      if (errors.code === 'auth/email-already-in-use') {
        setError('email', { message: 'This email is already registered.' });
      } else {
        setError('root', { message: 'Something went wrong. Try again.' });
      }
    }
  };
  return (
    <div className="container">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit(submitForm)}>
          <h2>SignUp</h2>

          {errors.email && (
            <span style={{ color: 'red' }}>{errors.email.message}</span>
          )}
          <input id="email" placeholder="Email" {...register('email')} />
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password.message}</span>
          )}
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.confirmPassword && (
            <span style={{ color: 'red' }}>
              {errors.confirmPassword.message}
            </span>
          )}
          <input
            id="ConfirmPassword"
            type="password"
            placeholder="ConfirmPassword"
            {...register('confirmPassword')}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="signup-button"
          >
            {isSubmitting ? 'Wait...Creating Account' : 'Sign Up'}
          </button>
        </form>
        <div className="login-redirect">
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignupForm;

// Using RHF and manual validation

// function SignupForm() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const submitForm = (data) => {
//     console.log(data);
//   };
//   return (
//     <>
//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSubmit(submitForm)}>
//           <h2>SignUp</h2>

//           {errors.email && (
//             <span style={{ color: 'red' }}>{errors.email.message}</span>
//           )}
//           <input
//             id="email"
//             placeholder="Email"
//             {...register('email', { required: 'Email is Required' })}
//           />
//           {errors.password && (
//             <span style={{ color: 'red' }}>{errors.password.message}</span>
//           )}
//           <input
//             id="password"
//             type="password"
//             placeholder="Password"
//             {...register('password', { required: 'Password is Required' })}
//           />
//           {errors.confirmPassword && (
//             <span style={{ color: 'red' }}>
//               {errors.confirmPassword.message}
//             </span>
//           )}
//           <input
//             id="ConfirmPassword"
//             type="password"
//             placeholder="ConfirmPassword"
//             {...register('confirmPassword', {
//               required: 'Please Confirm the Password',
//               validate: (val) => {
//                 if (watch('password') !== val) {
//                   return 'Your password do not match';
//                 }
//               },
//             })}
//           />
//           <button type="submit" className="signup-button">
//             Sign up
//           </button>
//         </form>
//         <div className="login-redirect">
//           <p>
//             Have an account? <Link to="">Login</Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }
// export default SignupForm;

// without using React Hook Form

// function SignupForm() {
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const reTypedPasswordRef = useRef(null);

//   const signUpFormSubmitHandle = (event) => {
//     event.preventDefault();
//     // console.log(emailRef.current.value);
//     // console.log(passwordRef.current.value);
//     // console.log(reTypedPasswordRef.current.value);
//     // emailRef.current.value = '';
//     // passwordRef.current.value = '';
//     // reTypedPasswordRef.current.value = '';
//   };
//   return (
//     <div className="signup-container">
//       <form className="signup-form">
//         <h2>SignUp</h2>
//         <input type="email" ref={emailRef} placeholder="Email" />
//         <input type="password" ref={passwordRef} placeholder="Password" />
//         <input
//           type="password"
//           ref={reTypedPasswordRef}
//           placeholder="Confirm Password"
//         />
//         <button
//           type="submit"
//           onClick={signUpFormSubmitHandle}
//           className="signup-button"
//         >
//           Sign up
//         </button>
//       </form>
//       <div className="login-redirect">
//         <p>
//           Have an account? <Link to="">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignupForm;
