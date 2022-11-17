/**
 * reportsController.js
 * @description :: exports action methods for reports.
 */

const Reports = require('../../../model/reports');
const reportsSchemaKey = require('../../../utils/validation/reportsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Reports in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Reports. {status, message, data}
 */ 
const addReports = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      reportsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdReports = await dbService.createOne(Reports,dataToCreate);
    return  res.success({ data :createdReports });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Reports in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Reportss. {status, message, data}
 */
const bulkInsertReports = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdReports = await dbService.createMany(Reports,dataToCreate); 
      return  res.success({ data :{ count :createdReports.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Reports from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Reports(s). {status, message, data}
 */
const findAllReports = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundReports;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      reportsSchemaKey.findFilterKeys,
      Reports.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundReports = await dbService.count(Reports, query);
      if (!foundReports) {
        return res.recordNotFound();
      } 
      foundReports = { totalRecords: foundReports };
      return res.success({ data :foundReports });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundReports = await dbService.paginate( Reports,query,options);
    if (!foundReports){
      return res.recordNotFound();
    }
    return res.success({ data:foundReports }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Reports from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Reports. {status, message, data}
 */
const getReports = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundReports = await dbService.findOne(Reports,{ id :id });
    if (!foundReports){
      return res.recordNotFound();
    }
    return  res.success({ data :foundReports });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Reports.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getReportsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      reportsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedReports = await dbService.count(Reports,where);
    if (!countedReports){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedReports } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Reports with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reports.
 * @return {Object} : updated Reports. {status, message, data}
 */
const updateReports = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      reportsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedReports = await dbService.update(Reports,query,dataToUpdate);
    return  res.success({ data :updatedReports }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Reports with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reportss.
 * @return {Object} : updated Reportss. {status, message, data}
 */
const bulkUpdateReports = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedReports = await dbService.update(Reports,filter,dataToUpdate);
    if (!updatedReports){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedReports.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Reports with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Reports.
 * @return {Object} : updated Reports. {status, message, data}
 */
const partialUpdateReports = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      reportsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedReports = await dbService.update(Reports, query, dataToUpdate);
    if (!updatedReports) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedReports });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Reports from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Reports.
 * @return {Object} : deactivated Reports. {status, message, data}
 */
const softDeleteReports = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedReports = await deleteDependentService.softDeleteReports(query, updateBody);
    if (!updatedReports){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedReports });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Reports from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Reports. {status, message, data}
 */
const deleteReports = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedReports = await deleteDependentService.countReports(query);
      if (!countedReports){
        return res.recordNotFound();
      }
      return res.success({ data :countedReports });
    }
    let deletedReports = await deleteDependentService.deleteUser(query);
    if (!deletedReports){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedReports });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Reports in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyReports = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedReports = await deleteDependentService.countReports(query);
      if (!countedReports) {
        return res.recordNotFound();
      }
      return res.success({ data: countedReports });            
    }
    let deletedReports = await deleteDependentService.deleteReports(query);
    if (!deletedReports) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedReports });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Reports from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Reports.
 * @return {Object} : number of deactivated documents of Reports. {status, message, data}
 */
const softDeleteManyReports = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedReports = await deleteDependentService.softDeleteReports(query, updateBody);
    if (!updatedReports) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedReports });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addReports,
  bulkInsertReports,
  findAllReports,
  getReports,
  getReportsCount,
  updateReports,
  bulkUpdateReports,
  partialUpdateReports,
  softDeleteReports,
  deleteReports,
  deleteManyReports,
  softDeleteManyReports,
};
