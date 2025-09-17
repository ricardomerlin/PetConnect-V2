import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, useRoutes } from 'react-router-dom';
import AnimalFeed from './AnimalFeed';
import Profile from './Profile';
import Home from './Home';
import LoginPage from './login';

import './styles/app.css';
// import { exampleEndpoint } from '../../updated_backend/controllers/animalController';

function App() {
  const [profileId, setProfileId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isTop, setIsTop] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [availableAnimals, setAvailableAnimals] = useState([]);

  useEffect(() => {
    checkUserLoggedIn()
    getAllAnimals()
  },[])
  

  const checkUserLoggedIn = () => {
    const user = localStorage.getItem('petconnect_user')
    if (user) {
      console.log('✅ THERE IS A USER LOGGED INTO PETCONNECT')
      setProfileId(user.id)
      setProfile(user)
    } else {
      console.log('❌ NO USER WAS FOUND')
    }
  }

  const getAllAnimals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/animals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableAnimals(data);
        console.log('Available animals fetched successfully:', data);
      }
      else {
        console.error('Failed to fetch available animals');
      }
    } catch (error) {
      console.error('Error fetching available animals:', error);
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('petconnect_user');
    setProfileId(null);
    setProfile(null);
    // checkUserLoggedIn();
    console.log('User logged out');
  }

  return (
    <Router>
      <div id="app">
        {!isTop &&
          <div className='pop-up-bar'>
            <div className='side-links' style={{opacity: isTop ? 0 : 1}}>
              <h2>PetConnect</h2>
              <Link className='side-link' to="/animals">Available Pets</Link>
              <Link className='side-link' to="/profile">My Profile</Link>
              <Link className='side-link' to="/foster">Map</Link>
            </div>
          </div>
        }
        <nav className='top-bar'>
          <Link to="/home" id='logo-container'>
            <img src='src/images/paws.png' id='petconnect-logo' />
            <p id='petconnect-title'>PetConnect</p>
          </Link>
          {isTop ?
          <div id='links'>
            <Link className='link' style={{opacity: isTop ? 1 : 0, marginLeft: '10px'}} to="/animals">Adopt</Link>
            <Link className='link' style={{opacity: isTop ? 1 : 0, marginLeft: '10px'}} to="/">How to Adopt</Link>
            <Link className='link' style={{opacity: isTop ? 1 : 0, marginLeft: '10px'}} to="/">About me</Link>
            <Link className='link' style={{opacity: isTop ? 1 : 0, marginLeft: '10px'}} to="/">Additional Resources</Link>
            {profile
            ? 
            <>
            <Link className='link' style={{opacity: isTop ? 1 : 0, marginLeft: '10px'}} to="/profile">Saved Pets</Link>
            </>
            : null
            }
          </div>
          :
          null
          }
          {profile ?
          <>
            <div onMouseEnter={() => setDropdownOpen(true)}>Welcome Ricardo</div>
            {dropdownOpen && <div className="dropdown" onMouseLeave={() => setDropdownOpen(false)}>Profile Menu
            <ul>
                <Link className='dropdown-link' to="/profile">My Profile</Link>
                <Link className='dropdown-link' to="/map">My saved pets</Link>
                <li className='dropdown-link' onClick={logoutUser}>Logout</li>
              </ul>
            </div>}
          </>
          :
          <Link className='link' to="/login">Login</Link>
          }
        </nav>
        <Routes>
          <Route path="/animals" element={<AnimalFeed  />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          {profile ? null : <Route path="/login" element={<LoginPage checkUserLoggedIn={checkUserLoggedIn}/>} /> }
        </Routes>
      </div>
    </Router>
  )
}

export default App;