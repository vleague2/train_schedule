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

let format = 'LT';
    let result = moment("2018-04-11 13:25").format(format);
    console.log(result);

// on submit click
$("#submit").on("click", function(event) {

    // Prevent form from submitting
    event.preventDefault();

    // pull form values & store in local variables
    let trainName = $("#trainName").val().trim();
    let trainDest = $("#trainDest").val().trim();
    let firstTrain = $("#firstTrain").val().trim();
    let trainFreq = parseInt($("#trainFrequency").val().trim());
    


    // add values to database
    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainFreq: trainFreq,
        firstTrain: firstTrain
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
    let firstTrainDisplay = childSnapshot.val().firstTrain;

        // store the current time
        let currentTime = moment();

        // format the firstTrain time into military time and subtract 1 year from it so that it's before the current time
        let firstTimeConverted = moment(firstTrainDisplay, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // calculate the difference between the current time and the converted first train time, and format the difference in minutes
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder): divide the difference in minutes by the frequency of the train to grab the remainder
        let tRemainder = diffTime % trainFreqDisplay;
        console.log(tRemainder);
    
        // Minute Until Train: subtract the train frequency from the remainder to calculate how many minutes until the next train
        let tMinutesTillTrain = trainFreqDisplay - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train: take the current time and add the minutes until the train arrives, which gives you the time of the next train
        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

        let nextTrainFormatted = moment(nextTrain).format("hh:mm a");

    let trainInfoArray = [trainNameDisplay, trainDestDisplay, trainFreqDisplay, nextTrainFormatted, tMinutesTillTrain];

    // push variable values to html

    let newRow = $("<div class='row pt-3 pb-3 pr-2 pl-2 tablerow'>")
    for (let i = 0; i < trainInfoArray.length; i++) {
        let newColumn = $("<div class='col-md'>");
        newColumn.text(trainInfoArray[i]);
        newRow.append(newColumn);
    }
    $("#traintable").append(newRow);


});
