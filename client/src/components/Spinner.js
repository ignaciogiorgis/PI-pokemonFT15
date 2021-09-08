import React, {Fragment} from 'react';
import '../components/styles/spinner.css'


const Spinner = () => {
    return ( 
        <Fragment>
            
            <div id="loading">
                <div className="pokeball" id="normal"></div>
                <div className="pokeball" id="great"></div>
                <div className="pokeball" id="ultra"></div>
                <div className="pokeball" id="master"></div>
                <div className="pokeball" id="safari"></div>
                <div cla> 
                    <h2>Loading...</h2>
                </div>
            </div>
        </Fragment>
);
}
 
export default Spinner;