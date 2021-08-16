import React from 'react';
import {Link} from 'react-router-dom'
import './styles/pokemon.css';


const Pokemon = ({name, img, types}) => {
    
    return (
        <div className="principal-card">
            <div className="card-secundari">
                <div className="detail">
                    <Link to='/detail'>    
                        <h3>{name}</h3>
                    </Link>
                </div>
                <div>
                    <img src={img} alt="img not found" />
                </div>
            </div>
            <div className="types">
             {
                types.map((e)=>{
                    return <p >"{e}"</p>
                })
             }
             </div>
           
        </div>
      );
}
 
export default Pokemon;