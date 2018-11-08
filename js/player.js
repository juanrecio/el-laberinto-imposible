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

  this.hasKey = false;

  this.actions = {
    top: {
      yFrameInd: 2,
      yIncrement: -1
    },
    right: {
      yFrameInd: 1,
      xIncrement: 1
    },
    down: {
      yFrameInd: 0,
      yIncrement: 1
    },
    left: {
      yFrameInd: 3,
      xIncrement: -1
    },
    stop: {
      yFrameInd: 0
    }
  }

  this.updateSize();
}


Player.prototype.updateSize = function () {
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

  //todo: sacar esto de draw:0
  if (this.game.map.getElementAt(this.x, this.y) === 'obstacle') {
    this.game.reset();
  }

  // this.animateImg();
};


Player.prototype.setPosition = function (position) {
  this.x = position[0];
  this.y = position[1];
  if(typeof this.x == "string")
    debugger;
}

Player.prototype.do = function (action) {
  var newX = this.x;
  var newY = this.y;
  var currentAction = this.actions[action];
  currentAction.hasOwnProperty('yFrameInd') ? this.img.yFrameIndex = currentAction.yFrameInd : 0;
  currentAction.hasOwnProperty('yIncrement') ? newY += currentAction.yIncrement : 0;
  currentAction.hasOwnProperty('xIncrement') ? newX += currentAction.xIncrement : 0;
  (action!=='stop'?this.update(newX, newY):0);
}

Player.prototype.animateImg = function () {
  // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
  //if (this.game.framesCounter % 6 === 0) {
  this.img.xFrameIndex += 1;

  // Si el frame es el último, se vuelve al primero
  if (this.img.xFrameIndex > 3) this.img.xFrameIndex = 0;
  //}
};


Player.prototype.getItem = function (item) {
  switch (item) {
    case 'key':
      this.hasKey = true;
      break;
    case 'house':
      this.game.openHouse(this.hasKey);
      break;
  }
};


Player.prototype.update = function (posX, posY) {
  switch (this.game.map.getElementAt(posX, posY)) {
    case "portal":
      // this.setPosition([posX, posY]);
      this.game.changeToMap(this.game.map.getDestination(posX, posY));
      break;
    case "path":
      //default:
      this.setPosition([posX, posY]);
      break;
    case "obstacle":
      this.game.reset();
      break;
    case null:
      break;
    default:
      itemName = this.game.map.getElementAt(posX, posY)
      this.setPosition([posX, posY]);
      delete this.game.map.items[itemName];
      this.getItem(this.game.map.getElementAt(posX, posY));
  }
  this.animateImg();
};


