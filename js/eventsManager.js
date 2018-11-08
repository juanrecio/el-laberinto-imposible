function EventsManager(game) {
  this.game = game;
  this.keyboardKeys = { };
  this.setNormalKeyBoardKeys();
  this.setListeners();
}




EventsManager.prototype.setNormalKeyBoardKeys = function () {
  this.keyboardKeys.left = 37;
  this.keyboardKeys.top = 38;
  this.keyboardKeys.right = 39;
  this.keyboardKeys.down = 40;
}

EventsManager.prototype.setNormalPlayerListeners = function (player) {
  document.onkeydown = function (event) {
    event.preventDefault();
    var key = event.keyCode;
    var action;
    switch (key) {
      case this.keyboardKeys.top:
        action = 'top';
        break;
      case this.keyboardKeys.right:
        action = 'right';
        break;
      case this.keyboardKeys.left:
        action = 'left';
        break;
      case this.keyboardKeys.down:
        action = 'down';
        break;
    }
    action !== undefined? player.do(action):0;

  }.bind(this);
  document.onkeyup = function (event) {
    event.preventDefault();
    player.do('stop');
  }.bind(this);
}

EventsManager.prototype.setListeners=function(){
  this.game.player.setListeners=this.setNormalPlayerListeners(this.game.player);
}