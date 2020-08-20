import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../Services/api'

import './styles.css';

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);
    
    
    useEffect(() => {
        api.get('connections')
            .then(response => {
                const {total} = response.data;

                setTotalConnections(total);
            })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Your online study platform.</h2>
                </div>

                <img src={landingImg} 
                    alt="Studies platform" 
                    id="hero-image"
                    
                />
                <div className="buttons-container">
                    <Link to="/study" className="study" >
                        <img src={studyIcon} alt="Study"/>
                        Study
                    </Link>
                    <Link to="/teach" className="teach">
                        <img src={giveClassesIcon} alt="Teach"/>
                        Teach
                    </Link>
                </div>

                <span className="total-connections">
                    Total {totalConnections} peoples connections already 
                    <img src={purpleHeartIcon} alt="Purple Heart"/>
                </span>
            </div>
        </div>
    )
    
}

export default Landing;