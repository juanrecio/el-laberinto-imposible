function Map(game,imgSrc,xTiles,yTiles,path,landingPoints,escapePoints) {
  this.game = game;

  this.img = new Image();
  this.img.src = imgSrc;

  this.landingPoints=landingPoints;
  this.escapePoints=escapePoints;
  this.matrix=[];
  this.x = 0;
  this.y = 0;
  this.xTiles=xTiles;
  this.yTiles=yTiles;
  this.tileWidth=this.game.canvas.width/this.xTiles;
  this.tileHeight=this.game.canvas.height/this.yTiles;
  this.create(path,landingPoints,escapePoints);
}


Map.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  
};


Map.prototype.positionFrom = function (previousBg){
  return( this.landingPoints[previousBg]);
}

Map.prototype.create = function (pathPos,landingPos,escapePos){
  for (var i=0;i<this.xTiles;i++){
    this.matrix[i]=[];
    for (var j=0;j<this.yTiles;j++){
      this.matrix[i][j]=null;
    }
  }


  pathPos.forEach(function(p){
    this.matrix[p[0]][p[1]]="path";
  }.bind(this));
  
  // landingPos.forEach(function(lp){
  //   this.matrix[lp[0]][lp[1]]="lp";
  // }.bind(this));

  // escapePos.forEach(function(ep){
  //   this.matrix[ep[0]][ep[1]]="ep";
  // }.bind(this));
}


Map.prototype.getElementAt = function (x,y){
  return this.matrix[x][y];
}