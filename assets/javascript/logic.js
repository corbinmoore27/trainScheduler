// Initializing firebase
var config = {
    apiKey: "AIzaSyBd5bKqe32VCxbB7p82dM1Ve5n4TJ0w1Ng",
    authDomain: "trainscheduler-a9bf0.firebaseapp.com",
    databaseURL: "https://trainscheduler-a9bf0.firebaseio.com",
    projectId: "trainscheduler-a9bf0",
    storageBucket: "",
    messagingSenderId: "160506129670"
};
firebase.initializeApp(config);

// saving firebase database into a variable
var database = firebase.database();

// on click fuction that pushes the users input to firbase and creates an object for them
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trnName = $("#train-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var trnTime = $("#first-train-input").val().trim();
    var trnFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trnName,
        destination: trnDest,
        firstTime: trnTime,
        frequency: trnFreq 
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    // Storing variables.
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().destination;
    var trnTime = childSnapshot.val().firstTime;
    var trnFreq = childSnapshot.val().frequency;



    // Im commenting out the rest of this so that you can see that the table does prefill. But that my moment.js stuff wasn't cooperating.


    
    
    var startTrn = moment(trnTime, "hh:mm").subtract(1,"years");
    var crntTime = moment();
    var tmDiff = crntTime.diff(startTrn, "minutes");
    var keith = tmDiff % trnFreq;
    var minAwy  = trnFreq - keith;
    var nxtArrv = moment().add(minAwy, "minutes");
    var fmtTm = moment(nxtArrv).format("HH:mm");

    $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" + trnFreq + "</td><td>" + fmtTm + "</td><td>" + minAwy + "</td></tr>");

});
