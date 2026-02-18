import React, { useContext, useRef } from 'react';
import { Github, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import { authContext } from '../context/AuthContextProvider';

function UpdateProfile() {
  const navigate = useNavigate();
  const { updateUserProfile, getProfileDetails } = useContext(authContext);
  const user = getProfileDetails();
  const displayName = useRef(user.displayName);
  const photoURL = useRef(user.photoURL);
  const submitUpdateHandler = () => {
    event.preventDefault();
    const updatedName = displayName.current.value;
    const updatedURL = photoURL.current.value;
    updateUserProfile(updatedName, updatedURL);
    navigate('/dashboard');
    // console.log(`${updatedName} ${updatedURL}`);
  };
  return (
    <div className="update-profile-card">
      <div className="card-header">
        <h3>Contact Details</h3>
        <button className="cancel-btn" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
      </div>

      <form className="update-form" onSubmit={submitUpdateHandler}>
        <div className="form-row">
          <div className="input-field">
            <Github size={20} className="icon" />
            <label>Full Name:</label>
            <input
              type="text"
              ref={displayName}
              defaultValue={user.displayName}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-field">
            <Globe size={20} className="icon" />
            <label>Profile Photo URL:</label>
            <input
              type="url"
              ref={photoURL}
              placeholder="Paste URL here"
              defaultValue={user.photoURL}
            />
          </div>
        </div>

        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
