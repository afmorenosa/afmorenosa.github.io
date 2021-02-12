/**
* This code manage vector manipulations.
*/

/**
 * This function returns a 2D vector.
 *
 * @param {double} x Horizontal coordinate.
 *
 * @param {double} y Vertical coordinate.
 *
 * @return A 2D vector.
 */
var vector = function (x, y) {
  // Cartesians
  this.x = x;
  this.y = y;
  // Polars
  this.r = Math.sqrt(x * x + y * y);
  this.theta = Math.atan2(y, x);

  return this;
};

/**
 * This function returns a 2D vector in polar coordinates.
 *
 * @param {double} r Radial coordinate.
 *
 * @param {double} theta Angular coordinate.
 *
 * @return A 2D vector in polar coordinates.
 */
var vectorPolar = function (r, theta) {
  // Cartesians
  this.x = r * Math.cos(theta);
  this.y = r * Math.sin(theta);
  // Polars
  this.r = r;
  this.theta = theta;

  return this;
};

/**
 * This funtion returns the sum of two vectors.
 *
 * @param {vector} vec1 First vector.
 *
 * @param {vector} vec2 second vector.
 *
 * @return The sum vector.
 */
function vectorSum(vec1, vec2) {
  return new vector(vec1.x + vec2.x, vec1.y + vec2.y);
}

/**
 * This funtion returns the sum of two vectors in polar coordinates.
 *
 * @param {vector} vec1 First vector.
 *
 * @param {vector} vec2 second vector.
 *
 * @return The sum vector in polar coordinates.
 */
function vectorSumPolar(vec1, vec2) {
  var cartesianVector = new vector(vec1.x + vec2.x, vec1.y + vec2.y);
  return new vectorPolar(cartesianVector.r, cartesianVector.theta);
}

/**
 * This funtion returns the difference of two vectors.
 *
 * @param {vector} vec1 First vector.
 *
 * @param {vector} vec2 second vector.
 *
 * @return The difference vector.
 */
function vectorDiff(vec1, vec2) {
  return new vector(vec1.x - vec2.x, vec1.y - vec2.y);
}

/**
 * This funtion returns the difference of two vectors in polar coordinates.
 *
 * @param {vector} vec1 First vector.
 *
 * @param {vector} vec2 second vector.
 *
 * @return The difference vector in polar coordinates.
 */
function vectorDiffPolar(vec1, vec2) {
  var cartesianVector = new vector(vec1.x - vec2.x, vec1.y - vec2.y);
  return new vectorPolar(cartesianVector.r, cartesianVector.theta);
}

/**
 * This funtion returns the product of a vectors and a scalar.
 *
 * @param {vector} vec The vector.
 *
 * @param {double} scl The scalar.
 *
 * @return The difference vector.
 */
function scalarProd(vec, scl) {
  return new vector(scl * vec.x, scl * vec.y);
}

/**
 * This funtion returns the product of a vectors and a scalar in polar
 * coordinates.
 *
 * @param {vector} vec The vector.
 *
 * @param {double} scl The scalar.
 *
 * @return The difference vector in polar coordinates.
 */
function scalarProdPolar(vec, scl) {
  var cartesianVector = new vector(scl * vec.x, scl * vec.y);
  return new vectorPolar(cartesianVector.r, cartesianVector.theta);
}
