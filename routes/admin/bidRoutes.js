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
router.route('/admin/bid/create').post(auth(PLATFORM.ADMIN),checkRolePermission,bidController.addBid);
router.route('/admin/bid/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,bidController.bulkInsertBid);
router.route('/admin/bid/list').post(auth(PLATFORM.ADMIN),checkRolePermission,bidController.findAllBid);
router.route('/admin/bid/count').post(auth(PLATFORM.ADMIN),checkRolePermission,bidController.getBidCount);
router.route('/admin/bid/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,bidController.getBid);
router.route('/admin/bid/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bidController.updateBid);    
router.route('/admin/bid/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bidController.partialUpdateBid);
router.route('/admin/bid/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,bidController.bulkUpdateBid);
router.route('/admin/bid/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bidController.softDeleteBid);
router.route('/admin/bid/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,bidController.softDeleteManyBid);
router.route('/admin/bid/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,bidController.deleteBid);
router.route('/admin/bid/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,bidController.deleteManyBid);

module.exports = router;
