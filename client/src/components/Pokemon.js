import React from 'react';
import {Link} from 'react-router-dom'
import './styles/pokemon.css';


const Pokemon = ({name, img, types, id}) => {
    
    return (
        <div className="principal-card">
            <div className="detail">
                    <Link to= {'/detail/'+id}   >    
                        <h3>{name}</h3>
                    </Link>
            </div>
            <div className="card-secundari">
                 <div>
                    <img src={img} alt="img not found" />
                </div>
            </div>
            <div className="types">
              
             { id < 900 ? types.map((e,i)=>{ return <p key={i} >{e}</p> }) : types.map((e, i)=>{ return <p key={i} >{e.name}</p> })  }
             </div>
           
        </div>
      );
}
 
export default Pokemon;