const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { upload } = require('../midlewares/multer');

router.get('/dashboard', adminController.viewDashboard);

//<--------endpoint Category----------->
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.put('/category', adminController.updateCategory);
router.delete('/category/:id', adminController.deleteCategory);
//<----------------./------------------>

router.get('/bank', adminController.viewBank);
router.post('/bank', upload, adminController.addBank);
router.put('/bank', upload, adminController.editBank);
router.delete('/bank/:id', adminController.deleteBank);

router.get('/item', adminController.viewItem);
router.get('/booking', adminController.viewBooking);

module.exports = router;