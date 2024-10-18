const mongoose= require("mongoose");
const {Schema}=mongoose;

const UserData= mongoose.Schema({
    title:{
        type:String,

    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref:"review",
        }
    ]
})

const listing=mongoose.model("listing",UserData);

module.exports=listing;