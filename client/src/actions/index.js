import axios from 'axios';



export function getPokemons(){
    return async function(dispatch){
            const json = await axios.get("http://localhost:3001/pokemons");
            return dispatch({
                type:'GET_POKEMONS',
                payload: json.data
            })
    }}

export function filterTypes(payload){
       return {
            type:'FILTER_TYPES',
            payload
        }
}


export function filterExist(payload){
        return {
            type:'FILTER_EXIST',
            payload
        }
}

export function ordAlfabetic(payload){
        return {
            type: 'ORDER_ALFABETIC',
            payload
        }
}

export function ordAttack(payload){
    return{
        type: 'ORDER_ATTACK',
        payload
    }
}

export function searchName(name){
    
    return async function(dispatch){
        try{ 
            const json = await axios.get('http://localhost:3001/pokemons?name='+ name);
            return dispatch({
                type:'SEARCH_BY_NAME',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
}}

   
   