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

/*$( document ).ajaxComplete(function() {
  console.log('done')
});
*/
/*function done(){

		document.getElementById('gsc-i-id1').value = "sisekelo";

}*/

var namesGoogle = '.gsc-results-wrapper-visible';

var myVar = setInterval(check, 1000);

function check(){

	if($(namesGoogle).is(":visible") == true){
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


		if(typeof(first) != undefined){

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



