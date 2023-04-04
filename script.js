
//selecting the html elements to get the data
let entered_date=document.getElementById("search-input");
let curr_date=document.getElementById("curr-date");
let image_section=document.getElementById("current-image");
let sub_btn=document.getElementById("btn");
let content__section=document.getElementById("content");
let title_section=document.getElementById("title");
let para =document.getElementById("para");
let prev_searches=document.getElementById("search-history")



//after setting the date performing the below operations
sub_btn.addEventListener("click",()=>{

    let date=entered_date.value;
    getImageOfTheDay(date);
    saveSearch();
    addSearchToHistory();

    // console.log("previous searches array" , prev_searches.innerText);

})


//----getting the current image of the day..


//---this array is used to store the dates 

//Saving date value  in dates aray becoz of 
var  dates=[];
let img=document.createElement("img");
function getCurrentImageOfTheDay()
{
    
    // let date1=new Date(date);
    let your_api_key="RZDxbRDL6mxDtqHifAoTw23kxvkaTJYxDRk5ybrE";
    fetch(`https://api.nasa.gov/planetary/apod?date=2023-04-04&api_key=${your_api_key}`)
    .then((response)=>response.json())
    .then((data)=>{
       
        // this is the header element in the image 
        curr_date.innerText="Picture on " + data.date;
        
        img.src=data.url;
        img.style.maxHeight="300px";
        img.style.maxWidth="300px";
        image_section.appendChild(img);

        
        title_section.innerHTML=data.title;
        
        para.innerText=data.explanation;
        // console.log(data.title);
    })
    .catch((error)=>{console.log(error);})
   
    
}
getCurrentImageOfTheDay()



//getImageofTheday(): Image for selected Date
function getImageOfTheDay(date)
{
    var d = new Date(date);
    // image_section.remove();
    if(d)
    {
        
        
    //Coverting the date to yyyy-mm-dd format
        var day = d.toLocaleString("en-CA", { day: "2-digit" });
        var month = d.toLocaleString("en-CA", { month: "2-digit" });
        var year = d.toLocaleString("en-CA", { year: "numeric" });
    
        
        let d2=year + "-" + month + "-" + day;  
        dates.push(d2);
        
        

        // fetching using the url and date and api key given by NASA

        let your_api_key="RZDxbRDL6mxDtqHifAoTw23kxvkaTJYxDRk5ybrE";
        fetch(`https://api.nasa.gov/planetary/apod?date=${d2}&api_key=${your_api_key}`)
        .then((response)=>response.json())
        .then((data)=>{
            curr_date.innerText="Picture on " + data.date;
            
            img.src=data.url;
            img.style.maxHeight="300px";
            img.style.maxWidth="600px";
            image_section.appendChild(img);

            
            title_section.innerHTML=data.title;
            
            para.innerText=data.explanation;

        })
        .catch((error)=>{console.log(error);})
    }
    else
    {
        console.log("check the date");
    }
    
 
}


// //3.saveSearch():save the dates to local storage
function saveSearch()
{
   
    localStorage.setItem("Search_dates" ,dates);
    
}


// //4.addSearchToHistory() : add the date to ul in ui and when user clicks on that the image of that date should be shown

//
let count=0;


function addSearchToHistory()
{
    // console.log("hi");
    for(let i=count;i<dates.length;i++)
    {
        let li=document.createElement("li");
        li.innerText=dates[i];
        li.addEventListener("click",()=>{

            getImageOfTheDay(dates[i]);
        })
        // li.location.href=getImageOfTheDay(dates[i]);

        prev_searches.appendChild(li);
    }
    count++;

   

}






