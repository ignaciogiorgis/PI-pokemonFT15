/* const { Router } = require('express');
const router = Router();

const axios = require('axios');



router.get('/pokemons', async (req, res)=> {
    let listaPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    res.json(listaPokemon.data.results)
    
});

module.exports = router






 */