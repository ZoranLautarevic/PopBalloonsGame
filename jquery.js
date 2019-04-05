//click on start/reset button
//are we playing?
//yes
//reload page
//no
//show trials left
//change button text to "reset game"
//1.create a random fruit
//define a random step
//2.move fruit down one step every 30ms
//is fruit to low?
//no -> repeat nb2
//yes -> any trials left?
//yes: repeat nb1
//no: show game over and button text change to start game
//slice a fruit
//play sound
//explode fruit

var playing = false;
var score;
var trialsLeft;
var step;
var action; // used for setInterval function
var balloons = [ "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10" ];

$(function() {
	//click on start/reset button
	$("#startReset").click(function() {
		//we are playing
		if (playing == true) {
			//reload page
			location.reload();
		} else {
			//we are not playing
			playing = true; //game initiated

			//set score to zero
			score = 0;
			$("#scoreValue").html(score);

			//show trials left
			$("#trialsLeft").show();
			trialsLeft = 3;
			addHearts();

			//hide game over box
			$("#gameOver").hide();

			//change button text to "reset game"
			$("#startReset").html("Reset game");

			//start sending fruits
			startAction();
		}
	});

	//slice a fruit
    $("#balloon1").mouseover(function() {
        score++;
        $("#scoreValue").html(score); //update score

        // document.getElementById("sliceSound").play();
        $("#popSound") [0].play();  //play sound
        
        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#balloon1").hide("explode", 500); //slice a fruit

        //send new fruit
        setTimeout(startAction, 500);
    });
   
	//functions

	//fill trialLeft box with hearts
	function addHearts() {
		$("#trialsLeft").empty();
		for (i = 0; i < trialsLeft; i++) {
			$("#trialsLeft").append('<img src="Images/Srce.png" class="life">');
		}
	}

	// start sending fruits
	function startAction() {
		//generate a fruit
		$("#balloon1").show();
		chooseBalloon(); //choose a random fruit
		$("#balloon1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position

		//generate a random step
		step = 1 + Math.round(5 * Math.random()); // changing step

		//move fruit down one step every 10ms
		action = setInterval(function() {
			//move fruit by one step
			$("#balloon1").css("top", $("#balloon1").position().top + step);

			//check if the fruit is to low
			if ($("#balloon1").position().top > $("#balloonsContainer").height()) {
				//check if we have trials left
				if (trialsLeft > 1) {
					//generate a fruit
					$("#balloon1").show();
					chooseBalloon(); //choose random fruit
					$("#balloon1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position

					//generate a random step
					step = 1 + Math.round(5 * Math.random()); // change step

					//reduce trials by one
					trialsLeft--;

					//populate trialsLeft box
					addHearts();
				} else {
					///game over
					playing = false; //we are not playing anymore
					$("#startReset").html("Start game"); //change button to Start Game
					$("#gameOver").show();
					$("#gameOver").html("<p>Game Over!</p><p>You score is " + score + "</p>");
					$("#trialsLeft").hide();
					stopAction();
				}
			}
		}, 10);
	}

	// generate a random fruit
	function chooseBalloon() {
		$("#balloon1").attr("src", "Images/" + balloons[Math.round(9 * Math.random())] + ".png");
	}

	//stop dropping fruits
	function stopAction() {
		clearInterval(action);
		$("#balloon1").hide();
	}
});
