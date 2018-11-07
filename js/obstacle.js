//todo: consider adding a type param in order to make the obstacle dynamic in terms of image
function Obstacle(game, positions, width, height) {
  this.game = game;
  this.ctx = this.game.ctx;

  this.positions = positions;
  this.currentPosition = 0;
  this.positionsRightDirection = true;
  this.img = new Image();
  this.img.src = 'img/mapItems/obstacle.png';
  this.width = width;
  this.height = height;
  this.previousPositionElement;
}


Obstacle.prototype.move = function () {
  if (this.positionsRightDirection) {
    if (this.currentPosition === this.positions.length - 1) {
      this.positionsRightDirection = false;
      this.move();
      return 0;
    }
    var currentPos = this.positions[this.currentPosition]
    this.game.map.setElementAt(this.previousPositionElement,
      currentPos[0],
      currentPos[1]);
    this.currentPosition++;
    currentPos = this.positions[this.currentPosition];
    this.previousPositionElement = this.game.map.getElementAt(currentPos[0],
      currentPos[1]);
    this.game.map.setElementAt('obstacle',
      currentPos[0],
      currentPos[1]);
  }
  else {
    if (this.currentPosition === 0) {
      this.positionsRightDirection = true;
      this.move();
      return 0;
    }
    this.currentPosition--
  }
}


Obstacle.prototype.draw = function () {
  this.ctx.drawImage(this.img,
    this.positions[this.currentPosition][0] * this.width,
    this.positions[this.currentPosition][1] * this.height,
    this.width, this.height);

}