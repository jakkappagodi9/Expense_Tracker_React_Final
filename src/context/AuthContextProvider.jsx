import React, { Children, createContext, useState } from 'react';
import { app } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { email, json } from 'zod';

//firebase auth instance creation
const auth = getAuth(app);
export const authContext = createContext(null);

function AuthContextProvider(props) {
  const [idToken, setIdToken] = useState(() => {
    const savedAuth = JSON.parse(localStorage.getItem('authObj')) || '{}';
    return savedAuth.idToken || null;
  });
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authObj');
      setIdToken(null);
      console.log('user signed out successfully !!');
    } catch (signOutError) {
      console.log('Erorr signing out : ', signOutError.message);
    }
  };

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInWithEmailAndPassword = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const token = await credentials.user.getIdToken();
    localStorage.setItem(
      'authObj',
      JSON.stringify({
        ...auth.currentUser,
        idToken: token,
      }),
    );
    setIdToken(JSON.parse(localStorage.getItem('authObj')).idToken);
    return credentials;
  };

  const emailVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    } else {
      throw new Error('No user found to verify');
    }
  };

  const updateUserProfile = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      const authObj = JSON.parse(localStorage.getItem('authObj')) || '{}';
      localStorage.setItem(
        'authObj',
        JSON.stringify({
          ...authObj,
          displayName,
          photoURL,
        }),
      );
      console.log('Profile updated');
    } catch (UpdateError) {
      console.log('Update failed . ', UpdateError.message);
    }
  };
  const getProfileDetails = () => {
    return JSON.parse(localStorage.getItem('authObj'));
  };
  const contextValue = {
    idToken,
    isLoggedIn: !!idToken,
    handleSignOut,
    logInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    updateUserProfile,
    getProfileDetails,
    emailVerification,
  };

  return (
    <>
      <authContext.Provider value={contextValue}>
        {props.children}
      </authContext.Provider>
    </>
  );
}

export default AuthContextProvider;
