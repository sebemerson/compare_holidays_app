"use strict";
//Holiday form object
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
		//Load countries for exchange rate dropdown
		currencyOptionsXhrRequest.makeRequest('js/countries.json');
	},
	clickEvents: function(){//Event delegation: listeners on holiday form div
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
		var findChildren = el.target.parentElement.children;//html collection
		var parentElementId = el.target.parentElement.id;
		var inputBox;//get element with value
		var resultsText; //get element for displaying results

		//loop through html collection to find nearest inputBox & resultsText
		//of element clicked to prepare for updating values.
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
		//IF statements to control numbers or strings to be displayed  
		if(el.target.parentElement.className === "cost"){
			if (isNaN(inputBoxValue)){//Check if number, otherwise print warning
	        	document.getElementById('nanWarning').innerHTML = "*You must enter a number";
	        	return;
	    	} else {
				trimmedInputBoxValue = parseFloat(trimmedInputBoxValue, 10);
				resultsText.innerHTML = "&#xa3; "  + trimmedInputBoxValue;
				document.getElementById('nanWarning').innerHTML = "";//remove warning if reset

			}
		} else{
			resultsText.innerHTML = trimmedInputBoxValue;
		}
		
		
		this.updateFormDataObj(parentElementId, trimmedInputBoxValue);//send to updateFormDataObj function
		this.updateCSS(el); //passed in HTMLCollection to update CSS classes
		
		},
	updateCSS: function(el){//show and hide elements when add or change buttons are clicked
		var findChildren = el.target.parentElement.children;
		function addItemCSS(){ //If items are added then the following css
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
		function changeItemCSS(){//If items are changed then the following css
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

		//if statement to control whether adding or changing
		if (el.target.classList.contains('addToFormButton')) {
			addItemCSS();
		} else{
			changeItemCSS();
		}

	},
	updateFormDataObj: function(id, itemCostsArray){takes parent element id and array
		if (id === 'holidayTitle'){
			holidayFormDataOne.generalInfo[id] = itemCostsArray;
		} else{
			holidayFormDataOne.holidayCosts[id] = itemCostsArray;
		}
		this.displayDataTotals();//Display changes to user once object has been updated

	},
	displayDataTotals: function(){

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
	updateCurrencyExData: function(baseCurrencyCode){//Dynamic url function to determine the base currency data in api call
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
							return;
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

appController.initApp(); //Initialise app on start

