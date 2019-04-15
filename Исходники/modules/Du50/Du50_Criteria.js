const abs = Math.abs;

module.exports = class Criteria {
  constructor(Tube1, Tube2, K_L, K_A, K_d, K_m) {

    let C =   abs( Tube1.L - Tube2.L ) * abs(K_L)
            + abs( Tube1.R - Tube2.R ) * abs(K_L)
            + abs( Tube1.A - Tube2.A ) * abs(K_A)
            + abs( Tube1.d - Tube2.d ) * abs(K_d)
            + abs( Tube1.m - Tube2.m ) * abs(K_m);

    this.C = C;
  }
};