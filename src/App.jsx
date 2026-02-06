import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        {/* <SignupForm></SignupForm> */}
        <Login />
      </div>
    </div>
  );
}

export default App;
