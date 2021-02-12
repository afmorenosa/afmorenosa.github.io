/**
* This code creates an massive body and build the system.
*/

/**
 * This function returns a massive body.
 *
 * @param {double} r Radial coordinate.
 *
 * @param {double} theta Angular coordinate.
 *
 * @param {vector} v Velocity.
 *
 * @param {double} mass The body mass.
*/
var body = function(r, theta, v, mass) {
  this.r = new vectorPolar(r, theta);
  this.v = new vector(v[0], v[1]);
  this.mass = mass;

  this.draw = function(element) {
    element.context.beginPath();
    element.context.arc(
      this.r.x + element.width/2,
      this.r.y + element.height/2,
      40, 0, 2 * Math.PI
    );
    element.context.fillStyle = "#244556";
    element.context.fill();
    element.context.lineWidth = 2;
    element.context.stroke();
  };

  return this;
};

/**
 * This function return the gravity force between two bodies.
 *
 * @param {body} body1 First body.
 *
 * @param {body} body2 Second body.
 *
 * @param {vector} rkVec Runge-Kutta adding.
 *
 * @return The gravity force.
*/
function gravity(body1, body2, rkVec) {
  var constG = 6.674e-11; // N m^2 / kg^2

  var rungeVector = vectorSum(body1.r, rkVec);

  var vecDiff = vectorDiff(rungeVector, body2.r);
  var scalar = -constG * body1.mass * body2.mass;
  scalar *= 1 / (vecDiff.r * vecDiff.r);

  return scalarProd(vecDiff, scalar);
}

/**
 * This function returns a three bodies system.
 *
 * @param {vector} r Radial coordinates.
 *
 * @param {vector} theta Angular coordinates.
 *
 * @param {vector} v Velocities.
 *
 * @param {vector} mass The masses of the body.
*/
var threeBodiesSystem = function(r, theta, v, mass) {
  this.body1 = new body(r[0], theta[0], v[0], mass[0]);
  this.body2 = new body(r[1], theta[1], v[1], mass[1]);
  this.body3 = new body(r[2], theta[2], v[2], mass[2]);

  this.force1 = function(rkVec){
    var force = vectorSum(
      gravity(this.body1, this.body2, rkVec),
      gravity(this.body1, this.body3, rkVec)
    );

    return scalarProd(force, 1 / this.body1.mass);
  };

  this.force2 = function(rkVec){
    var force = vectorSum(
      gravity(this.body2, this.body3, rkVec),
      gravity(this.body2, this.body1, rkVec)
    );
    return scalarProd(force, 1 / this.body2.mass);
  };

  this.force3 = function(rkVec){
    var force = vectorSum(
      gravity(this.body3, this.body1, rkVec),
      gravity(this.body3, this.body2, rkVec)
    );
    return scalarProd(force, 1 / this.body3.mass);
  };

  this.getDiff = function(){
    var diff12 = vectorDiff(this.body1.r, this.body2.r).r;
    var diff23 = vectorDiff(this.body2.r, this.body3.r).r;
    var diff31 = vectorDiff(this.body3.r, this.body1.r).r;

    return [diff12, diff23, diff31];
  };

  this.draw = function(element) {
    this.body1.draw(element);
    this.body2.draw(element);
    this.body3.draw(element);
  };

  return this;
};
