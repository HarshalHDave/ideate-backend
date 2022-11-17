/**
 * bid_reportRoutes.js
 * @description :: CRUD API routes for bid_report
 */

const express = require('express');
const router = express.Router();
const bid_reportController = require('../../../controller/device/v1/bid_reportController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/bid_report/create').post(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.addBid_report);
router.route('/device/api/v1/bid_report/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.bulkInsertBid_report);
router.route('/device/api/v1/bid_report/list').post(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.findAllBid_report);
router.route('/device/api/v1/bid_report/count').post(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.getBid_reportCount);
router.route('/device/api/v1/bid_report/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.getBid_report);
router.route('/device/api/v1/bid_report/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.updateBid_report);    
router.route('/device/api/v1/bid_report/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.partialUpdateBid_report);
router.route('/device/api/v1/bid_report/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.bulkUpdateBid_report);
router.route('/device/api/v1/bid_report/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.softDeleteBid_report);
router.route('/device/api/v1/bid_report/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.softDeleteManyBid_report);
router.route('/device/api/v1/bid_report/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.deleteBid_report);
router.route('/device/api/v1/bid_report/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,bid_reportController.deleteManyBid_report);

module.exports = router;
