//const User = require('../models'); ///{importar varios modelos en esa carpeta}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const models = require('../models');
const db = require('../models');
const tokenServices = require('../services/token');


exports.login = async(req,res,next) =>{
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(passwordIsValid){
                const token = await tokenServices.encode(user); ///se llama metodo para que crea el token
                res.status(200).json({user,tokenReturn:token});
                
                // res.status(200).send({    ///lo reemplazo lo de arriba
                //     auth:true,
                //     tokenReturn: token
                    
                //})

            }
            else{
                res.status(401).send('Password Not Found.');
                               //res.status(401).send({auth: false ,accessToken: null, reason:"Invalid Password!"});
                                // res.status(401).json({
                //     error:'Error en usuario o contraseña 401'
                //})

            }
        }
        else{
            res.status(404).send('User Not Found.');
            // res.status(402).json({
            //     error:'Error en usuario o contraseña'
            //})
    }

    } catch (error) {
        res.status(500).send({
            message:'Error...  de login usuario controller->' + error
        })
        next(error);  ///para que no se bloquee
        
        }
};









exports.list = async(req,res,next) =>{
    try {
        const user = await db.Usuario.findAll();
        if(user){
            res.status(200).json(user);
        }else{
            res.status(401).send({
                message:'there is not user in the system'
            })
        }
    } catch(error){
        res.status(500).send({
            message: 'Error..!!'
        })
        next(error);
    }
};


exports.update = async(req,res,next) =>{
    try {
        const user = await db.Usuario.findOne({ where: {email: req.body.email}});
        if(ser){
            const user = await db.User.update({name: req.body.name},
                {
                where:{

                 email: req.body.email
            },
        });
        res.status(200).json(user);
    } else {
        res.status(404).send({
            messag:'User not found'
        })    
    }
    }catch (error) {
        res.status(500).send({
            message: 'Error'
        });
        next(error);
    }
};


exports.register = async(req,res,next) =>{
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if(user){
            res.status(409).send({
                message: 'Sorry your request has a conflict with our sistem state, may be the email si ready'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password,10);
            const user = await db.Usuario.create(req.body);
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).send({
            message: 'Error -> usuario register'
        })
        next(error);
    }    
};