import axios from 'axios';



export function getPokemons(){
    return async function(dispatch){
            const json = await axios.get("https://app-pokemon-pi.herokuapp.com/pokemons");
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
            const json = await axios.get('https://app-pokemon-pi.herokuapp.com/pokemons?name='+ name);
            return dispatch({
                type:'SEARCH_BY_NAME',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
}}

export function getTypes(){
    return async function(dispatch){
        const json = await axios.get('/types');
        return dispatch({
            type: 'GET_TYPES',
            payload:json.data

        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const json = await axios.post('https://app-pokemon-pi.herokuapp.com/pokemons', payload)
        
        return json
    }

}

   
export function getDetail(id){
    
    return async function(dispatch){
        try{ 
            const json = await axios.get('https://app-pokemon-pi.herokuapp.com/pokemons/'+ id);
            return dispatch({
                type:'SEARCH_BY_ID',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
}}  