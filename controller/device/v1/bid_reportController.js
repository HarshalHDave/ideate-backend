/**
 * bid_reportController.js
 * @description :: exports action methods for bid_report.
 */

const Bid_report = require('../../../model/bid_report');
const bid_reportSchemaKey = require('../../../utils/validation/bid_reportValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Bid_report in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Bid_report. {status, message, data}
 */ 
const addBid_report = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      bid_reportSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBid_report = await dbService.createOne(Bid_report,dataToCreate);
    return  res.success({ data :createdBid_report });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Bid_report in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Bid_reports. {status, message, data}
 */
const bulkInsertBid_report = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBid_report = await dbService.createMany(Bid_report,dataToCreate); 
      return  res.success({ data :{ count :createdBid_report.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Bid_report from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Bid_report(s). {status, message, data}
 */
const findAllBid_report = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBid_report;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      bid_reportSchemaKey.findFilterKeys,
      Bid_report.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBid_report = await dbService.count(Bid_report, query);
      if (!foundBid_report) {
        return res.recordNotFound();
      } 
      foundBid_report = { totalRecords: foundBid_report };
      return res.success({ data :foundBid_report });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBid_report = await dbService.paginate( Bid_report,query,options);
    if (!foundBid_report){
      return res.recordNotFound();
    }
    return res.success({ data:foundBid_report }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Bid_report from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Bid_report. {status, message, data}
 */
const getBid_report = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBid_report = await dbService.findOne(Bid_report,{ id :id });
    if (!foundBid_report){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBid_report });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Bid_report.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBid_reportCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      bid_reportSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBid_report = await dbService.count(Bid_report,where);
    if (!countedBid_report){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBid_report } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Bid_report with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bid_report.
 * @return {Object} : updated Bid_report. {status, message, data}
 */
const updateBid_report = async (req, res) => {
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
      bid_reportSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBid_report = await dbService.update(Bid_report,query,dataToUpdate);
    return  res.success({ data :updatedBid_report }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Bid_report with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bid_reports.
 * @return {Object} : updated Bid_reports. {status, message, data}
 */
const bulkUpdateBid_report = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBid_report = await dbService.update(Bid_report,filter,dataToUpdate);
    if (!updatedBid_report){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBid_report.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Bid_report with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bid_report.
 * @return {Object} : updated Bid_report. {status, message, data}
 */
const partialUpdateBid_report = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bid_reportSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBid_report = await dbService.update(Bid_report, query, dataToUpdate);
    if (!updatedBid_report) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBid_report });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Bid_report from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Bid_report.
 * @return {Object} : deactivated Bid_report. {status, message, data}
 */
const softDeleteBid_report = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Bid_report, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Bid_report from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Bid_report. {status, message, data}
 */
const deleteBid_report = async (req, res) => {
  const result = await dbService.deleteByPk(Bid_report, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Bid_report in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBid_report = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedBid_report = await dbService.destroy(Bid_report,query);
    return res.success({ data :{ count :deletedBid_report.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Bid_report from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Bid_report.
 * @return {Object} : number of deactivated documents of Bid_report. {status, message, data}
 */
const softDeleteManyBid_report = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedBid_report = await dbService.update(Bid_report,query,updateBody, options);
    if (!updatedBid_report) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedBid_report.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBid_report,
  bulkInsertBid_report,
  findAllBid_report,
  getBid_report,
  getBid_reportCount,
  updateBid_report,
  bulkUpdateBid_report,
  partialUpdateBid_report,
  softDeleteBid_report,
  deleteBid_report,
  deleteManyBid_report,
  softDeleteManyBid_report,
};
