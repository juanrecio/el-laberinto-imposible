function Map(game, imgSrc, xTiles, yTiles, path, portalsPos, obstacles, items) {
  this.game = game;

  this.img = new Image();
  this.img.src = imgSrc;

  this.portalImg = new Image();
  this.portalImg.src = "img/mapItems/portal_strip4.png"
  this.portalPos = portalsPos;


  this.matrix = [];
  this.x = 0;
  this.y = 0;
  this.xTiles = xTiles;
  this.yTiles = yTiles;
  this.tileWidth = this.game.canvas.width / this.xTiles;
  this.tileHeight = this.game.canvas.height / this.yTiles;


  this.obstacles = [];
  this.createObstacles(obstacles);
  this.obstaclesSpeed=9;
  this.obstaclesSpeedCounter=0;

  this.create(path, portalsPos);
  this.items = {};
  this.addItems(items);
}


Map.prototype.draw = function () {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  this.drawPortals();
  this.drawItems();
  this.updateObstacles();
};


Map.prototype.positionFrom = function (previousBg) {
  var position = null;
  Object.keys(this.portalPos).forEach(function (portal) {
    if (this.portalPos[portal] === previousBg) {
      position = portal.split(',');
    }
  }.bind(this));
  return (position);
}

Map.prototype.create = function (pathPos) {

  for (var i = 0; i < this.xTiles; i++) {
    this.matrix[i] = [];
    for (var j = 0; j < this.yTiles; j++) {
      this.matrix[i][j] = null;
    }
  }


  pathPos.forEach(function (p) {
    this.matrix[p[0]][p[1]] = "path";
  }.bind(this));

  Object.keys(this.portalPos).forEach(function (portal) {
    var portalPosArray = portal.split(',');
    this.matrix[portalPosArray[0]][portalPosArray[1]] = "portal";
  }.bind(this));

}

//todo: consider adding an Item class
Map.prototype.addItems = function (itemsObject = {}) {
  Object.keys(itemsObject).forEach(function (itemName) {
    var item = itemsObject[itemName];
    if (!item.taken) {
      this.matrix[item.posX][item.posY] = itemName;
      newItem = {};
      var img = new Image();
      img.src = item.src;
      newItem['img'] = img;
      newItem['posX'] = item.posX;
      newItem['posY'] = item.posY;
      this.items[itemName] = newItem;
    }
  }.bind(this));
}


Map.prototype.getElementAt = function (x, y) {
  return this.matrix[x][y];
}

Map.prototype.setElementAt = function (element, x, y) {
  this.matrix[x][y] = element;
}

Map.prototype.getDestination = function (portalX, portalY) {
  return this.portalPos[`${portalX},${portalY}`];
}
//todo: consider adding a Portal class to manage this kind of things
Map.prototype.drawPortals = function () {
  var frameIndex;
  var frames = 4;
  var portalPositions;
  var portalKeys = Object.keys(this.portalPos);
  portalKeys.forEach(function (portal) {
    frameIndex = Math.floor(Math.random() * frames);
    portalPositions = portal.split(',');
    this.game.ctx.drawImage(
      this.portalImg,
      frameIndex * Math.floor(this.portalImg.width / frames),
      0,
      Math.floor(this.portalImg.width / frames),
      this.portalImg.height,
      portalPositions[0] * this.tileWidth,
      portalPositions[1] * this.tileHeight,
      this.tileWidth,
      this.tileHeight
    );
  }.bind(this))
}

Map.prototype.createObstacles = function (obstacles) {
  obstacles.forEach(function (obstacle) {
    this.obstacles.push(new Obstacle(this.game, obstacle,this.tileWidth,this.tileHeight));
  }.bind(this))
};

Map.prototype.updateObstacles = function () {
  this.obstacles.forEach(function (obstacle) {

  if (this.obstaclesSpeedCounter++ % this.obstaclesSpeed===0){
    obstacle.move();}
    obstacle.draw();
  }.bind(this)
  )

}

Map.prototype.drawItems = function () {
  Object.keys(this.items).forEach(function (itemName) {
    var item = this.items[itemName];
    this.game.ctx.drawImage(item.img, item.posX * this.tileWidth, item.posY * this.tileHeight, this.tileWidth, this.tileHeight);
  }.bind(this));
}
