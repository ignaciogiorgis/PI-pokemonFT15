import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import './styles/landing.css'




const LandingPage = () => {
    
    return (
        <Fragment> 
            
            <div className="landing-page">
                <div className="title">
                    <h1 >Pokemon Api</h1>
                </div>
                
                <Link to="/home">
                    <button className="boton-landing">Ingresar</button>
                </Link>
            </div>
        </Fragment>
      );
}
 
export default LandingPage;