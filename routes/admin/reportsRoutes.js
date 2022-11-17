/**
 * reportsRoutes.js
 * @description :: CRUD API routes for reports
 */

const express = require('express');
const router = express.Router();
const reportsController = require('../../controller/admin/reportsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/reports/create').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.addReports);
router.route('/admin/reports/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.bulkInsertReports);
router.route('/admin/reports/list').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.findAllReports);
router.route('/admin/reports/count').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.getReportsCount);
router.route('/admin/reports/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.getReports);
router.route('/admin/reports/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.updateReports);    
router.route('/admin/reports/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.partialUpdateReports);
router.route('/admin/reports/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.bulkUpdateReports);
router.route('/admin/reports/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.softDeleteReports);
router.route('/admin/reports/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.softDeleteManyReports);
router.route('/admin/reports/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.deleteReports);
router.route('/admin/reports/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.deleteManyReports);

module.exports = router;
