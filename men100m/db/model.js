const mongoose=require("mongoose");

const menData=new mongoose.Schema({

    Name:String,
    Email:String,
    Rank:Number,
    Age:Number
})

const MenModel=new mongoose.model('MenModel',menData);

module.exports=MenModel;