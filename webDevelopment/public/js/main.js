let submitBtn=document.getElementById('submitBtn');
let outPut=document.getElementById('city_name');
let tempStatus=document.getElementById('temp_status');
let temp=document.getElementById('temp_real_val');
let middleLayer=document.querySelector('.middle_layer');
let day=document.getElementById('day');
let date=document.getElementById('today_data');

let cityName=document.getElementById('cityName');


let days=["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
let month=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
let dateObj=new Date();
let currentDay=dateObj.getDay();
let currentDate=dateObj.getDate();
let currentMonth=dateObj.getMonth();


day.innerText=days[currentDay];
    date.innerText=`${currentDate} ${month[currentMonth]}`;

const getCityInfo=async(event)=>{

    let city=cityName.value;
    event.preventDefault();
    if(city.length==0){
        outPut.innerText='Please Enter valid City Name';
        middleLayer.classList.add('data_hide');
    }
    else{
        try{
       let apiData=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22ea01850755c0e0728ef752f98d5c5d&units=metric`)
       let objData=await apiData.json();
       let finalData=new Array(objData);
       middleLayer.classList.remove('data_hide');
        let temperature=finalData[0].main.temp;
        let temp_stats=finalData[0].weather[0].main;
        temp.innerText=temperature;
        outPut.innerText=`${finalData[0].name},${finalData[0].sys.country}`;
        if(temp_stats=='Rain'){
            tempStatus.innerHTML=`<i class="fas fa-cloud-rain" style='color: #a4b0be;'></i>`;
        }else if(temp_stats=='Clouds'){
            tempStatus.innerHTML=`<i class="fas fa-cloud" style='color: #f1f2f6;'></i>`;
        }
        else if(temp_stats=='Clear'){
            tempStatus.innerHTML=`<i class="fas fa-sun" style='color: #eccc68;'></i>`;
        }
        else{
            tempStatus.innerHTML=`<i class="fas fa-sun" style='color: #eccc68;'></i>`;
        }
        }
        catch(e){
            outPut.innerText='Please Enter valid City Name';
            middleLayer.classList.add('data_hide');
        }
    }
}


submitBtn.addEventListener('click',getCityInfo)