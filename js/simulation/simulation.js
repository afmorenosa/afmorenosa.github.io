/**
* This code generates the simulation in the canvas.
*/

var time = 0;

/**
* This object correspond to the canvas
*/
var threeBoddies = {
  element: document.getElementById("three-bodies"),
  width: 2000,
  height: 2000,

  init: function () {
    this.element.width = this.width;
    this.element.height = this.height;
    this.context = this.element.getContext("2d");
  },
};

threeBoddies.init();

var r = [700, 700, 700];
var theta = [Math.PI / 2, Math.PI, -Math.PI / 6];
var v = [
  [100 * Math.random() - 50, 100 * Math.random() - 50],
  [100 * Math.random() - 50, 100 * Math.random() - 50],
  [100 * Math.random() - 50, 100 * Math.random() - 50]
];
var mass = [4e13, 4e13, 4e13];

// Three bodies system
var physicSystem = new threeBodiesSystem(r, theta, v, mass);

physicSystem.draw(threeBoddies);

/**
 * This function consider the colissions.
*/
function colissions() {
  var diff = physicSystem.getDiff();

  if (diff[0] <= 50) {

    physicSystem.body1.v = new vector(
      -physicSystem.body1.v.x,
      -physicSystem.body1.v.y
    );
    physicSystem.body2.v = new vector(
      -physicSystem.body2.v.x,
      -physicSystem.body2.v.y
    );

  } else if (diff[1] <= 50) {

    physicSystem.body2.v = new vector(
      -physicSystem.body2.v.x,
      -physicSystem.body2.v.y
    );
    physicSystem.body3.v = new vector(
      -physicSystem.body3.v.x,
      -physicSystem.body3.v.y
    );

  } else if (diff[2] <= 50) {

    physicSystem.body3.v = new vector(
      -physicSystem.body3.v.x,
      -physicSystem.body3.v.y
    );
    physicSystem.body1.v = new vector(
      -physicSystem.body1.v.x,
      -physicSystem.body1.v.y
    );

  }
}

/**
 * This function consider the limits of the canvas.
*/
function canvasLimits(pos, vel) {
  if (pos.x >= threeBoddies.width/2 &&
    vel.x > 0
  ) {
    vel.x = -vel.x;
  }

  if (pos.x <= -threeBoddies.width/2 &&
    vel.x < 0
  ) {
    vel.x = -vel.x;
  }

  if (pos.y >= threeBoddies.height/2 &&
    vel.y > 0
  ) {
    vel.y = -vel.y;
  }

  if (pos.y <= -threeBoddies.height/2 &&
    vel.y < 0
  ) {
    vel.y = -vel.y;
  }

  return vel;
}


/**
 *  This function move the simulation.
*/
function setReset() {
  threeBoddies.context.clearRect(0, 0, threeBoddies.width, threeBoddies.height);

  var h = 0.05;

  time += h;

  colissions();

  physicSystem.body1.v = canvasLimits(
    physicSystem.body1.r,
    physicSystem.body1.v
  );
  physicSystem.body2.v = canvasLimits(
    physicSystem.body2.r,
    physicSystem.body2.v
  );
  physicSystem.body3.v = canvasLimits(
    physicSystem.body3.r,
    physicSystem.body3.v
  );

  RK4(physicSystem, h, time);

  physicSystem.draw(threeBoddies);
}

var timer = setInterval(function () {
  setReset();
}, 20);
