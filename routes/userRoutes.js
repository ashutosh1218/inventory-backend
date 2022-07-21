const router=require("express").Router();
const {register, login, updateUser, getUser, changePassword}=require('../controllers/usersController')
router.post("/register", register);
router.post('/login', login);
router.post('/updateUser', updateUser)
router.post('/getUser', getUser)
router.post('/changePassword', changePassword);
module.exports=router;