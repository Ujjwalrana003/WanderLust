const express =require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");//boilerplate
const ExpressError= require("./public/js/ErrorHandle.js");
const asynwrap=require("./public/js/wrapError.js");
const session=require("express-session");
const flash= require("connect-flash");
const listing=require("./model/structure");

const wander=require("./routes/wander");
const review=require("./routes/review");

const sessionOption=[
    session({
        secret: "myfirstsession",
        resave: false,
        saveUninitialized: true,
    })
]

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));//use body 
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



app.use(sessionOption);
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    next();
})
main().then(()=>{
    console.log("Sever is connected");
}).catch((err)=>{
    console.log(err);
})

 async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", async (req,res)=>{
    let data= await listing.find();
    res.render("./index.ejs",{data});
})


app.use(wander);
app.use(review);

app.get("*",asynwrap((req,res,next)=>{
    throw new ExpressError(400,"Not found");
}))

app.use((err,req,res,next)=>{
    // let {status,message}=err;
    // res.status(status).send(message);
    res.render("./Error.ejs",{err});
})

app.listen(8080,()=>{
    console.log("Sever is listening...");
})