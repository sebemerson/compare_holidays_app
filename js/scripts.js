"use strict";

var holidayFormData1 = {};

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
				if(el.target.tagName === 'BUTTON'){
					self.updateHolidayForm(el);
				} 
				
			});
	},
	updateHolidayForm: function(el){
		var findChildren = el.target.parentElement.children;
		var inputBox;
		var resultsText;

		for (var i = 0; i < findChildren.length; i++) {
			if(findChildren[i].className === 'inputBox'){
				inputBox = findChildren[i];
			} 
			if (findChildren[i].className === 'resultsText') {
				resultsText = findChildren[i];
			} 	
		}
		if(!inputBox){
			return;
		}
		var inputBoxValue = inputBox.value;
		var trimmedInputBoxValue = inputBoxValue.trim()

		if(el.target.parentElement.className === "cost"){
			var costAsNumber = parseInt(trimmedInputBoxValue, 10);
			resultsText.innerHTML = "&#xa3; "  + costAsNumber;
		} else{
			resultsText.innerHTML = trimmedInputBoxValue;
		}
		
		
		//Update CSS with new class names to hide input
		this.updateCss(inputBox);
		// this.updateData(trimmedInputBoxValue);
		},
	updateCss: function(el){
		el.className = "hideInput";
	},
	updateData: function(el){
		holidayData.push(el)
		console.log(holidayData);
	}

};
appController.initApp();



function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 12
});
}
initMap();



