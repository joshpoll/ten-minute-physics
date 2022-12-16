import { createBall, Ball, drawBall } from "./Ball";
import { clone, dot, iadd, ismul, isub, mag, smul, sub } from "./Vector2";

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

const gravity = { x: 0, y: -9.81 };
const timeStep = 1 / 60;

const ball = {
  radius: 0.2,
  position: { x: 0.2, y: 0.2 },
  velocity: { x: 10, y: 15 },
};

const physicsScene = {
  gravity: { x: 0, y: -9.81 },
  dt: 1 / 60,
  // TODO: should this really be a vector??
  worldSize: { x: simWidth, y: simHeight },
  paused: true,
  balls: [] as Ball[],
  restitution: 0.9,
};

function setupScene() {
  const numBalls = 20;

  physicsScene.balls = new Array(numBalls).fill(0).map((_, i) => {
    const radius = 0.5 + Math.random() * 0.3;
    const mass = Math.PI * radius * radius;
    const position = {
      x: Math.random() * (simWidth - 2 * radius) + radius,
      y: Math.random() * (simHeight - 2 * radius) + radius,
    };
    const velocity = {
      x: -1 + 2 * Math.random(),
      y: -1 + 2 * Math.random(),
    };

    return {
      radius,
      mass,
      position,
      velocity,
    };
  });
}

function draw() {
  c.clearRect(0, 0, canvasWidth, canvasHeight);

  physicsScene.balls.forEach((ball) => {
    drawBall(c, ball, {
      xScale: cX,
      yScale: cY,
      rScale: (r: number) => r * cScale,
    });
  });
}

function handleBallCollision(ball1: Ball, ball2: Ball, restitution) {
  const dir = sub(ball2.position, ball1.position);
  const d = mag(dir);
  if (d === 0 || d > ball1.radius + ball2.radius) {
    return;
  }

  ismul(1 / d, dir);

  const corr = (ball1.radius + ball2.radius - d) / 2;
  iadd(ball1.position, smul(-corr, dir));
  iadd(ball2.position, smul(corr, dir));

  const v1 = dot(ball1.velocity, dir);
  const v2 = dot(ball2.velocity, dir);

  const m1 = ball1.mass;
  const m2 = ball2.mass;

  const newV1 = (m1 * v1 + m2 * v2 - m2 * (v1 - v2) * restitution) / (m1 + m2);
  const newV2 = (m1 * v1 + m2 * v2 - m1 * (v2 - v1) * restitution) / (m1 + m2);

  iadd(ball1.velocity, smul(newV1 - v1, dir));
  iadd(ball2.velocity, smul(newV2 - v2, dir));
}

function handleWallCollision(ball: Ball, restitution: number) {
  if (ball.position.y < ball.radius) {
    ball.position.y = ball.radius;
    ball.velocity.y = -ball.velocity.y * restitution;
  }

  if (ball.position.x < ball.radius) {
    ball.position.x = ball.radius;
    ball.velocity.x = -ball.velocity.x * restitution;
  }

  if (ball.position.x > simWidth - ball.radius) {
    ball.position.x = simWidth - ball.radius;
    ball.velocity.x = -ball.velocity.x * restitution;
  }

  if (ball.position.y > simHeight - ball.radius) {
    ball.position.y = simHeight - ball.radius;
    ball.velocity.y = -ball.velocity.y * restitution;
  }
}

function handleGravity(ball: Ball) {
  const prevPosition = clone(ball.position);
  iadd(ball.velocity, smul(physicsScene.dt, physicsScene.gravity));
  iadd(ball.position, smul(physicsScene.dt, ball.velocity));
  console.log(sub(ball.position, prevPosition));
}

function simulate() {
  physicsScene.balls.forEach((ball, i) => {
    handleGravity(ball);

    physicsScene.balls.slice(i + 1).forEach((otherBall) => {
      handleBallCollision(ball, otherBall, physicsScene.restitution);
    });

    handleWallCollision(ball, /* physicsScene.restitution */ 0.99);
  });
}

function update() {
  simulate();
  draw();
  requestAnimationFrame(update);
}

setupScene();
update();

export {};
