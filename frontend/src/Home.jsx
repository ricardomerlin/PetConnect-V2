import React from 'react';
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles/home.css';
import { Link } from 'react-router-dom';


function Home() {    

    const Navigate = useNavigate()
    
    return (
        <>
            <div id="home-page">
                <div id='main-prompt'>
                    <div className='text-container'>
                        <p className='header-text'>Find your new best friend</p>
                        <p className='sub-text'>Search thousands of available pets all across the United States</p>
                        <div className='prompt-button-container'>
                            <div className='prompt-button'>Adopt Now</div>
                        </div>
                    </div>
                    <img id="main-prompt-image" src="src/images/bassethound.png" />
                </div>
            </div>
        </>
    );
}

export default Home;
