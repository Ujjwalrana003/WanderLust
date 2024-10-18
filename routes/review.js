const express=require("express");
const router=express.Router();
const Review =require("../model/Review.js");
const listing=require("../model/structure");
const path=require("path");


router.post("/wanderlust/:id/reviews",async(req,res)=>{
    
    let data= await listing.findById(req.params.id); //find user data
    let newReview= new Review(req.body.review);//find

    data.reviews.push(newReview);

    await newReview.save();
    await data.save();
    
    res.redirect(`/wanderlust/show/${req.params.id}`);

})


module.exports=router;