// initialize firebase
var config = {
    apiKey: "AIzaSyCJeuSqzkQgNOrvlwMdUTHk_pHiEp-vsaU",
    authDomain: "trainschedule-9b32b.firebaseapp.com",
    databaseURL: "https://trainschedule-9b32b.firebaseio.com",
    projectId: "trainschedule-9b32b",
    storageBucket: "",
    messagingSenderId: "712244662817"
  };
  firebase.initializeApp(config);


// set up firebase database variable
var database = firebase.database();

// on submit click
$("#submit").on("click", function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // pull form values & store in local variables
    let trainName = $("#trainName").val().trim();
    let trainDest = $("#trainDest").val().trim();
    let firstTrain = $("#firstTrain").val().trim();
    let trainFreq = parseInt($("#trainFrequency").val().trim());
    
    // create local variables for next train and minutes till arrival using moment
    // let timeFormat = 'h:mm a'
    // let convertedTime = moment(firstTrain, timeFormat);
    // let nextArrival = moment(convertedTime).add(trainFreq, 'm');
    // let minutesAway = ;


    // console.log(moment(convertedTime));
    // console.log(nextArrival);

    // add values to database
    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainFreq: trainFreq
    })

    // clear input form
    $("#trainName").val("");
    $("#trainDest").val("");
    $("#firstTrain").val("");
    $("#trainFrequency").val("");
});

// on database update (child added), pass in data snapshot
database.ref().on("child_added", function(childSnapshot) { 

    // pull values from data snapshat and store in local variables
    let trainNameDisplay = childSnapshot.val().trainName;
    let trainDestDisplay = childSnapshot.val().trainDest;
    let trainFreqDisplay = childSnapshot.val().trainFreq;

    let trainInfoArray = [trainNameDisplay, trainDestDisplay, trainFreqDisplay, "Next Arrival", "Minutes Away"];

    // push variable values to html

    let newRow = $("<div class='row pt-3 pb-3 pr-2 pl-2 tablerow'>")
    for (let i = 0; i < trainInfoArray.length; i++) {
        let newColumn = $("<div class='col-md'>");
        newColumn.text(trainInfoArray[i]);
        newRow.append(newColumn);
    }
    $("#traintable").append(newRow);


});
