const router = require('express').Router();
//const User = require('../../models');
const usuarioController = require('../../controllers/UsuarioController.js');
const auth = require('../../middlewares/auth')


router.get('/list', auth.verificarVendedor, usuarioController.list); ///****** */
router.post('/register', auth.verificarAdministrador, usuarioController.register);
router.put('/update', auth.verificarAdministrador, usuarioController.update);

router.post('/login', usuarioController.login);

module.exports = router;

//const bcrypt = require('bcryptjs');

//.com/api/user/  <= estamos aqui
// router.get('/',async(req,res) => {
//     const user = await User.findAll();
//     res.status(200).json(user);
// })

///api/register   registrar usuario

// router.post('/register', async(req,res) =>{
//     req.body.password = bcrypt.hashSync(req.body.password, 10); ///encripccion del password 10 veses ejecuta el algoritmo
//     const user = await User.create(req.body);
//     res.status(200).json(user);
// })
//router.get('/, userControllerListar');
//router.post('/ register',userController.register);
