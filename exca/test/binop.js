'exca overloads enable'

class Vec2D {
  point = [0, 0]

  constructor(x, y) {
    this.point = [x, y]
  }

  get x() { return this.point[0] }
  get y() { return this.point[1] }
  
  set x(val) { this.point[0] = val }
  set y(val) { this.point[1] = val }

  [Symbol.for("+")](right) {
    return new this.constructor(this.x + right.x, this.y + right.y)
  }
}

let pos = new Vec2D(3, 5)
let vel = new Vec2D(2, 3)

// no += yet.
pos = pos + vel
// Vec2D(5, 8)

console.log(pos)