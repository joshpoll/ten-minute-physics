// a Vector2 abstract data type using JS objects, not classes

type Vector2 = {
  x: number;
  y: number;
};

// a function to add two vectors
function add(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

// inplace add
function iadd(a: Vector2, b: Vector2): void {
  a.x += b.x;
  a.y += b.y;
}

// a function to multiply a scalar by a vector
function smul(s: number, v: Vector2): Vector2 {
  return { x: v.x * s, y: v.y * s };
}

// inplace multiply
function ismul(s: number, v: Vector2): void {
  v.x *= s;
  v.y *= s;
}

// a function to calculate the length of a vector
function mag(v: Vector2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// a function to calculate the distance between two vectors
function distance(a: Vector2, b: Vector2): number {
  return mag(sub(a, b));
}

// a function to calculate the dot product of two vectors
function dot(a: Vector2, b: Vector2): number {
  return a.x * b.x + a.y * b.y;
}

// a function to calculate the angle between two vectors
function angle(a: Vector2, b: Vector2): number {
  return Math.acos(dot(a, b) / (mag(a) * mag(b)));
}

// a function to calculate the difference between two vectors
function sub(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

// inplace subtract
function isub(a: Vector2, b: Vector2): void {
  a.x -= b.x;
  a.y -= b.y;
}

// clone
function clone(v: Vector2): Vector2 {
  return { x: v.x, y: v.y };
}

export {
  Vector2,
  add,
  iadd,
  smul,
  ismul,
  mag,
  distance,
  dot,
  angle,
  sub,
  isub,
  clone,
};
