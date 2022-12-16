function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;

  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 100;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // https://stackoverflow.com/a/5306929
  if (window.devicePixelRatio > 1) {
    // const canvasWidth = canvas.width;
    // const canvasHeight = canvas.height;

    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  return { canvas, context, canvasWidth, canvasHeight };
}

const { canvas, context: c, canvasWidth, canvasHeight } = init();

const simMinWidth = 20;
const cScale = Math.min(canvasWidth, canvasHeight) / simMinWidth;
const simWidth = canvasWidth / cScale;
const simHeight = canvasHeight / cScale;

function cX(pos: { x: number; y: number }) {
  return pos.x * cScale;
}

function cY(pos: { x: number; y: number }) {
  return canvasHeight - pos.y * cScale;
}

const ball = {
  radius: 0.2,
  position: { x: 0.2, y: 0.2 },
};

function draw() {
  c.clearRect(0, 0, canvasWidth, canvasHeight);

  c.fillStyle = "#FF0000";

  // console.log(
  //   canvas.width,
  //   canvas.height,
  //   canvas.style.width,
  //   canvas.style.height
  // );
  // console.log(cX(ball.position), cY(ball.position), ball.radius * cScale);

  c.beginPath();
  c.arc(
    cX(ball.position),
    cY(ball.position),
    ball.radius * cScale,
    0,
    2 * Math.PI
  );
  c.closePath();
  c.fill();
}

function simulate() {}

function update() {
  simulate();
  draw();
  requestAnimationFrame(update);
}

update();
