/**
* This code implements Runge-Kutta 4 for differential equations
* solution.
*/

/**
 * This function update a variable computed by Runge-Kutta.
*/
function updateRK4(value, kA, kB, kC, kD, bb=false) {
  var add = vectorSum(kA, scalarProd(kB, 2));
  add = vectorSum(add, scalarProd(kC, 2));
  add = vectorSum(add, kD);
  add = scalarProd(add, 1/6);

  return vectorSum(value, add);
}


/**
 * This function solve the three bodies problem with Runge-Kutta 4.
 *
 * @param {threeBodiesSystem} physicSystem The system.
 *
 * @param {double} h Time increasing.
 *
 * @param {double} time The timex.
*/
function RK4 (physicSystem, h, time) {
  var v1 = physicSystem.body1.v;
  var v2 = physicSystem.body2.v;
  var v3 = physicSystem.body3.v;

  var kv1A = scalarProd(physicSystem.force1(new vector(0, 0)), h);
  var kv2A = scalarProd(physicSystem.force2(new vector(0, 0)), h);
  var kv3A = scalarProd(physicSystem.force3(new vector(0, 0)), h);
  var kr1A = scalarProd(v1, h);
  var kr2A = scalarProd(v2, h);
  var kr3A = scalarProd(v3, h);
  //
  // console.log("kv1A", kv1A.x, kv1A.y);
  // console.log("kv2A", kv2A.x, kv2A.y);
  // console.log("kv3A", kv3A.x, kv3A.y);
  // console.log("kr1A", kr1A.x, kr1A.y);
  // console.log("kr2A", kr2A.x, kr2A.y);
  // console.log("kr3A", kr3A.x, kr3A.y);


  //-------------------------------------------------------//
  var kv1B = scalarProd(
    physicSystem.force1(scalarProd(kv1A, 0.5)),
    h
  );
  var kv2B = scalarProd(
    physicSystem.force2(scalarProd(kv2A, 0.5)),
    h
  );
  var kv3B = scalarProd(
    physicSystem.force3(scalarProd(kv3A, 0.5)),
    h
  );
  var kr1B = scalarProd(
    vectorSum(v1, scalarProd(kr1A, 0.5)),
    h
  );
  var kr2B = scalarProd(
    vectorSum(v2, scalarProd(kr2A, 0.5)),
    h
  );
  var kr3B = scalarProd(
    vectorSum(v3, scalarProd(kr3A, 0.5)),
    h
  );


  //-------------------------------------------------------//
  var kv1C = scalarProd(
    physicSystem.force1(scalarProd(kv1B, 0.5)),
    h
  );
  var kv2C = scalarProd(
    physicSystem.force2(scalarProd(kv2B, 0.5)),
    h
  );
  var kv3C = scalarProd(
    physicSystem.force3(scalarProd(kv3B, 0.5)),
    h
  );
  var kr1C = scalarProd(
    vectorSum(v1, scalarProd(kr1B, 0.5)),
    h
  );
  var kr2C = scalarProd(
    vectorSum(v2, scalarProd(kr2B, 0.5)),
    h
  );
  var kr3C = scalarProd(
    vectorSum(v3, scalarProd(kr3B, 0.5)),
    h
  );


  //-------------------------------------------------------//
  var kv1D = scalarProd(physicSystem.force1(kv1C), h);
  var kv2D = scalarProd(physicSystem.force2(kv2C), h);
  var kv3D = scalarProd(physicSystem.force3(kv3C), h);
  var kr1D = scalarProd(vectorSum(v1, kr1C), h);
  var kr2D = scalarProd(vectorSum(v2, kr2C), h);
  var kr3D = scalarProd(vectorSum(v3, kr3C), h);

  physicSystem.body1.v = updateRK4(physicSystem.body1.v,
    kv1A, kv1B, kv1C, kv1D
  );
  physicSystem.body2.v = updateRK4(physicSystem.body2.v,
    kv2A, kv2B, kv2C, kv2D
  );
  physicSystem.body3.v = updateRK4(physicSystem.body3.v,
    kv3A, kv3B, kv3C, kv3D
  );
  // console.log("Be", physicSystem.body1.r);
  physicSystem.body1.r = updateRK4(physicSystem.body1.r,
    kr1A, kr1B, kr1C, kr1D
  );
  // console.log(physicSystem.body1.r);
  physicSystem.body2.r = updateRK4(physicSystem.body2.r,
    kr2A, kr2B, kr2C, kr2D
  );
  physicSystem.body3.r = updateRK4(physicSystem.body3.r,
    kr3A, kr3B, kr3C, kr3D
  );

}
