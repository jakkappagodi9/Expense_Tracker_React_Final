import React, { Children, createContext, useState } from 'react';
import { app } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getDatabase, set, ref, child, get } from 'firebase/database';
import { email } from 'zod';

//firebase auth instance creation
const auth = getAuth(app);
//db
const db = getDatabase(app);
export const authContext = createContext(null);

function AuthContextProvider(props) {
  const user = auth.currentUser;
  const [idToken, setIdToken] = useState(() => {
    const savedAuth = JSON.parse(localStorage.getItem('authObj')) || '{}';
    return savedAuth.idToken || null;
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setIdToken(null);
      setIsEmailVerified(false);
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
    setIsEmailVerified(credentials.user.emailVerified);
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
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const onAddExpense = async (expenseList) => {
    return await set(
      ref(db, `root/users/${auth.currentUser.uid}/expenses`),
      expenseList,
    );
  };

  const fetchExpense = async (callback) => {
    if (!auth.currentUser) {
      console.log('NO user found skipping fetch');
      return;
    }
    try {
      const expenseRef = ref(db, `root/users/${auth.currentUser.uid}/expenses`);
      console.log(expenseRef);

      const snapshot = await get(expenseRef);
      if (snapshot.exists) {
        callback(snapshot.val());
      } else {
        callback([]);
      }
    } catch (error) {
      console.log('Fetch error. : ', error);
    }
  };

  const contextValue = {
    idToken,
    isLoggedIn: !!idToken,
    isEmailVerified,
    user,
    handleSignOut,
    logInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    updateUserProfile,
    getProfileDetails,
    emailVerification,
    resetPassword,
    onAddExpense,
    fetchExpense,
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
