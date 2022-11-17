/**
 * projectRouteRoutes.js
 * @description :: CRUD API routes for projectRoute
 */

const express = require('express');
const router = express.Router();
const projectRouteController = require('../../controller/admin/projectRouteController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/projectroute/create').post(projectRouteController.addProjectRoute);
router.route('/admin/projectroute/addBulk').post(projectRouteController.bulkInsertProjectRoute);
router.route('/admin/projectroute/list').post(projectRouteController.findAllProjectRoute);
router.route('/admin/projectroute/count').post(projectRouteController.getProjectRouteCount);
router.route('/admin/projectroute/updateBulk').put(projectRouteController.bulkUpdateProjectRoute);
router.route('/admin/projectroute/softDeleteMany').put(projectRouteController.softDeleteManyProjectRoute);
router.route('/admin/projectroute/deleteMany').post(projectRouteController.deleteManyProjectRoute);
router.route('/admin/projectroute/softDelete/:id').put(projectRouteController.softDeleteProjectRoute);
router.route('/admin/projectroute/partial-update/:id').put(projectRouteController.partialUpdateProjectRoute);
router.route('/admin/projectroute/update/:id').put(projectRouteController.updateProjectRoute);    
router.route('/admin/projectroute/:id').get(projectRouteController.getProjectRoute);
router.route('/admin/projectroute/delete/:id').delete(projectRouteController.deleteProjectRoute);

module.exports = router;
