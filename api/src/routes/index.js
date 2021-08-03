const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const {obtenerPokemons} = require('../../utils.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons',  (req, res)=> {
    
    res.send('hola mundo desde pokemons');
});

router.get('/pokemons/:id', (req, res)=> {
    res.send('hola desde pokemons id');
});

router.post('/pokemons', (req, res)=> {
    res.send('hola desde pokemons post');
});

router.get('/type', (req, res)=> {
    res.send('hola desde pokemons type');
});

/* router.get('/pokemons', (req, res)=> { */
/*     res.send('hola desde pokemons query'); */
/* }); */
/*  */




module.exports = router;
