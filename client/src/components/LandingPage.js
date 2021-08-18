import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import '../App.css'


const PagePrincipal = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    column-gap: 20px;
    flex-direction:column;
`;


const LandingPage = () => {
    
    return (
        <Fragment> 
            <PagePrincipal className="landing-page">
                <div className="titulo">
                    <h1 >Pokemon Api</h1>
                </div>
                
                <Link to="/home">
                    <button className="boton">Ingresar</button>
                </Link>
            </PagePrincipal>
        </Fragment>
      );
}
 
export default LandingPage;