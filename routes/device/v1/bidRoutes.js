/**
 * bidRoutes.js
 * @description :: CRUD API routes for bid
 */

const express = require('express');
const router = express.Router();
const bidController = require('../../../controller/device/v1/bidController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/bid/create').post(bidController.addBid);
router.route('/device/api/v1/bid/addBulk').post(bidController.bulkInsertBid);
router.route('/device/api/v1/bid/list').post(bidController.findAllBid);
router.route('/device/api/v1/bid/count').post(bidController.getBidCount);
router.route('/device/api/v1/bid/:id').get(bidController.getBid);
router.route('/device/api/v1/bid/update/:id').put(bidController.updateBid);    
router.route('/device/api/v1/bid/partial-update/:id').put(bidController.partialUpdateBid);
router.route('/device/api/v1/bid/updateBulk').put(bidController.bulkUpdateBid);
router.route('/device/api/v1/bid/softDelete/:id').put(bidController.softDeleteBid);
router.route('/device/api/v1/bid/softDeleteMany').put(bidController.softDeleteManyBid);
router.route('/device/api/v1/bid/delete/:id').delete(bidController.deleteBid);
router.route('/device/api/v1/bid/deleteMany').post(bidController.deleteManyBid);

module.exports = router;
