"use strict";


var appController ={
	initApp: function(){
		this.clickEvents();
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
		var inputValue = document.getElementById('holidayTitleInput').value;
			document.getElementById('holidayTitle').innerHTML = inputValue;
			

		},
	clearInput: function(el){
		
		
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



