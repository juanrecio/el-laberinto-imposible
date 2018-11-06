function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;


  this.reset();
}

Game.prototype.start = function () {
  this.interval = setInterval(function () {
    this.clear();

    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    this.drawAll();
  }.bind(this), 1000 / this.fps);
};


Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.reset = function () {
  this.maps = new Maps(this);
  this.currentMapInd=0;
  this.map = this.maps.getMap(0);
  this.player = new Player(this);
  this.player.setPosition(this.map.positionFrom(0));
  this.framesCounter = 0;
};


Game.prototype.drawAll = function () {
  this.map.draw();
  this.player.draw();
};


Game.prototype.changeToMap = function (mapIndex) {
  this.map = this.maps.getMap(mapIndex);
  this.player.update();
  this.player.setPosition(this.map.positionFrom(this.currentMapInd));
  this.currentMapInd=mapIndex;
};
