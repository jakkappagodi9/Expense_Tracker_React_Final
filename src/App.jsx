import React from 'react';

import './App.css';
import Navbar from './components/Navbar';
import SignupForm from './components/SignUpForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <SignupForm />
      </div>
    </div>
  );
}

export default App;
