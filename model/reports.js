/**
 * reports.js
 * @description :: sequelize model of database table reports
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Reports = sequelize.define('reports',{
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
  lat:{ type:DataTypes.STRING },
  long:{ type:DataTypes.STRING },
  img:{ type:DataTypes.STRING },
  text:{ type:DataTypes.STRING },
  type:{ type:DataTypes.STRING },
  pocnum:{ type:DataTypes.STRING },
  pocname:{ type:DataTypes.STRING },
  hash:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (reports,options){
        reports.isActive = true;
        reports.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (reports,options){
        if (reports !== undefined && reports.length) { 
          for (let index = 0; index < reports.length; index++) { 
        
            const element = reports[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Reports.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Reports);
sequelizePaginate.paginate(Reports);
module.exports = Reports;
