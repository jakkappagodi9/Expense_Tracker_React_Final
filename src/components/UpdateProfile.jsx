import React from 'react';
import { Github, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import { app } from '../config/firebase';
import { getAuth } from 'firebase/auth';

//firebase instance
const auth = getAuth(app);

function UpdateProfile() {
  const navigate = useNavigate();

  return (
    <div className="update-profile-card">
      <div className="card-header">
        <h3>Contact Details</h3>
        <button className="cancel-btn" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
      </div>

      <form className="update-form">
        <div className="form-row">
          <div className="input-field">
            <Github size={20} className="icon" />
            <label>Full Name:</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="input-field">
            <Globe size={20} className="icon" />
            <label>Profile Photo URL:</label>
            <input type="url" placeholder="Paste URL here" />
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
