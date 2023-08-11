const mongoose=require("mongoose");


async function connectDb(){

    try{
let connection=await mongoose.connect('mongodb://127.0.0.1:27017/sports',{useNewUrlParser:true},{useUnifiedTopology:true});
console.log("Successfully connected");
}
catch(e){
console.log("Exception occured while connecting:",e);
    }
}

connectDb();

require('./model');
