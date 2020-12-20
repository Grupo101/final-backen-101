const db = require('../models');
const Categoria = require('../models').Categoria;

exports.list = async(req,res,next) =>{
    try {
        const register = await db.Articulo.findAll();
        if(register){
            res.status(200).json(register);
        }else{
            res.status(404).send({
                message:'No hay articulos registradas'
            })
        }
    } catch(error){
        res.status(500).send({
            message: 'Error..!!'
        })
        next(error);
    }
};


exports.add = async(req,res,next) =>{
    try {
        const registro = await db.Articulo.create(req.body); //recibe lo del body y lo guarda en la base datos
        res.status(200).json(registro);     ///valir duplicados de categorias tarea
    }

    catch (error) {
        res.status(500).send({
            message: 'Error ->'
        })
        next(error);
    }    
};




exports.update = async(req,res,next) =>{
    try {
        const register = await db.Articulo.update({nombre: req.body.nombre, descripcion: req.body.descripcion,codigo: req.body.codigo,categoriaId: req.body.categoriaId},
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
        const register = await db.Articulo.update({estado:1},
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
        const register = await db.Articulo.update({estado:0},
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

