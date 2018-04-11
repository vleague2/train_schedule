# Train Schedules

This web application displays a schedule of arrivals for a list of trains, themed on popular fiction.

How to use it:
1. Refresh to view updated train arrival times
2. Add your own train to the schedule by specifying the train name, the train destination, the first (or next) train's arrival time, and the frequency of arrivals

How it works:
1. A layout shell is provided by HTML, as well as an input form
2. Upon clicking submit in the input form, the data from the form is stored in a Firebase database
3. When data is added to the database, the page pulls the info from the database and displays it to the page, which allows it to update the page with the newly added train
3a. Using the Moment library, the next train time and the minutes until the next train are calculated before being displayed to the page

Technologies used:
1. HTML/CSS
2. Bootstrap
3. Javascript
4. JQuery
5. Moment.js library
6. Firebase

Limitations:
1. The website does not update the times each minute; you must refresh
2. The site is not mobile responsive