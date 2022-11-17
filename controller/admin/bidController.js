/**
 * bidController.js
 * @description :: exports action methods for bid.
 */

const Bid = require('../../model/bid');
const bidSchemaKey = require('../../utils/validation/bidValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Bid in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Bid. {status, message, data}
 */ 
const addBid = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      bidSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBid = await dbService.createOne(Bid,dataToCreate);
    return  res.success({ data :createdBid });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Bid in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Bids. {status, message, data}
 */
const bulkInsertBid = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBid = await dbService.createMany(Bid,dataToCreate); 
      return  res.success({ data :{ count :createdBid.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Bid from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Bid(s). {status, message, data}
 */
const findAllBid = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBid;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      bidSchemaKey.findFilterKeys,
      Bid.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBid = await dbService.count(Bid, query);
      if (!foundBid) {
        return res.recordNotFound();
      } 
      foundBid = { totalRecords: foundBid };
      return res.success({ data :foundBid });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBid = await dbService.paginate( Bid,query,options);
    if (!foundBid){
      return res.recordNotFound();
    }
    return res.success({ data:foundBid }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Bid from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Bid. {status, message, data}
 */
const getBid = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBid = await dbService.findOne(Bid,{ id :id });
    if (!foundBid){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBid });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Bid.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBidCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      bidSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBid = await dbService.count(Bid,where);
    if (!countedBid){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBid } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Bid with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bid.
 * @return {Object} : updated Bid. {status, message, data}
 */
const updateBid = async (req, res) => {
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
      bidSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBid = await dbService.update(Bid,query,dataToUpdate);
    return  res.success({ data :updatedBid }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Bid with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bids.
 * @return {Object} : updated Bids. {status, message, data}
 */
const bulkUpdateBid = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBid = await dbService.update(Bid,filter,dataToUpdate);
    if (!updatedBid){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBid.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Bid with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bid.
 * @return {Object} : updated Bid. {status, message, data}
 */
const partialUpdateBid = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bidSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBid = await dbService.update(Bid, query, dataToUpdate);
    if (!updatedBid) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBid });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Bid from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Bid.
 * @return {Object} : deactivated Bid. {status, message, data}
 */
const softDeleteBid = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedBid = await deleteDependentService.softDeleteBid(query, updateBody);
    if (!updatedBid){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedBid });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Bid from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Bid. {status, message, data}
 */
const deleteBid = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedBid = await deleteDependentService.countBid(query);
      if (!countedBid){
        return res.recordNotFound();
      }
      return res.success({ data :countedBid });
    }
    let deletedBid = await deleteDependentService.deleteUser(query);
    if (!deletedBid){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedBid });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Bid in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBid = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedBid = await deleteDependentService.countBid(query);
      if (!countedBid) {
        return res.recordNotFound();
      }
      return res.success({ data: countedBid });            
    }
    let deletedBid = await deleteDependentService.deleteBid(query);
    if (!deletedBid) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedBid });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Bid from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Bid.
 * @return {Object} : number of deactivated documents of Bid. {status, message, data}
 */
const softDeleteManyBid = async (req, res) => {
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
    let updatedBid = await deleteDependentService.softDeleteBid(query, updateBody);
    if (!updatedBid) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedBid });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBid,
  bulkInsertBid,
  findAllBid,
  getBid,
  getBidCount,
  updateBid,
  bulkUpdateBid,
  partialUpdateBid,
  softDeleteBid,
  deleteBid,
  deleteManyBid,
  softDeleteManyBid,
};
