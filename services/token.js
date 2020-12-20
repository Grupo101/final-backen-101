/*
var jwt = require('jsonwebtoken');
const models = require('../models');


module.exports = {

    //generar el token
    encode: async(id, rol) => {

    },
    //permite decodificar el token
    decode: async(token) => {
        try {

        } catch (e) {

        }

    }
}

*/


///***desde */
const jwt = require('jsonwebtoken');
//const token = require('morgan');
const models = require('../models');



const checkToken = async (token) => {   ///validadcion del token si caduco  oalgo paso 
    let localID = null;
    try {
        const {id} = await token.decode(token);
        localID = id;

    } catch (error) {
        
    }
    const user = await models.Usuario.findOne({where:{
        id: localID,
        estado: 1
    }});
    if(user){
        const token = encode(user);
        return{
            token,
            rol: user.rol
        }
    }else{
        return false
    }

}




module.exports = {
    encode: async(user) =>{       ///construye el token este viene por user
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            status: user.estado
        },'config.secret',{            /// palabra secreta del token 
            expiresIn: 86400,        ///tiempo expiracion de token en ms
        }
        );
        return token;
    },


    decode: async(token) =>{
        try {
            const {id} = await jwt.verify(token, 'config.secret'); //sacar el id del token
            const user = await models.Usuario.findOne ({ where :{
                id: id,
                estado: 1
            }});
            if(user){
                return user;
            }else{
                return false;
            }
            
        } catch (error) {
            const newToken = await checkToken (token);
            return newToken;
        }

    }
}

//****hasta */