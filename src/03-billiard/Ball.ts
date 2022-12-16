import { clone, Vector2 } from "./Vector2";

export type Ball = {
  radius: number;
  mass: number;
  position: Vector2;
  velocity: Vector2;
};

export function createBall({ radius, mass, position, velocity }: Ball): Ball {
  return {
    radius,
    mass,
    position: clone(position),
    velocity: clone(velocity),
  };
}

export function drawBall(
  c: CanvasRenderingContext2D,
  ball: Ball,
  scales: {
    xScale: (pos: { x: number; y: number }) => number;
    yScale: (pos: { x: number; y: number }) => number;
    rScale: (r: number) => number;
  }
): void {
  c.fillStyle = "#FF0000";

  c.beginPath();
  c.arc(
    scales.xScale(ball.position),
    scales.yScale(ball.position),
    scales.rScale(ball.radius),
    0,
    2 * Math.PI
  );
  c.closePath();
  c.fill();
}
