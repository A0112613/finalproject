
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        var bgRect = paper.rect(0,0,pWidth,pHeight);

        var gametime = NaN;
        var timerBar = paper.rect(0,400,600,30); //create a timer bar at bottom of game
        var timertext = paper.text(10,370,""); //show the remaining time on top of the timer bar, so the player knows how much time left for the game.
        var score = paper.text(68,20,counter); //show player their score, which based on their click on target.

        mySVGCanvas.onmouseover = function () {
    	this.style.cursor="crosshair";
		};  //when the cursor move into the game space, the cursor will turn into crosshair style.

        timerBar.attr({ 
            'fill': '#4d0000',
            'stroke': 'none',
        });

        timertext.attr({ 
            'text-anchor':'start',
            'font-size': 50,
            'fill': '#800000',
            'opacity': 0.5
        }); 

        score.attr({ 
            'text-anchor':'endGame',
            'font-size': 30,
            'fill': '#2db300',
            'opacity': 'none',       
        });      

        var timer = function() { //if the game is in play, time will reduce for every second and it will be shown on the timertext & timer bar.            if (gametime>0) {
                if (gametime>0) {
                timertext.show();
                gametime -= 1;
                timertext.attr({
                    text: gametime + "s"
                });
                timerBar.animate({
                    'width':23*gametime
                },1000);
            } else {
                gametime = NaN; 
                timertext.hide(); //hide timer text if game is not in play
            };
            
        };

        setInterval(timer,1000);
         


        //Instruction box
        var insBox = paper.rect(125,125,350,150);
        insBox.attr({
            stroke: "none",
            fill:"#33334c",
            opacity: 0.3
        });

        //Instruction text
        var insText = paper.text(300,180,"Welcome!!!\nBegin your training by clicking \non the start button.\nAll the best :)");       
        insText.attr({
        'font-size': 20,
        stroke: "black",
        });

      	
        var counter = 0; //to keep track of number of clicks. By default is 0.
        
        var choice = false; //this is to keep track whether the player has selected the difficulty level and ready to play. 

        
        var startButton = paper.rect(125,250,350,30);
            startButton.attr({
                stroke: "none",
                fill: "#1f1f2e"
            });  // creating start button
        
        var startText = paper.text(300, 265, 'START');
        	startText.attr({
        		'font-size': 15,
        		fill: "white"
        	});   // creating start text


        var ready = function(){
            startButton.show();
            startText.show();
            insBox.show();
            insText.show();
            
            var bgsound = new Audio("resources/ambient.wav");
            bgsound.play();   //when page is loaded, all of these will appear. 

            circle.hide(); //the circle and the score will not appear because the game haven't start yet.           
            score.hide();
            

            // Introduction of the game.
            alert("Welcome to Sniper Warrior. This game provides a training platform for you to become a sniper warrior. Aim the target and be fast. Hope you are able to survive! ");
        	};

        var start = function (){
            // If-else statement and the choice variable are used to make sure the player has selected the difficulty level before start the game.
            // So the player will only able to start when the difficulty level is selected. (choice=true)

            if (choice === false) {
                alert('Please select the difficulty level to proceed to the game.');
            } else {
            console.log("game is starting");  // game will starts. (choice=true)

            // hides the start box, instruction box and text when the game is starts.
            startButton.hide();
            startText.hide();
            insText.hide();
            insBox.hide();

            //When the game is started, the score will appear.
            score.show();
            score.attr({text: "Score: " + counter});
            counter=0;

            //duration is 25 seconds.
            gametime = 25;

            //the target object will appear once the function is executed.
            circle.show();

            //Set counter to 0.
            counter = 0;
            
            //This is to stop the game after 25 seconds.
            setTimeout(endGame, 25000);
        	}
        };

        // an event listener is attached to the start button and the game will start after receiving a click event.
        startButton.node.addEventListener('click', start);

        // Creating a circle as the target object
        var circle = paper.circle(100,100,20);

       	circle.attr({
            "fill": "#b30000",
            "r": 80
        });


        circle.xpos=pWidth/2;
        circle.ypos=pHeight/2;
        circle.xrate=10;
        circle.yrate=10;



   



     

        //moveCircle function is used to make the target circle move constantly around the screen by adding the xrate and yrate to the xpos and ypos.
        var moveCircle = function(){

            circle.xpos += circle.xrate;
            circle.ypos += circle.yrate;
            circle.attr({'cx': circle.xpos, 'cy': circle.ypos})

            //To make sure the target does not move out of the game box.
            if (circle.xpos > pWidth) {circle.xrate = -circle.xrate;}
            if (circle.ypos > pHeight) {circle.yrate = -circle.yrate;}
            if (circle.xpos < 0) { circle.xrate = -circle.xrate;}
            if (circle.ypos < 0) { circle.yrate = -circle.yrate;};

            //These are the options of difficulty level.
        	var level1 = document.getElementById("1");
        	var level2 = document.getElementById("2");
        	var level3 = document.getElementById("3");
        	var level4 = document.getElementById("4");



        //Each level represents different difficulty level. 
        //The higher the difficulty level, the smaller the size of the target and the faster the speed of the target. 
        //After selected the difficulty level, the choice will becomes true, which means game is ready to start. 

        level1.addEventListener('click',function(){
           circle.attr({
                r: 80,
            });

            circle.xrate=4;
            circle.yrate=4;
            choice = true;
        });

        level2.addEventListener('click',function(){
          circle.attr({
                r: 70,
            });   
            circle.xrate=8;
            circle.yrate=8;
            choice = true;
        });

        level3.addEventListener('click',function(){
           circle.attr({               
                r: 60,
            });    
            circle.xrate=12;
            circle.yrate=12;
            choice = true;            
        });

        level4.addEventListener('click',function(){
           circle.attr({              
                r: 50,
            });   
            circle.xrate=16;
            circle.yrate=16;
            choice = true;          
        });

        }
 
        
       	setInterval(moveCircle, 50);


       


        //When the game is ended, there will be a summary box to tell the player their score.
        //The difficulty level options will be cleared, so to let the player to choose again when replay.
        //The target circle will be position out of the game box, so the player cannot see. 
        //The game will back to ready state.

        var endGame = function (){
            // alert message varies according to number of times clicked
            if (counter > 15) {
            confirm("Great job! You managed to shoot " + counter + " targets. You are now a qualified sniper warrior!");
            }
            else {
            confirm("Oh NO! You only managed to shoot " + counter + " targets. You need to train more! Let's try again!")
            }

            choice = false;

            document.getElementById("1").checked = false;
            document.getElementById("2").checked = false;
           	document.getElementById("3").checked = false;
         	document.getElementById("4").checked = false;

            // hides the target
            circle.attr({
                cx: -100,
                cy: -100
            })

                                           
            // resets the game
            ready();
        }

        
        //An event listener is attached to the target circle, so for every click, 
        //it will increase the counter by 1 and update the score accordingly. 
        //Animation is included to increase the difficulty of the game after each successful click by the player. 
        //The size of the target will keep changing as well as the moving direction and the position. 
        circle.node.addEventListener('click', function(){
            counter++;
             score.attr({text: "Score: " + counter});
             circle.animate({fill: "blue", transform: "s0.5"}, 3000, "bounce", function() {
             	this.animate({
             		fill: "#cc3399",
             		transform:"s0.3"
             	}, 1000);
                  	
             });

 			//The sound will be played when the player hits on the target.          
            var shoot = new Audio("resources/shot&reload.wav");
            shoot.play();

            console.log("the click count is now " + counter);
        });

        ready(); 


});