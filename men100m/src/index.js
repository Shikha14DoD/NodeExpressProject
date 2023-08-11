const express=require("express");
const MenModel=require('../db/model');
const app=express();

let port=process.env.port||3000;

app.use(express.json());

require('../db/conn');

app.get('/',(req,res)=>{

    res.status(200).send("Welcome to the home page!");
})

app.post('/men',async (req,res)=>{
   
    let data=req.body;

    try{
    let saveData=new MenModel(data);
    let result=await saveData.save();
    console.log("Saved data successfuly");
    res.status(200).send("Saved data here");
    }
    catch(e){
     console.log("Error while saving data:",e);
    }

    

})

app.get('/menSports/',async (req,res)=>{

    let nam=req.params.name;
    try{
    let mydata=await MenModel.find();
    if(mydata.length==0){
        res.send('Data not found');
    }
    else{
    console.log("succesfully fetched data");
    res.status(200).send(mydata);
    }
    }
    catch(e){
        console.log("error while fetching data:",e);
    }
    
})
app.get('/mySports/:name',async (req,res)=>{

    let nam=req.params.name;
    try{
    let mydata=await MenModel.find({Name:nam});
    if(mydata.length==0){
        res.send('Data not found');
    }
    else{
    console.log("succesfully fetched data");
    res.status(200).send(mydata);
    }
    }
    catch(e){
        console.log("error while fetching data:",e);
    }
    
})

app.patch('/updateData/:name',async (req,res)=>{
   
    let name=req.params.name;
    try{
    let updateD=await MenModel.updateOne({Name:name},{$set:{Rank:11}});
    console.log("updated or not:",updateD);
     res.status(200).send('successfuly updated data');
    }
    catch(e){
      console.log("Error while updating data:",e);
      res.status(500).send('Error occured while updating');
    }

})

app.delete('/deleteData/:name',async (req,res)=>{

    let name=req.params.name;
    try{
    let deleteD=await MenModel.deleteOne({Name:name});
    console.log("delete or not:",deleteD);
     res.status(200).send('successfuly deleted data');
    }
    catch(e){
      console.log("Error while deleting data:",e);
      res.status(500).send('Error occured while deleting');
    }
     
})

app.get('/other',(req,res)=>{

    res.status(200).send("Welcome to the other page!");
})


app.get('*',(req,res)=>{

    res.status(404).send('No page found');
})
app.listen(port,()=>{

    console.log(`Server is listeing on port ${port}`);
})