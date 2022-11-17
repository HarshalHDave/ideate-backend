/**
 * bidRoutes.js
 * @description :: CRUD API routes for bid
 */

const express = require('express');
const router = express.Router();
const bidController = require('../../controller/admin/bidController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/bid/create').post(bidController.addBid);
router.route('/admin/bid/addBulk').post(bidController.bulkInsertBid);
router.route('/admin/bid/list').post(bidController.findAllBid);
router.route('/admin/bid/count').post(bidController.getBidCount);
router.route('/admin/bid/:id').get(bidController.getBid);
router.route('/admin/bid/update/:id').put(bidController.updateBid);    
router.route('/admin/bid/partial-update/:id').put(bidController.partialUpdateBid);
router.route('/admin/bid/updateBulk').put(bidController.bulkUpdateBid);
router.route('/admin/bid/softDelete/:id').put(bidController.softDeleteBid);
router.route('/admin/bid/softDeleteMany').put(bidController.softDeleteManyBid);
router.route('/admin/bid/delete/:id').delete(bidController.deleteBid);
router.route('/admin/bid/deleteMany').post(bidController.deleteManyBid);

module.exports = router;
