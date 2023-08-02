const express=require("express");
const path=require("path");
const hbs=require('hbs');

const app=express();

const publicFolder=path.join(__dirname,'../public');

const PORT=process.env.port||3000;

app.use(express.static(publicFolder));

app.set('view engine','hbs');
app.get('/',(req,res)=>{

   res.render('index');

})
let viewsDirectory=path.join(__dirname,'../template/views');
let partialsDirectory=path.join(__dirname,'../template/partials');

hbs.registerPartials(partialsDirectory);

app.set('views',viewsDirectory);

app.get('/about',(req,res)=>{

    res.render('about');
})

app.get('/weather',(req,res)=>{

    res.render('weather');
})

app.get('*',(req,res)=>{

    res.render('404error',{
        errorMsg:'Oops! Page Not Found'
    });
})

app.listen(PORT,()=>{
    console.log(`Server is listenig at port no ${PORT}`);
})