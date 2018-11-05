function Maps(game) {
  this.game = game;
  this.maps = [];

  this.mapsSrcs = [{ src: 'img/bg/bgtest1.png',
                          xTiles: 20,
                          yTiles: 20,
                          path:{

                          },
                          landingPoints:{
                            0: [0,0]
                          },
                          escapePoints:{}}];
  this.createMaps();

}


Maps.prototype.createMaps = function () {
  this.mapsSrcs.forEach(function(bg){
    this.maps.push(new Map(this.game,bg.src,bg.xTiles,bg.yTiles,
      bg.landingPoints,bg.escapePoints))
  }.bind(this));
}


Maps.prototype.getMap = function (index){
  return this.maps[index];
}
