/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apikey = '&appid=d88eab394bbcc5100d9fee22275552dc&units=imperial';
let counter = -1;
// Create a new date instance dynamically with JS
document.getElementById('generate').addEventListener('click', performAction);

// get current date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// action taken when generate is clicked
function performAction(e)
{
	const zip =  document.getElementById('zip').value;
	if(zip!=null)
	{
		const userResponse = document.getElementById('feelings').value;
		getTemperature(baseURL,zip, apikey)
		.then(function(data)
		{
			postData('/add', {Temperature:data.main.temp, date: newDate, userResponse: userResponse});
		})
		.then(updateUI());
	}
}

// async get temperature from web API
const getTemperature = async (baseURL, zip, apikey)=>{
    
	const res = await fetch(baseURL+zip+apikey);
	try {
		const data = await res.json();
		return data;
	}  catch(error) {
		console.log("error", error);
	}
};



// async post data
const postData = async ( url = '', data = {})=>
{
	counter++;
	const response = await fetch(url, {
		method: 'POST', 
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try 
    {
		const newData = await response.json();
      	return newData;
    }
    catch(error) 
    {
      	console.log("error", error);
    }
};

// async updateUI
const updateUI = async ()=>{
	const request = await fetch ('/alldata');
	try{
		const projectData = await request.json();
		if(counter!=-1)
		{
			document.getElementById('date').innerHTML= projectData[counter].date;
			document.getElementById('temp').innerHTML= projectData[counter].temperature;
			document.getElementById('content').innerHTML = projectData[counter].userResponse;
		}

	}
	catch(error)
	{
		console.log("error", error);
	}
};
