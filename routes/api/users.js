const router = require('express').Router();
//const User = require('../../models');
const userController = require('../../controllers/UserController.js');
const auth = require('../../middlewares/auth')


router.get('/list', auth.verificarVendedor, userController.list); ///****** */
router.post('/register',auth.verificarAdministrador, userController.register);
router.put('/update',auth.verificarAdministrador, userController.update);

router.post('/login', userController.login);

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
