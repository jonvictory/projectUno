# projectUno
Project One for the U of U Bootcamp

This application was designed to address the needs of groups of people that are trying to decide on a single place to eat.

The layout starts in the top left corner, where a user enters a location (presumably at the city level), and a corresponding genre of food. 
In the next div to the right, local resturants will populate from the YELP API. 
As users select the check boxes located next to their prefered eating establishments, pin points will populate on the google map located in the next div to the right. 
Users can click on map pinpoints to see which restaurants correspond with which pins.
All map functions are generated using the Google maps API.
After three restaurants have been selected, a button to generate a voting poll will unlock. It is located in the left corner of the next row.
Clicking this button triggers a voting function, which will populate in the next div to the right of the voting button.
This div is populated by three cards, which contain more specific information about the restaurants that were selected, prior to the polling process. 
After 3 minutes, voting is closed and the winning restaurant is highlighted.
This app also uses firebase to store yelp, map, timer, and polling data, so that all users logged on to the site will have roughly the same experience.

