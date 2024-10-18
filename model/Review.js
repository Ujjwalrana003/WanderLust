const mongoose= require("mongoose");
const {Schema}=mongoose;

const reviewSchema= new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
});


module.exports=mongoose.model("review",reviewSchema);
