// const routerx = require('express-promise-router');
// const categoriaRouter = require('./articulo');



// const router = routerx();

// router.use('/articulo', articuloRouter);

// module.exports = router;



///****desde */
const router = require('express').Router();
//const users = require('../models/users');
const apiRouterUsuario = require('./api/usuario.js');  ///manejador
const apiRouterCategoria = require('./api/categoria.js');
const apiRouterArticulo = require('./api/articulo.js');

//const apiRouterFilm = require('./api/films.js');  ///manejador

//se coloca  /user porque ya detecto que paso por /api  => .com/api/user
router.use('/usuario',apiRouterUsuario);  ////user utilice este manejador //.com/api/user
router.use('/categoria',apiRouterCategoria);  //end points
router.use('/articulo',apiRouterArticulo);  
//router.use('/film',apiRouterFilm);  ////user utilice este manejador //.com/api/film

// .com/api/users      un controlador por cada una de estas
// .com/api/film


module.exports = router;
///*hasta

