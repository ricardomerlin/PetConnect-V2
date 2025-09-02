import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate, useRoutes } from 'react-router-dom';
import AnimalFeed from './AnimalFeed';
import Profile from './Profile';
import Home from './Home';
import LoginPage from './login';

import './styles/app.css';

function App() {
  const [profileId, setProfileId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isTop, setIsTop] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem('petconnect_user')
    if (user) {
      console.log('✅ THERE IS A USER LOGGED INTO PETCONNECT')
    } else {
      console.log('❌ NO USER WAS FOUND')
    }
  },[])

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const response = await fetch('mongodb://127.0.0.1:27017/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include auth token if needed
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          console.log('Profile data fetched successfully:', data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  })



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
            {/* {dropdownOpen && <div className="dropdown" onMouseLeave={() => setDropdownOpen(false)}>Profile Menu
            <ul>
                <Link className='dropdown-link' to="/profile">My Profile</Link>
                <Link className='dropdown-link' to="/map">My saved pets</Link>
              </ul>
            </div>} */}
          </>
          :
          <Link className='link' to="/login">Login</Link>
          }
        </nav>
        <Routes>
          <Route path="/animals" element={<AnimalFeed  />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;