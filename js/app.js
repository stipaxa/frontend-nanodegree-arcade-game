/**
 * Enemies our player must avoid.
 */ 
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -Resources.get(this.sprite).width;
    this.y = getRandomY(); // y coordinate
    this.speed = getRandomSpeed(); // speed
};

/**
 * @return Random row coodrinate. 
 */
function getRandomY() {
    const arrY = [60, 145, 230];
    let i = Math.floor(Math.random() * 3);
    return arrY[i];
}

/** 
 * @return Random enemie's speed in pixels/s.
 */
function getRandomSpeed() {
    return Math.floor((Math.random() * 150) + 50);
}

/**
 * Update the enemy's position, required method for game.
 * 
 * @param dt [in] time in seconds elapsed since last frame.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > canvasWidth) {
        this.x = -Resources.get(this.sprite).width;
        this.y = getRandomY(); 
        this.speed = getRandomSpeed();
    }
};

/**
 * Draw the enemy on the screen, required method for game.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Calculate enemies collision rect.
 * Crops the actual enemy size from the image.
 * 
 * @return Collision rect as dictionary.
 */
Enemy.prototype.getCollisionRect = function() {
    let image = Resources.get(this.sprite);
    return {
        x: this.x,
        y: this.y + 73,
        width: image.width,
        height: image.height - 100
    }
};

/**
 * Our player who avoids the enemies and tries to reach 
 * the wather line.
 */
let Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = canvasHeight - 313;
    this.dx = 0;
    this.dy = 0;
}

/**
 * Converts user input to the players movement.
 * 
 * @param {String} keyCode one of left/up/right/down depending on 
 * the user input. 
 */
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        this.dx = -100;
    } else if (keyCode === 'up') {
        this.dy = -83;
    } else if (keyCode === 'right') {
        this.dx = 100;
    } else if (keyCode === 'down') {
        this.dy = 83;
    }
}

/**
 * Updates players position.
 * Called every frame before render. 
 */
Player.prototype.update = function() {
    if (this.y < -5 && this.dy < 0) {
        this.dy = 0;
    } 
    if (this.y > 332 && this.dy > 0) {
        this.dy = 0;
    } 
    if (this.x <= 0 && this.dx < 0) {
        this.dx = 0;
    } 
    if (this.x > 303 && this.dx > 0) {
        this.dx = 0;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.dx = 0;
    this.dy = 0;
}

/**
 * Draws player.
 * Called every frame.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Calculate players collision rect.
 * Crops the actual players size from the image.
 * 
 * @return Collision rect as dictionary.
 */
Player.prototype.getCollisionRect = function() {
    let image = Resources.get(this.sprite);
    return {
        x: this.x,
        y: this.y + 91,
        width: image.width,
        height: image.height - 93
    }
};

/** 
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
 document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
