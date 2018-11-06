function Maps(game) {
  this.game = game;
  this.maps = [];

  this.mapsSrcs = [{
    src: 'img/bg/bgtest1.png',
    xTiles: 20,
    yTiles: 20,
    path: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2], [3, 3],
    [2, 4], [2, 5], [2, 6],
    [2, 7], [2, 8], [2, 9],
    [3, 6], [4, 6], [5, 6]
    ],
    portals: {
      "2,2": 0,
      "5,6" : 1
    }
  },
  {
    src: 'img/bg/test2.png',
    xTiles: 8,
    yTiles: 8,
    path: [[2, 2], [3, 2], [4, 2], [5, 2],
    [2, 3], [3, 3], [4, 3], [5, 3],
    [2, 4], [3, 4], [4, 4], [5, 4]
    ],
    portals: {
      "2,2":0
    }
  }
  ];
  this.createMaps();

}


Maps.prototype.createMaps = function () {
  this.mapsSrcs.forEach(function (bg) {
    this.maps.push(new Map(this.game, bg.src, bg.xTiles, bg.yTiles,
      bg.path, bg.portals));
  }.bind(this));
}


Maps.prototype.getMap = function (index) {
  return this.maps[index];
}
