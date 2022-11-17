/**
 * bid.js
 * @description :: sequelize model of database table bid
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Bid = sequelize.define('bid',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  price:{ type:DataTypes.INTEGER },
  text:{ type:DataTypes.STRING },
  timeneeded:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (bid,options){
        bid.isActive = true;
        bid.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (bid,options){
        if (bid !== undefined && bid.length) { 
          for (let index = 0; index < bid.length; index++) { 
        
            const element = bid[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Bid.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Bid);
sequelizePaginate.paginate(Bid);
module.exports = Bid;
