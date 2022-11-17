/**
 * bid_report.js
 * @description :: sequelize model of database table bid_report
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Bid_report = sequelize.define('bid_report',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  bid_id:{ type:DataTypes.INTEGER },
  report_id:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (bid_report,options){
        bid_report.isActive = true;
        bid_report.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (bid_report,options){
        if (bid_report !== undefined && bid_report.length) { 
          for (let index = 0; index < bid_report.length; index++) { 
        
            const element = bid_report[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Bid_report.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Bid_report);
sequelizePaginate.paginate(Bid_report);
module.exports = Bid_report;
