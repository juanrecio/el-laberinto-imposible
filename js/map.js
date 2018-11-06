function Map(game,imgSrc,xTiles,yTiles,path,portalsPos) {
  this.game = game;

  this.img = new Image();
  this.img.src = imgSrc;

  this.portals=portalsPos;
  this.matrix=[];
  this.x = 0;
  this.y = 0;
  this.xTiles=xTiles;
  this.yTiles=yTiles;
  this.tileWidth=this.game.canvas.width/this.xTiles;
  this.tileHeight=this.game.canvas.height/this.yTiles;
  this.create(path,portalsPos);
}


Map.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  
};


Map.prototype.positionFrom = function (previousBg){
  var position=null;
  Object.keys(this.portals).forEach(function(portal){
    if (this.portals[portal] === previousBg){
      position=portal.split(',');
    }
  }.bind(this));
  return(position);
}

Map.prototype.create = function (pathPos){
  
  for (var i=0;i<this.xTiles;i++){
    this.matrix[i]=[];
    for (var j=0;j<this.yTiles;j++){
      this.matrix[i][j]=null;
    }
  }

  
  pathPos.forEach(function(p){
    this.matrix[p[0]][p[1]]="path";
  }.bind(this));

  Object.keys(this.portals).forEach(function(portal){
    var portalPosArray=portal.split(',');
    this.matrix[portalPosArray[0]][portalPosArray[1]]="portal";
  }.bind(this));

}


Map.prototype.getElementAt = function (x,y){
  return this.matrix[x][y];
}

Map.prototype.getDestination = function(portalX,portalY){
  return this.portals[`${portalX},${portalY}`];
}