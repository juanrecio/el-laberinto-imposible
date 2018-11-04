function Player(game) {
  this.game = game;

  this.x = this.game.canvas.width / 2;


  this.y = this.game.canvas.height / 2;

  this.img = new Image();
  this.img.src = 'img/character.png';

  // número de imágenes diferentes
  this.img.xFrames = 13;
  this.img.yFrames = 4;
  this.img.xFrameIndex = 0;
  this.img.yFrameIndex = 0;

  // medidas de la imagen a representar en el canvas
  this.w = 50;
  this.h = 75;

  this.setListeners();
}

var LEFT_KEY = 37;
var TOP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var SPACE = 32;

Player.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.img,
    this.img.xFrameIndex * Math.floor(this.img.width / this.img.xFrames),
    this.img.yFrameIndex * Math.floor(this.img.height / this.img.yFrames),
    Math.floor(this.img.width / this.img.xFrames),
    Math.floor(this.img.height / this.img.yFrames),
    this.x,
    this.y,
    this.w,
    this.h
  );


  // this.animateImg();

};

Player.prototype.setListeners = function () {
  document.onkeydown = function (event) {
    event.preventDefault();
    var key = event.keyCode;
    switch (key) {
      case TOP_KEY:
        this.img.yFrameIndex = 2;
        this.y -= 10;
        break;
      case RIGHT_KEY:
        this.img.yFrameIndex = 1;
        this.x += 10;
        break;
      case DOWN_KEY:
        this.img.yFrameIndex = 0;
        this.y += 10;
        break;
      case LEFT_KEY:
        this.img.yFrameIndex = 3;
        this.x -= 10;
        break;
    }
    this.animateImg();
    
  }.bind(this);
  document.onkeyup = function (event) {
    event.preventDefault();
    this.img.yFrameIndex=0;
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
