import React, {Fragment, useState, useEffect} from 'react';
import './styles/form.css';
import { Link } from 'react-router-dom'; 
import {useDispatch, useSelector} from 'react-redux';
import { getTypes, postPokemon } from '../actions';



function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Se requiere Nombre'
    } else if (!input.hp){
        errors.hp = 'se requiere la vida'
    } else if(!input.attack){
        errors.attack = 'se requiere el ataque'
    } else if (!input.defense){
        errors.defense = 'se requiere la defensa'
    } else if (!input.speed){
        errors.speed = ' se requiere la velocidad'
    } else if (!input.height){
        errors.height = ' se requiere la altura'
    }else if (!input.weight){
        errors.weight = 'se requiere el peso'
    }else if (!input.img){
        errors.img = 'se requiere la url'
    }else if (input.types.length === 0 ){
        errors.types = 'se requier tipos'
    }
    return errors;
}





const Form = () => {
    const dispatch = useDispatch()
    const allTypes = useSelector(state => state.types)
    const [errors, seterrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
        types: []
    })

function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        seterrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

function handleSelect(e){
    setInput(({
        ...input,
        types: [...input.types, e.target.value]
    }))
    seterrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))

}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postPokemon(input));
    alert('Personaje Creado');
    
    setInput({
        name: '',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
        types: []
    })
}

    useEffect(() => {
       dispatch(getTypes())
    }, [dispatch])






    return (
        <Fragment>
         <div className="fondo-form">       
         <div className="form-container">
            <h1 className="titulo-form">Crea Tu pokemon</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
             <div className="form-secundari">
                <div>
                    <label>Nombre : </label>
                    <input   type="text" name="name" placeholder='Nombre' value={input.name} onChange={(e)=>handleChange(e)} />
                    {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                    <label>Vida : </label>
                    <input type="number" name="hp" placeholder='Vida' value={input.hp} onChange={(e)=>handleChange(e)} />
                    {errors.hp && (<p className="error">{errors.hp}</p>)}
                </div>
                <div>
                    <label>Fuerza : </label>
                    <input type="number" name="attack" placeholder='Fuerza' value={input.attack} onChange={(e)=>handleChange(e)} />
                    {errors.attack && (<p className="error">{errors.attack}</p>)}
                </div>
                <div>
                     <label>Defensa : </label>
                    <input type="number" name="defense" placeholder='Defensa' value={input.defense} onChange={(e)=>handleChange(e)} />
                    {errors.defense && (<p className="error">{errors.defense}</p>)}
                </div>
                <div>
                    <label>Velocidad : </label>
                    <input type="number" name="speed" placeholder='Velocidad' value={input.speed} onChange={(e)=>handleChange(e)} />
                    {errors.speed && (<p className="error">{errors.speed}</p>)}
                </div>
                <div>
                    <label>Altura : </label>
                    <input type="number" name="height" placeholder='Altura' value={input.height} onChange={(e)=>handleChange(e)} />
                    {errors.height && (<p className="error">{errors.height}</p>)}
                </div>
                <div>
                    <label>Peso : </label>
                    <input type="number" name="weight" placeholder='Peso' value={input.weight} onChange={(e)=>handleChange(e)} />
                    {errors.weight && (<p className="error">{errors.weight}</p>)}
                </div>
                <div>
                    <label>Imagen : </label>
                    <input type="url" name="img" placeholder='Imagen' value={input.img}  onChange={(e)=>handleChange(e)} />
                    {errors.img && (<p className="error">{errors.img}</p>)}
                </div>
               
                <div>
                    <label>Tipos : </label>
                    <select onChange={(e)=>handleSelect(e)} className="boton" >
                        {    
                            allTypes?.map((e)=>{
                                return <option value={e.name}>{e.name}</option>
                            })
                        }
                    </select>
                    {errors.types && (<p className="error">{errors.types}</p>)}
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
         <div className="footer-form">
                   <h3>Api pokemon</h3>
         </div>
        </div>
        </Fragment>
      );
      
}
 
export default Form;