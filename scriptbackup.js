var first;
var second;
var com;
var container ={};
container['emails'] = [];
container['names'] = [];
container['surnames'] = [];
container['companys'] = [];

var email = container['emails'];
var nameit = container['names'];
var surname = container['surnames'];
var company = container['companys'];

$( document ).ajaxComplete(function() {
  console.log('done')
});

function done(){

		document.getElementById('gsc-i-id1').value = "sisekelo";

}

var answer = '.gsc-results-wrapper-visible';

var myVar = setInterval(check, 1000)

function check(){

	if($(answer).is(":visible") == true){
		clearInterval(myVar);
		name();
	}

	console.log(false)
}

function name() {
	var a = document.getElementsByClassName("gs-title");

	for(i=0; i < a.length ; i+=4){

		var b = a[i].innerText.split(" ");

		first = b[0].toLowerCase();
		second = b[1].toLowerCase();
		com = b[b.length - 3].toLowerCase()+'.com';

		console.log(typeof(first));


		if(typeof(first) != "undefined"){

			nameit.push(first);
			surname.push(second); 
			company.push(com);

			$.ajax({
		        url: 'https://api.skrapp.io/api/v2/find?firstName='+first+'&lastName='+second+'&domain='+com,
		        beforeSend: function(xhr) {
		             xhr.setRequestHeader("X-Access-Key", "1226089225LaUPiqp8LBA4PoH2YwPPJioD36LzFVha");
		             xhr.setRequestHeader("Content-Type", "application/json");

		        }, success: function(data){

		        	email.push(data.email);
		        	console.log(container)
				    
		        }

		});

		}
	}
}
/*
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(xhttp.responseText);
            console.log(response);

        }
      };
      xhttp.open("GET", "https://api.linkedin.com/v2/me", true);
      xhttp.send()
*/
/*$.ajax({
        url: 'https://api.skrapp.io/api/v2/find?firstName=John&lastName=Doe&domain=goldmansachs.com',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("X-Access-Key", "1226089225LaUPiqp8LBA4PoH2YwPPJioD36LzFVha");
             xhr.setRequestHeader("Content-Type", "application/json");

        }, success: function(data){
           console.log(data)
            //process the JSON data etc
        }
})
*/


	/*$.ajax({
	  type: "GET",
	  url: "https://api.skrapp.io/api/v2/find?firstName=John&lastName=Doe&domain=skrapp.io",
	  data: {
	    api_key: "1226089225LaUPiqp8LBA4PoH2YwPPJioD36LzFVha"
	  },
	  success: function(data) {
	    console.log(data);
	    //do something when request is successfull
	  },
	  dataType: "application/json"
	});*/


    /*var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(xhttp.responseText);

            console.log(response)

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/MUR/indicators/SE.TER.ENRR.FE?format=json&date=2015", true);
      xhttp.send()*/


function genderList(countryCode){

    document.getElementById("overlay").style.display = "block";

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            values.push(response[1][0].value);
            values.push(100-response[1][0].value);

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'pie',
                data: {
                    labels: ["girls","boys"],
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/SE.TER.ENRR.FE?format=json&date=2015", true);
      xhttp.send()
}

function enrollment(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "http://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.F500?format=json&date=2009:2015", true);
      xhttp.send()
}

function education(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.F140?format=json&date=2009:2015", true);
      xhttp.send()
}

function humanities(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/SWZ"+countryCode+"/indicators/UIS.FOSEP.56.F200?format=json&date=2009:2015", true);
      xhttp.send()
}

function unspecified(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.FUK?format=json&date=2009:2015", true);
      xhttp.send()
}

function agriculture(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.F800?format=json&date=2009:2015", true);
      xhttp.send()
}

function engineering(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.F700?format=json&date=2009:2015", true);
      xhttp.send()
}

function social(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.F300?format=json&date=2009:2015", true);
      xhttp.send()
}

function totalEnrol(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/SE.TER.ENRL?format=json&date=2009:2015", true);
      xhttp.send()
}

function info(countryCode){

    var years = [];
    var values = [];
    var response;
    var xhttp = new XMLHttpRequest();

    document.getElementById("overlay").style.display = "block";

      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {

            response = JSON.parse(xhttp.responseText);
            title = response[1][0].indicator.value;

            for(i=6 ; i >= 0 ; i--) { 
                years.push(response[1][i].date);
                values.push(response[1][i].value);
            }

            var myChart = document.getElementById("myChart").getContext('2d');

            var finalVisual = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Population',
                        data: values,
                        backgroundColor: [
                            'rgba(126, 127, 154, 0.7)',
                            'rgba(235, 148, 134, 0.7)',
                            'rgba(179, 151, 167, 0.7)',
                            'rgba(243, 222, 138, 0.7)', 
                        ],
                        borderColor: [
                            'rgba(126, 127, 154, 1)',
                            'rgba(235, 148, 134, 1)',
                            'rgba(179, 151, 167, 1)',
                            'rgba(243, 222, 138, 1)',   
                        ],
                        borderWidth: 3,
                        hoverBackgroundColor: 'red',
               
                    }]
                },
                options: {

                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'blue'
                        }
                    },

                    title: {
                        display: true,
                        text: title,
                        fontSize: 25,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            if(Math.max(...values) == 0 && Math.min(...values) == 0){
                alert('Unfortunately, data for this indicator does not exist.');
                location.reload();
            }

            addButton();

        }
      };
      xhttp.open("GET", "https://api.worldbank.org/v2/countries/"+countryCode+"/indicators/UIS.FOSEP.56.F600?format=json&date=2009:2015", true);
      xhttp.send()
}

function off() {

    var canvas = document.getElementById("myChart")
    var myChart = canvas.getContext('2d');
    myChart.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("overlay").style.display = "none";
    location.reload();
}

function addButton(){

    var para = document.createElement("p");
    var node = document.createTextNode("Close graph");
    para.setAttribute("id", "closeGraph");
    para.setAttribute("class", "button-raised");
    para.appendChild(node);
    var element = document.getElementsByClassName("container")[0];
    element.appendChild(para);
}