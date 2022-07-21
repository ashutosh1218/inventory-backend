const Product = require('../models/product');
const {ObjectId}=require('mongodb');
module.exports.getProducts=async (req, res, next)=>{
    try{
        const {userId}=req.body;
        const id=ObjectId(userId);
        const products=await Product.find({
            userId:id
        });
        return res.json(products);
    }
    catch(ex){
        next(ex);
    }
    
    
}
module.exports.addProduct=async (req, res, next)=>{
    try{
        const {title, imageUrl, price, description, category, userId}=req.body;
        const data=await Product.create({
            title:title,
            imageUrl:imageUrl,
            price:price,
            description:description,
            category:category,
            userId:userId
        })
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
        // console.log(req.body);
    }
    catch(ex){
        next(ex);
    }
    
}
module.exports.updateProduct=async (req, res, next)=>{
    try{
        const {title, imageUrl, price, description, category, id, userId}=req.body;
        // console.log(req.body);
        Product.findById(id)
        .then(product=>{
            product.title=title;
            product.imageUrl=imageUrl;
            product.price=price;
            product.description=description;
            product.category=category;
            product.userId=userId;
            return product.save();

        })
        .then(result=>{
            return res.json({ msg: "Product updated successfully." });
        })
        .catch(err=>{
            return res.json({msg:"Failed to update product"});
        })
    }
    catch(ex){
        next(ex);
    }
}
module.exports.deleteProduct=async (req, res, next)=>{
    try{
        const {id}=req.body;
        // console.log(id);
        const prodId=ObjectId(id);
        const data=await Product.findByIdAndRemove(id);
        if(data) return res.json({msg:"Product Deleted Successfully"});
        else return res.json({ msg: "Failed to delete the product"});
    }
    catch(ex){
        next(ex)
    }

}
module.exports.deleteCategory=async (req, res, next)=>{
    try{
        const {category} = req.body;
        console.log(category);
        const data=await Product.deleteMany({category:category});
        if(data) return res.json({msg:"category Deleted Successfully"});
        else return res.json({ msg: "Failed to delete the category"});
    }
    catch(ex){
        next(ex);
    }
}