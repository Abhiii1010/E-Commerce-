import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import jwt from 'jsonwebtoken'

// Import the Product model (move it to models/Product.js for better structure)
import Product from "./models/Product.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

// Test route
app.get("/", (req, res) => {
    res.send("connected");
});

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'upload/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup Multer
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// Serve static image files
app.use('/images', express.static(uploadDir));

app.get("/allproduct",async(req,res)=>{
    let products =await Product.find({});
    console.log("all Product fetched");
    res.send(products)
    
})

const Users=mongoose.model('Users',{
    name:{String,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
cartData:{
    type:Object,
},
date:{
    type:Date,
    default:Date.now,
}
});
//creating endpoint for newcollection
app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("New collection fetched")
    res.send(newcollection);
})
//creating endpoint for popular category
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"Women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women Fetched");
    res.send(popular_in_women);
})
//creating endpoint for adding product in cart data
app.post('/addtocart',async(req,res)=>{
    console.log(req.body);
})
    //Creating Endpoint 
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:"User already exists with same email address"})
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;

    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    
    }
    const token=jwt.sign(data,'secretkey');
    res.json({success:true,token})
})
//endpoint for user login

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await Users.findOne({email:req.body.email});
    if(user){
        const passwordMatch=user.password===user.password;
        if(passwordMatch){
            const data={
                user:{
                    id:user.id
                }
            }
            const token =jwt.sign(data,'secretkey');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }

       
    }
     else{
            res.json({success:false,errors:"wrong email id"})
        }
})
// Upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    console.log('Received file:', req.file);
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const id = lastProduct ? (parseInt(lastProduct.id) + 1).toString() : "1";

        const product = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("✅ Product saved:", product);
        res.json({ success: true, name: product.name });
    } catch (error) {
        console.error("❌ Error saving product:", error);
        res.status(500).json({ success: false, message: "Failed to save product." });
    }
});

app.post('/deleteproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log('Removed');
    res.json({
        success:true,
        name:req.body.name,
    })
    
})
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
