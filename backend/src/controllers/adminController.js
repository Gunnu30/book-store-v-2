const { supabaseServiceRole } = require('../config/db');
const bookModel = require('../models/booksModel');
const { findUserByEmail,saveResetToken,getUser,updatePasswrod } = require('../models/userModel');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const sendResetMail = require("../utils/sendResetMail")

exports.addBook = async (req , res) =>{
    const {title,author,price,cover_url,description,genres} = req.body;
    console.log(req.body,"add book req");
    console.log("List",genres)
    const priceFloat = parseFloat(price);
    try{
        const newBook = await bookModel.addBook({title,author,priceFloat,cover_url,description});
        console.log("new Book from controller",newBook);
        await bookModel.addBookGenres(newBook.id,genres);
        return res.status(201).json({message:"Book Added Successfully",book:newBook});
    }catch(err){
        res.status(500).json({message:"Error Adding Book",error:err.message});
    }

}


exports.allStudents = async (req,res) =>{
    try{
        const data = await supabaseServiceRole.getAllUsers();
        return res.status(201).json({message:"Students List is Retrived.",data});
    }catch(err){
        return res.status(500).json({message:"Error while Selections all students"});
    }

}

exports.forgotPassword = async (req,res) =>{
    console.log(req.body);
    try{
        const {email} = req.body;
        console.log(email)
        const data = await findUserByEmail(email);
        if(!data) return res.status(403).json({message:"No User Exists"});

        const token = crypto.randomBytes(32).toString("hex");
        console.log(token)
        console.log(data.id)
        await saveResetToken(data.id,token);

        await sendResetMail(email,token);
        
        return res.status(200).json({message:"REset Link is Sent to your mail"});
        
    }catch(err){
        return res.status(500).json({message:"Server Error", error: err.message});
    }
}

exports.resetPassword = async (req,res)=>{

    const {newPassword,token} = req.body;
    try{
        const user = await getUser('d552b8e0d08485a65a0b4475bc0e5be530e939d4a3bda5f3e08ec45d44c836db');
        if(!user || user.details === null)return res.status(404).json({message:"User Doesn't exist"});
        const hasPass = await bcrypt.hash(newPassword,10);
        console.log("hiii",hasPass)
        const updated = await updatePasswrod(user,hasPass);
        if(updated){
            await supabaseServiceRole
            .from("password_resets")
            .update({"used":true})
            .eq("token",token);
            return res.status(201).json({message:"successfully Resetend Your Password"});
        }
        return res.status(404).json({message:"Update failed"});
    }catch(e){
        return res.status(500).json({message:"Server Error"})
    }

}