const db = require('../models');

exports.list = async(req,res,next) =>{
    try {
        const register = await db.Categoria.findAll();
        if(register){
            res.status(200).json(register);
        }else{
            res.status(404).send({
                message:'No hay categorias registradas'
            })
        }
    } catch(error){
        res.status(500).send({
            message: 'Error.... categoria list!!'
        })
        next(error);
    }
};


exports.add = async(req,res,next) =>{
    try {
        const registro = await db.Categoria.create(req.body); //recibe lo del body y lo guarda en la base datos
        res.status(200).json(registro);     ///valir duplicados de categorias tarea
    }

    catch (error) {
        res.status(500).send({
            message: 'Error -> add categoria'
        })
        next(error);
    }    
};




exports.update = async(req,res,next) =>{
    try {
        const register = await db.Categoria.update({descripcion: req.body.descripcion, nombre: req.body.nombre },
            {
                where: {
                    id: req.body.id
                },
            });
     
        res.status(200).json(register);
    } 

    catch (error) {
        res.status(500).send({
            message: 'Error'
        });
        next(error);
    }
};


exports.activate = async(req,res,next) =>{
    try {
        const register = await db.Categoria.update({estado:1},
            {
                where: {
                    id: req.body.id
                },
            });
     
        res.status(200).json(register);
    } 

    catch (error) {
        res.status(500).send({
            message: 'Error'
        });
        next(error);
    }
};


exports.deactivate = async(req,res,next) =>{
    try {
        const register = await db.Categoria.update({estado:0},
            {
                where: {
                    id: req.body.id
                },
            });
     
        res.status(200).json(register);
    } 

    catch (error) {
        res.status(500).send({
            message: 'Error'
        });
        next(error);
    }
};

