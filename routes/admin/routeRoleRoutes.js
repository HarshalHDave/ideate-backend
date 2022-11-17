/**
 * routeRoleRoutes.js
 * @description :: CRUD API routes for routeRole
 */

const express = require('express');
const router = express.Router();
const routeRoleController = require('../../controller/admin/routeRoleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/routerole/create').post(routeRoleController.addRouteRole);
router.route('/admin/routerole/addBulk').post(routeRoleController.bulkInsertRouteRole);
router.route('/admin/routerole/list').post(routeRoleController.findAllRouteRole);
router.route('/admin/routerole/count').post(routeRoleController.getRouteRoleCount);
router.route('/admin/routerole/updateBulk').put(routeRoleController.bulkUpdateRouteRole);
router.route('/admin/routerole/softDeleteMany').put(routeRoleController.softDeleteManyRouteRole);
router.route('/admin/routerole/deleteMany').post(routeRoleController.deleteManyRouteRole);
router.route('/admin/routerole/softDelete/:id').put(routeRoleController.softDeleteRouteRole);
router.route('/admin/routerole/partial-update/:id').put(routeRoleController.partialUpdateRouteRole);
router.route('/admin/routerole/update/:id').put(routeRoleController.updateRouteRole);    
router.route('/admin/routerole/:id').get(routeRoleController.getRouteRole);
router.route('/admin/routerole/delete/:id').delete(routeRoleController.deleteRouteRole);

module.exports = router;
