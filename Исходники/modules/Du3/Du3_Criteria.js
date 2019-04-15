const abs = Math.abs;

module.exports = class Criteria {
  constructor(Tube1, Tube2, K_L, K_C, K_A, K_RL, K_d) {

    let C =   abs( Tube1.L  - Tube2.L )  * abs(K_L)
    		    + abs( Tube1.R  - Tube2.R )  * abs(K_L)
            + abs( Tube1.C  - Tube2.C )  * abs(K_C)
            + abs( Tube1.A  - Tube2.A )  * abs(K_A)
            + abs( Tube1.RL - Tube2.RL ) * abs(K_RL)
            + abs( Tube1.RR - Tube2.RR ) * abs(K_RL)
            + abs( Tube1.d  - Tube2.d )  * abs(K_d);

    this.C = C;
  }
};