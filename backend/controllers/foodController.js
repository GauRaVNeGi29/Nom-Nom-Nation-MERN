import foodModel from '../models/foodModel.js'
import fs from 'fs'

async function addFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image not uploaded" });
        }
        const image_filename = req.file.filename;
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category,
        });
        await food.save();
        res.json({success: true, message: "Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// All food list
async function listFood(req, res) {
    try{
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    }catch(error){
        res.json({success:false, message: "Error"});
    }
}

// Remove fodd item
async function removeFood(req, res) {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Food Removed"}); 
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {addFood, listFood, removeFood}