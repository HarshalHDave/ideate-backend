/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Bid = require('../model/bid');
let Bid_report = require('../model/bid_report');
let Reports = require('../model/reports');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBid = async (filter) =>{
  try {
    let bid = await dbService.findAll(Bid,filter);
    if (bid && bid.length){
      bid = bid.map((obj) => obj.id);

      const bid_reportFilter = { $or: [{ bid_id : { $in : bid } }] };
      const bid_reportCnt = await dbService.destroy(Bid_report,bid_reportFilter);

      let deleted  = await dbService.destroy(Bid,filter);
      let response = { bid_report :bid_reportCnt.length, };
      return response; 
    } else {
      return {  bid : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBid_report = async (filter) =>{
  try {
    let response  = await dbService.destroy(Bid_report,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteReports = async (filter) =>{
  try {
    let reports = await dbService.findAll(Reports,filter);
    if (reports && reports.length){
      reports = reports.map((obj) => obj.id);

      const bid_reportFilter = { $or: [{ report_id : { $in : reports } }] };
      const bid_reportCnt = await dbService.destroy(Bid_report,bid_reportFilter);

      let deleted  = await dbService.destroy(Reports,filter);
      let response = { bid_report :bid_reportCnt.length, };
      return response; 
    } else {
      return {  reports : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const bidFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bidCnt = await dbService.destroy(Bid,bidFilter);

      const bid_reportFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bid_reportCnt = await dbService.destroy(Bid_report,bid_reportFilter);

      const reportsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const reportsCnt = await dbService.destroy(Reports,reportsFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        bid :bidCnt.length,
        bid_report :bid_reportCnt.length,
        reports :reportsCnt.length,
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countBid = async (filter) =>{
  try {
    let bid = await dbService.findAll(Bid,filter);
    if (bid && bid.length){
      bid = bid.map((obj) => obj.id);

      const bid_reportFilter = { $or: [{ bid_id : { $in : bid } }] };
      const bid_reportCnt =  await dbService.count(Bid_report,bid_reportFilter);

      let response = { bid_report : bid_reportCnt, };
      return response; 
    } else {
      return {  bid : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBid_report = async (filter) =>{
  try {
    const bid_reportCnt =  await dbService.count(Bid_report,filter);
    return { bid_report : bid_reportCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countReports = async (filter) =>{
  try {
    let reports = await dbService.findAll(Reports,filter);
    if (reports && reports.length){
      reports = reports.map((obj) => obj.id);

      const bid_reportFilter = { $or: [{ report_id : { $in : reports } }] };
      const bid_reportCnt =  await dbService.count(Bid_report,bid_reportFilter);

      let response = { bid_report : bid_reportCnt, };
      return response; 
    } else {
      return {  reports : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const bidFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bidCnt =  await dbService.count(Bid,bidFilter);

      const bid_reportFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bid_reportCnt =  await dbService.count(Bid_report,bid_reportFilter);

      const reportsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const reportsCnt =  await dbService.count(Reports,reportsFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        bid : bidCnt,
        bid_report : bid_reportCnt,
        reports : reportsCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBid = async (filter,updateBody) =>{  
  try {
    let bid = await dbService.findAll(Bid,filter, { id:1 });
    if (bid.length){
      bid = bid.map((obj) => obj.id);

      const bid_reportFilter = { '$or': [{ bid_id : { '$in' : bid } }] };
      const bid_reportCnt = await dbService.update(Bid_report,bid_reportFilter,updateBody);
      let updated = await dbService.update(Bid,filter,updateBody);

      let response = { bid_report :bid_reportCnt.length, };
      return response;
    } else {
      return {  bid : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBid_report = async (filter,updateBody) =>{  
  try {
    const bid_reportCnt =  await dbService.update(Bid_report,filter);
    return { bid_report : bid_reportCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteReports = async (filter,updateBody) =>{  
  try {
    let reports = await dbService.findAll(Reports,filter, { id:1 });
    if (reports.length){
      reports = reports.map((obj) => obj.id);

      const bid_reportFilter = { '$or': [{ report_id : { '$in' : reports } }] };
      const bid_reportCnt = await dbService.update(Bid_report,bid_reportFilter,updateBody);
      let updated = await dbService.update(Reports,filter,updateBody);

      let response = { bid_report :bid_reportCnt.length, };
      return response;
    } else {
      return {  reports : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const bidFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const bidCnt = await dbService.update(Bid,bidFilter,updateBody);

      const bid_reportFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const bid_reportCnt = await dbService.update(Bid_report,bid_reportFilter,updateBody);

      const reportsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const reportsCnt = await dbService.update(Reports,reportsFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        bid :bidCnt.length,
        bid_report :bid_reportCnt.length,
        reports :reportsCnt.length,
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBid,
  deleteBid_report,
  deleteReports,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBid,
  countBid_report,
  countReports,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBid,
  softDeleteBid_report,
  softDeleteReports,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
