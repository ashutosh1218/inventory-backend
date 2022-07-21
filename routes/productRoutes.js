const router=require("express").Router();
const {getProducts, addProduct, deleteProduct, deleteCategory, updateProduct}=require('../controllers/productsContoller');
router.post('/getProducts/', getProducts);
router.post('/addProduct/', addProduct);
router.post('/deleteProduct', deleteProduct);
router.post('/deleteCategory', deleteCategory);
router.post('/updateProduct', updateProduct);
module.exports=router;
