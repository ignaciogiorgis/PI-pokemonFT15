

const initialState = {
    pokemons : [],
    allPokemonsState :[]
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return {  
                   ...state,
                   pokemons: action.payload,
                   allPokemonsState: action.payload
                }

        case 'FILTER_TYPES':
            const allPokemons = state.allPokemonsState;
            
            let arrayPoke = []
            
            if(action.payload !== 'all'){
                allPokemons.map((e)=>{
                
                    e.types.forEach((i)=>{
                     
                        if(i===action.payload){
                         
                            arrayPoke.push(e)
                        }
                 })
                 })
            
                
            }
            return{
                ...state,
                pokemons: action.payload === 'all' ? allPokemons : arrayPoke
            }

        case 'FILTER_EXIST':
            const allPokemonsExist = state.allPokemonsState
            const filterByExist = action.payload === 'Ex' ? allPokemonsExist.filter((e)=>{ return (e.id < 900)}) : allPokemonsExist.filter((e)=>{ return e.id >= 900})
            return{
                ...state,
                pokemons: action.payload === 'all' ? allPokemonsExist  : filterByExist
            }
        case 'ORDER_ALFABETIC':
            function comparar ( a, b ){ 
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;}
            let order = action.payload === 'asc' ? state.pokemons.sort(comparar) : (state.pokemons.sort(comparar)).reverse()
            return{
                ...state,
                pokemons: order
            }
            case 'ORDER_ATTACK':
                const allPokemonsAttack = state.allPokemonsState
                function compara(a,b){
                    return a.attack - b.attack
                }
                const orderAttack = action.payload === 'ascf' ? allPokemonsAttack.sort(compara) : (allPokemonsAttack.sort(compara)).reverse()
                return{
                    ...state,
                        pokemons: orderAttack
                }
            case 'SEARCH_BY_NAME':

                return{
                    ...state,
                    pokemons: action.payload
                }
        default:
                return state;
    }
}

export default rootReducer;