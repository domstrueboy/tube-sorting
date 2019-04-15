const Solution = require('./Du50_Solution');

module.exports = class Coefficient {
	constructor(sensor){

		if(sensor === 'Du50')
		{
			var nominalSolution = new Solution(92, 92, 318.9678, 30, 80, 1.05E-05, 1.05E-05, 85.26066501, 0.917761833, 	5.34297800);
			this.nominalSolution = nominalSolution;

			
			var LminSol   = new Solution(91, 92, 318.9678, 30,   80, 1.10E-05, 1.08E-05, 84.63092336, 0.924218212, 	5.379881664);
			var LmaxSol   = new Solution(93, 92, 318.9678, 30,   80, 9.99E-06, 1.01E-05, 85.89490593, 0.911268448, 	5.305862831);

			var AminSol   = new Solution(92, 92, 315,      30,   80, 1.03E-05, 1.03E-05, 85.61882686, 0.914962208, 	5.326975792);
			var AmaxSol   = new Solution(92, 92, 322,      30,   80, 1.06E-05, 1.06E-05, 84.97676748, 0.91990131, 	5.355206929);

			var dminSol   = new Solution(92, 92, 318.9678, 29.9, 80, 1.03E-05, 1.03E-05, 85.42127474, 0.911653618, 	5.439661833);
			var dmaxSol   = new Solution(92, 92, 318.9678, 30.1, 80, 1.06E-05, 1.06E-05, 85.09647003, 0.923890442, 	5.245971364);

			var MminSol   = new Solution(92, 92, 318.9678, 30,   85, 1.01E-05, 1.01E-05, 85.65247087, 0.914971326, 	5.327027906);
			var MmaxSol   = new Solution(92, 92, 318.9678, 30,   75, 1.08E-05, 1.08E-05, 84.88968773, 0.920552339, 	5.358928108);

			var allMinSol = new Solution(91, 91, 315,      29.9, 75, 1.12E-05, 1.12E-05, 84.1350014,  0.924587471, 	5.515456727);
			var allMaxSol = new Solution(93, 93, 322,      30.1, 85, 9.65E-06, 9.66E-06, 86.46766871, 0.910275187, 	5.170094496);



			var deltaFreq_Lmin = (LminSol.Freq - nominalSolution.Freq) / (LminSol.L - nominalSolution.L);	
			var deltaFreq_Lmax = (LmaxSol.Freq - nominalSolution.Freq) / (LmaxSol.L - nominalSolution.L);	this.K_Freq_L = (deltaFreq_Lmin + deltaFreq_Lmax) / 2;

			var deltaFreq_Amin = (AminSol.Freq - nominalSolution.Freq) / (AminSol.A - nominalSolution.A);
			var deltaFreq_Amax = (AmaxSol.Freq - nominalSolution.Freq) / (AmaxSol.A - nominalSolution.A);	this.K_Freq_A = (deltaFreq_Amin + deltaFreq_Amax) / 2;

			var deltaFreq_dmin = (dminSol.Freq - nominalSolution.Freq) / (dminSol.d - nominalSolution.d);
			var deltaFreq_dmax = (dmaxSol.Freq - nominalSolution.Freq) / (dmaxSol.d - nominalSolution.d);	this.K_Freq_d = (deltaFreq_dmin + deltaFreq_dmax) / 2;

			var deltaFreq_Mmin = (MminSol.Freq - nominalSolution.Freq) / (MminSol.M - nominalSolution.M);
			var deltaFreq_Mmax = (MmaxSol.Freq - nominalSolution.Freq) / (MmaxSol.M - nominalSolution.M);	this.K_Freq_M = (deltaFreq_Mmin + deltaFreq_Mmax) / 2;



			var deltaDef_Lmin  = (LminSol.Def - nominalSolution.Def)   / (LminSol.L - nominalSolution.L);	
			var deltaDef_Lmax  = (LmaxSol.Def - nominalSolution.Def)   / (LmaxSol.L - nominalSolution.L);	this.K_Def_L = (deltaDef_Lmin + deltaDef_Lmax) / 2;

			var deltaDef_Amin  = (AminSol.Def - nominalSolution.Def)   / (AminSol.A - nominalSolution.A);
			var deltaDef_Amax  = (AmaxSol.Def - nominalSolution.Def)   / (AmaxSol.A - nominalSolution.A);	this.K_Def_A = (deltaDef_Amin + deltaDef_Amax) / 2;

			var deltaDef_dmin  = (dminSol.Def - nominalSolution.Def)   / (dminSol.d - nominalSolution.d);
			var deltaDef_dmax  = (dmaxSol.Def - nominalSolution.Def)   / (dmaxSol.d - nominalSolution.d);	this.K_Def_d = (deltaDef_dmin + deltaDef_dmax) / 2;

			var deltaDef_Mmin  = (MminSol.Def - nominalSolution.Def)   / (MminSol.M - nominalSolution.M);
			var deltaDef_Mmax  = (MmaxSol.Def - nominalSolution.Def)   / (MmaxSol.M - nominalSolution.M);	this.K_Def_M = (deltaDef_Mmin + deltaDef_Mmax) / 2;



			var deltam_Lmin    = (LminSol.m - nominalSolution.m)       / (LminSol.L - nominalSolution.L);	
			var deltam_Lmax    = (LmaxSol.m - nominalSolution.m)       / (LmaxSol.L - nominalSolution.L);	this.K_m_L = (deltam_Lmin + deltam_Lmax) / 2;

			var deltam_Amin    = (AminSol.m - nominalSolution.m)       / (AminSol.A - nominalSolution.A);
			var deltam_Amax    = (AmaxSol.m - nominalSolution.m)       / (AmaxSol.A - nominalSolution.A);	this.K_m_A = (deltam_Amin + deltam_Amax) / 2;

			var deltam_dmin    = (dminSol.m - nominalSolution.m)       / (dminSol.d - nominalSolution.d);
			var deltam_dmax    = (dmaxSol.m - nominalSolution.m)       / (dmaxSol.d - nominalSolution.d);	this.K_m_d = (deltam_dmin + deltam_dmax) / 2;

			var deltam_Mmin    = (MminSol.m - nominalSolution.m)       / (MminSol.M - nominalSolution.M);
			var deltam_Mmax    = (MmaxSol.m - nominalSolution.m)       / (MmaxSol.M - nominalSolution.M);	this.K_m_M = (deltam_Mmin + deltam_Mmax) / 2;
		
		}
		else
		{
			alert('Нет рассчитанных коэффициентов для изделия ' + sensor + ' !');
		}
	}
};
