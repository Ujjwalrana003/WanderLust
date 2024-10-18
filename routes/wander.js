const express=require("express");
const router=express.Router();
const asynwrap=require("../public/js/wrapError.js");
const listing=require("../model/structure");

router.get("/wanderlust",asynwrap(async (req,res)=>{
    const data= await listing.find();
    res.render("index.ejs",{data});
}));

router.get("/wanderlust/info",(req,res)=>{
    res.render("info.ejs");
})
router.get("/wanderlust/show/:id",asynwrap(async (req,res)=>{
    let {id}= req.params;
    const data= await listing.findById(id).populate("reviews");
    res.render("show.ejs",{data});
}));

router.get("/wanderlust/add",(req,res)=>{
    
    res.render("add.ejs");
});

router.post("/add",asynwrap(async (req,res)=>{
    const {list}= req.body;
    
    // const result=joiSchema.validate(req.body);
    
    const userData= await listing({title:list.title,description:list.description,image:list.image,price:list.price,location:list.location,country:list.country});
    userData.save().catch((err)=>{
        console.log(err);
    })
    req.flash("success","Listing is successfully added");
    
    res.redirect("/wanderlust");
    
}));

router.get("/wanderlust/edit/:id",asynwrap(async (req,res)=>{
    let {id}= req.params;
    const data= await listing.findById(id);
    res.render("edit.ejs",{data});

}));

router.post("/edit/:id",asynwrap(async (req,res)=>{
    let {id}=req.params;
    let {title,description,image,price,location,country}= req.body;
    const value= await listing.findByIdAndUpdate(id,{title:title,description:description,image:image,price:price,location:location,country:country},{new:true});
    req.flash("success","Listing is edit successfully");
    res.redirect(`/wanderlust/show/${id}`);
}));

router.get("/wanderlust/booking/:id",asynwrap(async (req,res)=>{
   
    let {id}=req.params;
    let data= await listing.findById(id);
    res.render("booking.ejs",{data});
   
    
}));

router.delete("/wanderlust/delete/:id",asynwrap(async(req,res,next)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing is deleted");
    res.redirect("/wanderlust");

}));



module.exports=router;