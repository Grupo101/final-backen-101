/// crear la tabla con sequalize

//const { Sequelize } = require("sequelize/types");



module.exports = (sequelize,type) => {
    return sequelize.define('user', {
        // Model attributes are defined here
        // se define la tabla user
        id:{
            type:type.INTEGER,
            primaryKey : true,
            //allowNull : false,
            autoIncrement : true,
            },
        name: type.STRING,
        email: type.STRING,
        password: type.STRING,
        rol: type.STRING,
        estado: type.INTEGER,

        
      }, 
      
      {
        // Other model options go here

        
      });
}