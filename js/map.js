function Map(game,imgSrc,xTiles,yTiles,landingPoints,escapePoints) {
  this.game = game;

  this.img = new Image();
  this.img.src = imgSrc;

  this.landingPoints=landingPoints;
  this.escapePoints=escapePoints;
  
  this.x = 0;
  this.y = 0;
  this.xTiles=xTiles;
  this.yTiles=yTiles;
  this.tileWidth=this.game.canvas.width/this.xTiles;
  this.tileHeight=this.game.canvas.height/this.yTiles;
}


Map.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  
};


Map.prototype.positionFrom = function (previousBg){
  return( this.landingPoints[previousBg]);
}
