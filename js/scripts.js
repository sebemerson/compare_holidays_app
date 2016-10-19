"use strict";

var holidayFormDataOne = {
	travelCost: 0,
	accomodationCost: 0,
	foodCost: 0,
	otherCost:0

};

var appController ={
	initApp: function(){
		this.clickEvents();
	},
	display: function(){

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
				}; 

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
			trimmedInputBoxValue = parseInt(trimmedInputBoxValue, 10);
			resultsText.innerHTML = "&#xa3; "  + trimmedInputBoxValue;
		} else{
			resultsText.innerHTML = trimmedInputBoxValue;
		}
		
		
		this.updateFormData(parentElementId, trimmedInputBoxValue);
		this.updateCSS(el); //passed in HTMLCollection to update CSS classes
		
		// this.updateData(trimmedInputBoxValue);
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
		}//To fix issue with updating change button, change all to find classlist
		//you'll need to make the classnames be equal to original + new each time so it removes old classes.
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
	updateFormData: function(id, itemCostsArray){
		//if statement to handle whether form1 or form 2 
		holidayFormDataOne[id] = itemCostsArray;
		console.log(holidayFormDataOne);
		this.displayDataTotals();
	},
	displayDataTotals: function(){
		//Need to account for formdata2.  This function should update
		//both totals

		//find element where results will be displayed
		var costsTotalLabel = document.getElementById('totalSpend');

		//loop through values of each key in form - prep for reduce.
		var formOne = holidayFormDataOne;
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


