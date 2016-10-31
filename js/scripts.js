"use strict";

var holidayFormDataOne = {
		generalInfo: {
			holidayTitle: 0
		},
		holidayCosts: {
			travelCost: 0,
			accomodationCost: 0,
			foodCost: 0,
			otherCost:0
		}
};


var appController ={
	initApp: function(){
		this.clickEvents();
		currencyOptionsXhrRequest.makeRequest('js/countries.json');
		
	},
	clickEvents: function(){
		var self = this;
			document.getElementById('holidayInfoForm')
			.addEventListener('click', function(el){
				if (el.target.classList.contains('addToFormButton')){
					self.updateHolidayForm(el);
				}
				if (el.target.classList.contains('changeFormButton')) {
					self.updateCSS(el);
				}
				if(el.target.classList.contains('addComparisonCurrency')){
					var baseCurrency = document.getElementById("baseCurrencyList").value;
					self.updateCurrencyExData(baseCurrency);
				} 

			});	 
	},
	updateHolidayForm: function(el){
		var findChildren = el.target.parentElement.children;
		var parentElementId = el.target.parentElement.id;
		var inputBox;
		var resultsText;


		for (var i = 0; i < findChildren.length; i++) {
			if(findChildren[i].classList.contains('inputBox')){
				inputBox = findChildren[i];
			} 
			if (findChildren[i].classList.contains('resultsText')) {
				resultsText = findChildren[i];
			} 	
		}
		
		var inputBoxValue = inputBox.value;
		var trimmedInputBoxValue = inputBoxValue.trim()

		if(el.target.parentElement.className === "cost"){
			if (isNaN(inputBoxValue)){
	        	document.getElementById('nanWarning').innerHTML = "*You must enter a number";
	        	return;
	    	} else {
				trimmedInputBoxValue = parseFloat(trimmedInputBoxValue, 10);
				resultsText.innerHTML = "&#xa3; "  + trimmedInputBoxValue;
				document.getElementById('nanWarning').innerHTML = "";

			}
		} else{
			resultsText.innerHTML = trimmedInputBoxValue;
		}
		
		
		this.updateFormDataObj(parentElementId, trimmedInputBoxValue);
		this.updateCSS(el); //passed in HTMLCollection to update CSS classes
		
		},
	updateCSS: function(el){
		var findChildren = el.target.parentElement.children;
		function addItemCSS(){
			for (var i = 0; i < findChildren.length; i++) {
				if(findChildren[i].classList.contains('inputBox')){
					findChildren[i].className = 'inputBox' + ' ' + 'hide';
				} 
				if (findChildren[i].classList.contains('addToFormButton')){
					findChildren[i].className = 'addToFormButton' + ' ' + 'hide';
				}
				if (findChildren[i].classList.contains('changeFormButton')) {
					findChildren[i].className = 'changeFormButton'  + ' ' + 'show';
				}
			}
		}
		function changeItemCSS(){
			for (var i = 0; i < findChildren.length; i++) {
				if(findChildren[i].classList.contains('inputBox')){
					findChildren[i].className = 'inputBox' + ' ' + 'show';
				} 
				if (findChildren[i].classList.contains('addToFormButton')){
					findChildren[i].className = 'addToFormButton' + ' ' + 'show';
				}
				if (findChildren[i].classList.contains('changeFormButton')) {
					findChildren[i].className = 'changeFormButton' + ' ' + 'hide';
				}
			}
		}

		
		if (el.target.classList.contains('addToFormButton')) {
			addItemCSS();
		} else{
			changeItemCSS();
		}

	},
	updateFormDataObj: function(id, itemCostsArray){
		//if statement to handle whether form1 or form 2

		if (id === 'holidayTitle' || id === 'holidayLength'){
			holidayFormDataOne.generalInfo[id] = itemCostsArray;
		} else{
			holidayFormDataOne.holidayCosts[id] = itemCostsArray;
		}
		this.displayDataTotals();

	},
	displayDataTotals: function(){
		//Need to account for formdata2.  This function should update
		//both totals

		//find element where results will be displayed
		var costsTotalLabel = document.getElementById('totalSpend');

		//loop through values of each key in holidayCosts section
		//of the form - prep for reduce.
		var formOne = holidayFormDataOne.holidayCosts;
		var costsArrayOne = [];

		for(var key in formOne) {
    	costsArrayOne.push(formOne[key]);
		}

		//reduce to total cost and display results
		var totalCosts;

			function reduceCosts(costsArray){
				totalCosts = costsArray.reduce(function (a, b){
					return a + b;
				},0);
			}

		reduceCosts(costsArrayOne);

		costsTotalLabel.innerHTML = "&#xa3; "  + totalCosts;
	},
	updateCurrencyExData: function(baseCurrencyCode){// make this click event on form
		var currencyBaseUrl = "https://api.fixer.io/latest?base=";
		currencyBaseUrl += baseCurrencyCode;
		currencyDataXhrRequest.makeRequest(currencyBaseUrl);
	}
};
//get currency exchange data
var currencyDataXhrRequest = {
  makeRequest: function(url){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "text/json");
    xhr.onreadystatechange = this.receiveResponse;
    xhr.send();
  },
  receiveResponse: function(){ //'this' is XMLHttpRequest
    if (this.readyState == 4 && this.status == 200) {
    console.log(this.statusText)
    var requestedItems = JSON.parse(this.responseText);
    currencyDataXhrRequest.formatResponse(requestedItems);
  	}
  },
  formatResponse: function(el){
  	var comparisonCurrency = document.getElementById("comparisonCurrencyList").value;
   	var displayExRate = document.getElementById("currencyExResults");
   	var ratesObj = el.rates
   	var comparisonCurrencyResult;
   		for (var key in ratesObj) {
  			if (ratesObj.hasOwnProperty(key)) {
  				if (key === comparisonCurrency) {
  					comparisonCurrencyResult = ratesObj[key] + " " + key;
  				};
  				if (comparisonCurrency === el.base) {
  					   	displayExRate.innerHTML = "Warning: You are comparing the same currency";
;						return;
  				};
  				
  			}
  	}

   	displayExRate.innerHTML = '1 ' + el.base + ' = ' + comparisonCurrencyResult;
}
};

//Get Currency Options
var currencyOptionsXhrRequest = {
  makeRequest: function(url){
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", "text/json");
    xhr.onreadystatechange = this.receiveResponse;
    xhr.send();
  },
  receiveResponse: function(){ //'this' is XMLHttpRequest
    if (this.readyState == 4 && this.status == 200) {
    console.log(this.statusText)
    var requestedItems = JSON.parse(this.responseText);
    currencyOptionsXhrRequest.formatResponse(requestedItems)
  	}
  },
  formatResponse: function(el){
  for (var key in el) {
  if (el.hasOwnProperty(key)) {
  	var baseCurrencyList = document.getElementById("baseCurrencyList");
  	var comparisonCurrencyList = document.getElementById("comparisonCurrencyList");
  	baseCurrencyList.innerHTML += "<option value='" + el[key].currency + "'>" + el[key].country + " " + el[key].currency + "</option>";
  	comparisonCurrencyList.innerHTML += "<option value='" + el[key].currency + "'>" + el[key].country + " " + el[key].currency + "</option>";
  	}
   }
  }
};

appController.initApp();


/*
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 12
});
}
initMap();
*/

