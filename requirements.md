							/***WhereToGo_APP***/
/***General Summary***/
This app will essentially be a comparison app to show off a number of different skills
in pure Vanilla JS.  The app will consist of two tables side by side or above each other
on mobile views. In each form you can add several bits of information such as price of 
travel and where you want to travel to.  The app will calculate will tell you various bits of 
information, such as total costs, the weather in the location you are travelling to, where on the map you will be travelling to and ultimately what are the pros and cons.

/*Full App Requirements*/

/*Version 1 - Setup HTML Template*/
1. It should display two tables with the following information: - YES
	-Title
	-Location
	COSTS
	-Travel
	-Accommodation
	-Daily Food Budget
	-Other

	WEATHER
	-Nearest City
	-Month of Travel
	-Average Temperature

  Each one should be a label and next to it an input box - YES

2. There should be a button next to each input to enter the data (ui for mobile) - YES

3. It should display a google map below. - YES

/*Version 2 - JS Req*/

1. if user clicks button for user input elements, onClick event should trigger:
	- value of originalInput should be taken
	- value of originalInput should be given to labelText
	- originalValue should be given css class of hideOriginalInput(.display: none)
	- labelText should be given css class of showLabelText

2.

3. if user hits enter button for user input elements, onClick event should trigger: