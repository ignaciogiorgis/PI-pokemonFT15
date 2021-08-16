import React, {Fragment} from 'react';
import './styles/form.css';
import { Link } from 'react-router-dom'; 

const Form = () => {
    return (
        <Fragment>
         <div className="form-container">
            <h1 className="titulo-form">Crea Tu pokemon</h1>
            <form>
             <div className="form-secundari">
                <div>
                    <input type="text" name="name" placeholder='Nombre' />
                </div>
                <div>
                    <input type="number" name="hp" placeholder='Vida' />
                </div>
                <div>
                    <input type="number" name="attack" placeholder='Fuerza' />
                </div>
                <div>
                    <input type="number" name="defense" placeholder='Defensa' />
                </div>
                <div>
                    <input type="number" name="speed" placeholder='Velocidad' />
                </div>
                <div>
                    <input type="number" name="height" placeholder='Altura' />
                </div>
                <div>
                    <input type="number" name="weight" placeholder='Peso' />
                </div>
                <div>
                    <input type="url" name="img" placeholder='Imagen' />
                </div>
                <div>
                    <button className="boton-form" type="submit">Crear</button>
                </div>
                </div>
            </form>
            
           
         </div>
         <div className="return">
                <Link to='/home'>
                    <button className="boton-form">Volver</button>
                </Link>
            </div>
         <div className="footer">
                   <h3>Api pokemon</h3>
         </div>
        </Fragment>
      );
      
}
 
export default Form;