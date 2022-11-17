/**
 * userRoleRoutes.js
 * @description :: CRUD API routes for userRole
 */

const express = require('express');
const router = express.Router();
const userRoleController = require('../../controller/admin/userRoleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/userrole/create').post(userRoleController.addUserRole);
router.route('/admin/userrole/addBulk').post(userRoleController.bulkInsertUserRole);
router.route('/admin/userrole/list').post(userRoleController.findAllUserRole);
router.route('/admin/userrole/count').post(userRoleController.getUserRoleCount);
router.route('/admin/userrole/updateBulk').put(userRoleController.bulkUpdateUserRole);
router.route('/admin/userrole/softDeleteMany').put(userRoleController.softDeleteManyUserRole);
router.route('/admin/userrole/deleteMany').post(userRoleController.deleteManyUserRole);
router.route('/admin/userrole/softDelete/:id').put(userRoleController.softDeleteUserRole);
router.route('/admin/userrole/partial-update/:id').put(userRoleController.partialUpdateUserRole);
router.route('/admin/userrole/update/:id').put(userRoleController.updateUserRole);    
router.route('/admin/userrole/:id').get(userRoleController.getUserRole);
router.route('/admin/userrole/delete/:id').delete(userRoleController.deleteUserRole);

module.exports = router;
