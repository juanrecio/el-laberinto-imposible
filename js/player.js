function Player(game) {
  this.game = game;

  this.x = 0;


  this.y = 0;

  this.img = new Image();
  this.img.src = 'img/character.png';

  // número de imágenes diferentes
  this.img.xFrames = 13;
  this.img.yFrames = 4;
  this.img.xFrameIndex = 0;
  this.img.yFrameIndex = 0;

  
  this.update();
  this.setListeners();
}

var LEFT_KEY = 37;
var TOP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var SPACE = 32;

Player.prototype.update = function (){
  this.tileWidth = this.game.map.tileWidth;
  this.tileHeight = this.game.map.tileHeight;
  this.w = this.game.map.tileWidth;
  this.h = this.game.map.tileHeight * 2;
}

Player.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.img, //src
    this.img.xFrameIndex * Math.floor(this.img.width / this.img.xFrames),
    this.img.yFrameIndex * Math.floor(this.img.height / this.img.yFrames),
    Math.floor(this.img.width / this.img.xFrames),
    Math.floor(this.img.height / this.img.yFrames),
    this.x * this.tileWidth,
    (this.y - 1) * this.tileHeight,
    this.w,
    this.h
  );
  // this.animateImg();
};


Player.prototype.setPosition = function (position) {
  this.x = position[0];
  this.y = position[1];
}

Player.prototype.setListeners = function () {
  document.onkeydown = function (event) {
    event.preventDefault();
    var key = event.keyCode;
    var newXPos = this.x;
    var newYPos = this.y;
    switch (key) {
      case TOP_KEY:
        this.img.yFrameIndex = 2;
        newYPos--;
        break;
      case RIGHT_KEY:
        this.img.yFrameIndex = 1;
        newXPos++;
        break;
      case DOWN_KEY:
        this.img.yFrameIndex = 0;
        newYPos++;
        break;
      case LEFT_KEY:
        this.img.yFrameIndex = 3;
        newXPos--;
        break;
    }

    console.log(`${this.x},${this.y}->${newXPos},${newYPos}`);
    switch (this.game.map.getElementAt(newXPos, newYPos)) {
      case "portal":
        this.x = newXPos;
        this.y = newYPos;
        this.game.changeToMap(this.game.map.getDestination(newXPos,newYPos));
        break;
      case "path":
        this.x = newXPos;
        this.y = newYPos;
        console.log(`${newXPos},${newYPos}`);
    }
    this.animateImg();

  }.bind(this);
  document.onkeyup = function (event) {
    event.preventDefault();
    this.img.yFrameIndex = 0;
  }.bind(this);
}


Player.prototype.animateImg = function () {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  //if (this.game.framesCounter % 6 === 0) {
  this.img.xFrameIndex += 1;

  // Si el frame es el último, se vuelve al primero
  if (this.img.xFrameIndex > 3) this.img.xFrameIndex = 0;
  //}
};
