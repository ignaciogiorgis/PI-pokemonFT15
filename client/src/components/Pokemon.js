import React from 'react';


const Pokemon = ({name, img, types}) => {
    return (
        <div>
            <div>
                <h3>{name}</h3>
            </div>
            <div>
                <img src={img} alt="img not found" />
            </div>
            <div>
                <p>{types}</p>
            </div>
        </div>
      );
}
 
export default Pokemon;