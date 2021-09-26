import React, {Fragment } from 'react';
import {Link} from 'react-router-dom';
import './styles/landing.css'




const LandingPage = () => {
           
    return (
        <Fragment> 
            
            <div className="landing-page">
                <div className="title-landing">
                    <h1 >Pokemon Api</h1>
               
                <Link to="/home">
                    <button className="boton-landing type1">Ingresar</button>
                </Link>
                </div>
            </div>
        </Fragment>
      );
}
 
export default LandingPage;