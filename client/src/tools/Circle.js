import Tool from './Tools';

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(event) {
    this.mouseDown = false;
  }

  mouseDownHandler(event) {
    this.mouseDown = true;
    let canvasData = this.canvas.toDataURL();
    this.ctx.beginPath();
    this.startX = event.pageX - event.target.offsetLeft;
    this.startY = event.pageY - event.target.offsetTop;
    this.saved = canvasData;
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      let currentX = event.pageX - event.target.offsetLeft;
      let currentY = event.pageY - event.target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      let r = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, r);
    }
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
