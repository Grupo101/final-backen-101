//const User = require('../models'); ///{importar varios modelos en esa carpeta}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const models = require('../models');
const db = require('../models');
const tokenServices = require('../services/token');


exports.login = async(req,res,next) =>{
    try {
        const user = await db.Userl.findOne({where: {email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(passwordIsValid){
                const token = await tokenServices.encode(user); ///se llama metodo para que crea el token
                res.status(200).send({
                    auth:true,
                    tokenReturn: token
                    //  tokenReturn: token,
                    //  user: user
                })

            }
            else{
                res.status(401).json({
                    error:'Error en usuario o contraseña'
                })

            }
        }
        else{
            res.status(402).json({
                error:'Error en usuario o contraseña'
        })
    }

    } catch (error) {
        res.status(500).send({
            message:'Error...user ->' + error
        })
        next(error);  ///para que no se bloquee
        
        }
};








exports.list = async(req,res,next) =>{
    try {
        const user = await db.User.findAll();
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
        const user = await db.User.findOne({ where: {email: req.body.email}});
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
        const user = await db.User.findOne({where: {email: req.body.email}});
        if(user){
            res.status(409).send({
                message: 'Sorry your request has a conflict with our sistem state, may be the email si ready'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password,10);
            const user = await db.User.create(rq.body);
            req.status(200).json(user);
        }

    } catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }    
};