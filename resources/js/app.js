// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let obj={}
	
// GET USERS COUNTRY CODE
// GET USERS COUNTRY CODE

let user_country = "";
getCountry();
function getCountry() {
	fetch(`https://api.ipdata.co/?api-key=test`, {
		"method": "GET",
	})
	.then( response => {
		return response.json();
	})
	.then( data => {
		user_country = data.country_name;
	})
	.then( () => {
		fetchData(user_country);	
	})
	.catch( error => {
		alert(error);
	})
}

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

function fetchData(user_country){
	country_name_element.innerHTML = "Loading...";
	
	fetch(`https://coronavirus-19-api.herokuapp.com/countries/${user_country}`, {
		"method": "GET",
	})
	.then( response => {
		return response.json();
	})
	.then( data => {
		obj=data;
		console.log(data);
		
	})
	.then( () => {
		updateUI();
	})
	.catch( error => {
		alert(error);
	})
}

fetchData(user_country);

// UPDATE UI FUNCTION
function updateUI(){
	updateStats();
	axesLinearChart();
}

function updateStats(){

	country_name_element.innerHTML = obj.country;

	total_cases_element.innerHTML = obj.cases|| 0;
	new_cases_element.innerHTML = `+${obj.todayCases|| 0 }`;

	recovered_element.innerHTML = obj.recovered || 0;
	new_recovered_element.innerHTML = `+${parseInt(obj.todayRecovered|| 0)}`;

	deaths_element.innerHTML = obj.deaths;
	new_deaths_element.innerHTML = `+${obj.todayDeaths || 0}`;
}

// UPDATE CHART

let my_chart;
function axesLinearChart(){
	
	if(my_chart){
		my_chart.destroy();
	}
	my_chart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'pie',
	
		// The data for our dataset
		data: {
			datasets: [{
				backgroundColor: ['#e8d71e','#009688','#f44336' ],
				borderWidth: 0,
				data: [obj.active, obj.recovered,obj.deaths]
			}],
			labels: ['Active','Recovered','Deaths']
		},
	
		// Configuration options go here
		options: {
			responsive: true
		}
	});
};






