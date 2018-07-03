// Initialize Firebase
var config = {
    apiKey: "AIzaSyAO8tdGRjuS9tB83WC9mmzNPc-c8ChcS7M",
    authDomain: "rps-multiplayer-61888.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-61888.firebaseio.com",
    projectId: "rps-multiplayer-61888",
    storageBucket: "",
    messagingSenderId: "1032404949390"
};
firebase.initializeApp(config);

var database = firebase.database();

// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
var computerChoices = ["r", "p", "s"];

// Creating variables to hold the number of wins, losses, and ties. They start at 0.
var wins = 0;
var losses = 0;
var ties = 0;

var isPicked1 = false;
var isPicked2 = false;

$(".player1Buttons").on("click", function (event) {
    event.preventDefault();
    var player1Guess = $(this).val();
    if (!isPicked1) {

        isPicked1 = true;
        database.ref().set({
            player1: player1Guess,
            isPicked1: isPicked1
        });

        $("#one-answer").text(" inputed an answer!");


        console.log(isPicked1);
    }
    else {
        return;
    }

});

$(".player2Buttons").on("click", function (event) {
    event.preventDefault();
    var player2Guess = $(this).val();

    if (!isPicked2) {
        isPicked2 = true;
        database.ref().set({
            player2: player2Guess,
            isPicked2: isPicked2
        });

        $("#two-answer").text(" inputed an answer!");

        console.log(isPicked2);
    }


})



database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(sv);

    // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
    if ((sv.player1 === "r") || (sv.player1 === "p") || (sv.player1 === "s")) {

        if ((sv.player1 === "r") && (sv.player2 === "s")) {
            wins++;
        } else if ((sv.player1 === "r") && (sv.player2 === "p")) {
            losses++;
        } else if ((sv.player1 === "s") && (sv.player2 === "r")) {
            losses++;
        } else if ((sv.player1 === "s") && (sv.player2 === "p")) {
            wins++;
        } else if ((sv.player1 === "p") && (sv.player2 === "r")) {
            wins++;
        } else if ((sv.player1 === "p") && (sv.player2 === "s")) {
            losses++;
        } else if (sv.player1 === sv.player2) {
            ties++;
        }

        var html =
            "<p>Player 1 picked: " + sv.player1 + "</p>" +
            "<p>Player 2 picked: " + sv.player2 + "</p>" +
            "<p>wins: " + wins + "</p>" +
            "<p>losses: " + losses + "</p>" +
            "<p>ties: " + ties + "</p>";

        // Set the inner HTML contents of the #game div to our html string
        $("#game").html(html);

        database.ref("Player1").set({
            player1: sv.player1,
            isPicked1: isPicked1
        });

        database.ref("Player2").set({
            player2: sv.player2,
            isPicked2: isPicked2
        });

        // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.

    }



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


