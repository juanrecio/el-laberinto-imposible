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
    this.moveAll();
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
  this.player.setPosition([2,2]);
  this.eventsManager=new EventsManager(this);
  this.framesCounter = 0;
};


Game.prototype.drawAll = function () {
  this.map.draw();
  this.player.draw();
};

Game.prototype.moveAll = function(){
  this.map.move();
  this.player.move();
}

Game.prototype.changeToMap = function (mapIndex) {
  this.map = this.maps.getMap(mapIndex);
  this.player.updateSize();
  this.player.setPosition(this.map.positionFrom(this.currentMapInd));
  this.currentMapInd=mapIndex;
  
};

Game.prototype.openHouse= function(){
  if (this.player.hasKey){
    alert("has ganado");
    this.reset();
  }
  else{
    this.player.y++;
    alert("Necesitas la llave!");
  }
}
