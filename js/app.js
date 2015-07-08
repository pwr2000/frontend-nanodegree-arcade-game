// Enemies our player must avoid
var Enemy = function(x,y) { // RH: Add x and y variables to set enemy's coordinate
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // RH: Randomize the speed of enemies and multiply by dt parameter
    this.x += Math.floor((Math.random() * 1) + 0.5) * dt * 50;
    this.checkCollision();

    if (this.x > 505) {
        this.x = -100;
    }
};

// RH: Move checkCollision function from engine.js to app.js by making it as prototype function
Enemy.prototype.checkCollision = function() {
    if (this.x < player.x + 60 &&
        this.x > player.x - 60 &&
        this.y < player.y + 50 &&
        this.y > player.y - 20) {
        alert("Game Over");
        location.reload();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.boy = 'images/char-boy.png';
};

// RH: Set the crossing line for the player. Whenever the player reaches the line, player wins.
Player.prototype.update = function(dt) {
    if (this.y < -10) {
        alert("You Win!");
        location.reload();
    }

// RH: Set the boundaries for the player. Whenever the player steps out of the boundary, the game will restart.
    if (this.x < -50      ||
        this.x > 480    ||
        this.y > 460) {
        // console.log("player is out of canvas");
        alert("Player is out of bound");
        location.reload();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.boy), this.x, this.y);
};

// Set player movement based on keycode event listener
Player.prototype.handleInput = function(keyup) {
    // console.log(keyup);
    switch (keyup) {
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});