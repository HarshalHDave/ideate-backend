/**
 * reportsRoutes.js
 * @description :: CRUD API routes for reports
 */

const express = require('express');
const router = express.Router();
const reportsController = require('../../../controller/device/v1/reportsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/reports/create').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.addReports);
router.route('/device/api/v1/reports/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.bulkInsertReports);
router.route('/device/api/v1/reports/list').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.findAllReports);
router.route('/device/api/v1/reports/count').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.getReportsCount);
router.route('/device/api/v1/reports/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.getReports);
router.route('/device/api/v1/reports/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.updateReports);    
router.route('/device/api/v1/reports/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.partialUpdateReports);
router.route('/device/api/v1/reports/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.bulkUpdateReports);
router.route('/device/api/v1/reports/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.softDeleteReports);
router.route('/device/api/v1/reports/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.softDeleteManyReports);
router.route('/device/api/v1/reports/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.deleteReports);
router.route('/device/api/v1/reports/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.deleteManyReports);

module.exports = router;
