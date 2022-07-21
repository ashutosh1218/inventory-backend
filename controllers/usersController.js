const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: 'Email already used', status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            cart: { items: [] }
        });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
}

module.exports.login=async (req, res, next)=>{
    try {
        const { username, password} = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        const isPasswordValid=await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
}
module.exports.getUser=async (req, res, next)=>{
    try{
        const {id}=req.body;
        const user=await User.findById(id);
        if(user)
            return res.json(user);
    }
    catch(ex){
        next(ex);
    }
}
module.exports.updateUser=async (req, res, next)=>{
    try{
        const {name, email, age, id}=req.body;
        // console.log(req.body);
        User.findById(id)
        .then(user=>{
            user.name=name;
            user.email=email;
            user.age=age;
            return user.save();
        })
        .then(result=>{
            return res.json({ msg: "User updated successfully." });
        })
        .catch(err=>{
            return res.json({msg:"Failed to update product"});
        })
    }
    catch(ex){
        next(ex);
    }
    
}
module.exports.changePassword=async (req, res, next)=>{
    try{
        const {currentPassword, newPassword, id}=req.body;
        console.log(req.body);
        const user=await User.findById(id);
        const isPasswordValid=await bcrypt.compare(user.password, currentPassword);
        if(isPasswordValid){
            user.password=await bcrypt(newPassword, 10);
            user.save();
            return res.json({ msg: "Password updated successfully." });
        }
        else{
            return res.json({msg:"Passwords do not match"});
        }
        // User.findById(id)
        // .then(user=>{
        //     const isPasswordValid=await bcrypt.compare(user.password, currentPassword);
        //     if(isPasswordValid){
        //         user.password=await bcrypt(newPassword, 10);
        //         return user.save();
        //     }
        // })
    }
    catch(ex){
        next(ex);
    }
}