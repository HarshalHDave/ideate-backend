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
router.route('/device/api/v1/bid/create').post(auth(PLATFORM.DEVICE),checkRolePermission,bidController.addBid);
router.route('/device/api/v1/bid/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,bidController.bulkInsertBid);
router.route('/device/api/v1/bid/list').post(auth(PLATFORM.DEVICE),checkRolePermission,bidController.findAllBid);
router.route('/device/api/v1/bid/count').post(auth(PLATFORM.DEVICE),checkRolePermission,bidController.getBidCount);
router.route('/device/api/v1/bid/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,bidController.getBid);
router.route('/device/api/v1/bid/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bidController.updateBid);    
router.route('/device/api/v1/bid/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bidController.partialUpdateBid);
router.route('/device/api/v1/bid/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,bidController.bulkUpdateBid);
router.route('/device/api/v1/bid/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bidController.softDeleteBid);
router.route('/device/api/v1/bid/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,bidController.softDeleteManyBid);
router.route('/device/api/v1/bid/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,bidController.deleteBid);
router.route('/device/api/v1/bid/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,bidController.deleteManyBid);

module.exports = router;
