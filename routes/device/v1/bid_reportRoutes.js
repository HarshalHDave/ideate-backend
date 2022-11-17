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
router.route('/device/api/v1/bid_report/create').post(bid_reportController.addBid_report);
router.route('/device/api/v1/bid_report/addBulk').post(bid_reportController.bulkInsertBid_report);
router.route('/device/api/v1/bid_report/list').post(bid_reportController.findAllBid_report);
router.route('/device/api/v1/bid_report/count').post(bid_reportController.getBid_reportCount);
router.route('/device/api/v1/bid_report/:id').get(bid_reportController.getBid_report);
router.route('/device/api/v1/bid_report/update/:id').put(bid_reportController.updateBid_report);    
router.route('/device/api/v1/bid_report/partial-update/:id').put(bid_reportController.partialUpdateBid_report);
router.route('/device/api/v1/bid_report/updateBulk').put(bid_reportController.bulkUpdateBid_report);
router.route('/device/api/v1/bid_report/softDelete/:id').put(bid_reportController.softDeleteBid_report);
router.route('/device/api/v1/bid_report/softDeleteMany').put(bid_reportController.softDeleteManyBid_report);
router.route('/device/api/v1/bid_report/delete/:id').delete(bid_reportController.deleteBid_report);
router.route('/device/api/v1/bid_report/deleteMany').post(bid_reportController.deleteManyBid_report);

module.exports = router;
