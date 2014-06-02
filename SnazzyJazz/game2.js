// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 350;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () 
{
        bgReady = true;
};
bgImage.src = "images/background.png";

// Player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () 
{
        playerReady = true;
};
playerImage.src = "images/Hero/p1_walk01.png";
//gravity
var gravity = 0.5;
//velocity x
var vx = 0;

//velocity y
var bounce_factor = 0.7;
var vy = 0;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) { keysDown[e.keyCode] = true;}, false);

addEventListener("keyup", function (e) { delete keysDown[e.keyCode];}, false);

//jump function modifies the velocity in the y direction -vy-
var jump = function()
{
	vy = 15;
	playerImage.src = "images/Hero/p1_jump.png";
}


//update player positioning
var update_pos = function(modifier)
{
	if (65 in keysDown) // Player holding left (a)
	{
        player.x -= player.speed * modifier;
    }
    if (68 in keysDown) // Player holding right (d)
	{ 
        player.x += player.speed * modifier;
    }

    if(player.y + player.radius >= canvas.height) //if player is on the ground
	{
		if(playerImage.src != "images/Hero/p1_walk01.png") // not working, not sure why.
			playerImage.src = "images/Hero/p1_walk01.png";
		player.isOnGround = true;
		gravity = 0;
	}
	else
	{
		player.isOnGround = false;
		gravity = 0.5;
	}

	if(32 in keysDown) // player pressing space for jump
	{
		if(player.isOnGround)
		{
			jump();
		}
	}
	
	if (player.y + player.radius > canvas.height || player.y < 0)
	{ 
		
		vy += gravity;
		// Velocity x
		vx = 0;
		// Velocity y
		vy *= -bounce_factor;
	}

	vy += gravity;
	player.x += vx;
	player.y += vy;
}

// Draw everything
var render = function () 
{
        if (bgReady)
		{
            ctx.drawImage(bgImage, 0, 0);
        }

        if (playerReady) 
		{ 
            ctx.drawImage(playerImage, player.x, player.y);
        }
};

//game objects
function Player()
{
	this.isOnGround = true;
	this.speed = 256;
	this.radius = 110;
	this.x = canvas.width/2;
	this.y = canvas.height - this.radius;
}
var player = new Player();

// The main game loop
var main = function () 
{
        var now = Date.now();
        var delta = now - then;
        update_pos(delta / 1000);
        render();

        then = now;
};

var then = Date.now();
setInterval(main, 1000/120); // Execute as fast as possible