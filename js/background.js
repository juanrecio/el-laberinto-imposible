function Background(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.backgroundImg=new Image();
  this.fps=60;
  this.backgroundImg.src="img/water.png";
  this.seaFoamImg=new Image();
  this.seaFoamImg.src="img/seafoam.png";
  this.seaFoamXFrames=11;
  this.seaFoamYFrames=2;
  this.tileWidth=16;
  this.tileHeight=0.5;
  this.xTiles=Math.ceil(this.canvas.width/this.tileWidth);
  this.yTiles=Math.ceil(this.canvas.height/this.tileWidth);

}


Background.prototype.start=function(){
  
  this.draw();
  this.drawFoamSquares();
  
  this.interval = setInterval(function () {

    this.framesCounter++;

    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

  }.bind(this), 1000/this.fps);
}


// Background.prototype.drawFirst()= function{

// }

Background.prototype.draw=function(){
  this.ctx.drawImage(this.backgroundImg,0,0,this.canvas.clientWidth,this.canvas.height);
}

Background.prototype.drawFoamSquares= function(){
  for (var i=0;i<100;i++){
    for (var j=0;j<100;j++){
      console.log(`i:${i},j:${j}`)
      this.ctx.drawImage(this.seaFoamImg,
        0,
        0,
        this.seaFoamImg.width/this.seaFoamXFrames,
        this.seaFoamImg.height/this.seaFoamYFrames,
        j*this.tileWidth,
        i*this.tileHeight,
        this.tileWidth,
        this.tileWidth);
    }
  }
  
}