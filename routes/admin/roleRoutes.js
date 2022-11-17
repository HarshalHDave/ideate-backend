/**
 * roleRoutes.js
 * @description :: CRUD API routes for role
 */

const express = require('express');
const router = express.Router();
const roleController = require('../../controller/admin/roleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/role/create').post(roleController.addRole);
router.route('/admin/role/addBulk').post(roleController.bulkInsertRole);
router.route('/admin/role/list').post(roleController.findAllRole);
router.route('/admin/role/count').post(roleController.getRoleCount);
router.route('/admin/role/updateBulk').put(roleController.bulkUpdateRole);
router.route('/admin/role/softDeleteMany').put(roleController.softDeleteManyRole);
router.route('/admin/role/deleteMany').post(roleController.deleteManyRole);
router.route('/admin/role/softDelete/:id').put(roleController.softDeleteRole);
router.route('/admin/role/partial-update/:id').put(roleController.partialUpdateRole);
router.route('/admin/role/update/:id').put(roleController.updateRole);    
router.route('/admin/role/:id').get(roleController.getRole);
router.route('/admin/role/delete/:id').delete(roleController.deleteRole);

module.exports = router;
