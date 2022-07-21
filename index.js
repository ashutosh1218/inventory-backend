const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const userRoutes=require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');
const app = express();
app.use(express.json());
app.use(cors());

MONGO_URL="mongodb+srv://ashutosh1218:<password>@cluster0.y3laj.mongodb.net/inventory-app";
let port=process.env.PORT;
if(port==null||port===''){
    port=5000;
}
require('dotenv').config();

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("DB connected");
})
.catch(err=> console.log(err.message));

const server=app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})