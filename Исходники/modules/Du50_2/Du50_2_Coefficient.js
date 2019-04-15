const Solution = require('./Du50_2_Solution');

module.exports = class Coefficient {
	constructor(sensor){

		if(sensor === 'Du50_2')
		{
			var nominalSolution = new Solution(92, 92, 318.9678, 31, 80, 1.2831826510912302E-05, 1.284585899752771E-05, 83.021622331540556, 0.97996569012112478, 4.3583847901541857);
			this.nominalSolution = nominalSolution;

			
			var LminSol = new Solution(91, 92, 318.9678, 31,    80, 1.3441712485153557E-05, 1.3221396837262796E-05, 82.42907557159883,  0.98685966844983908, 4.3883619148524469);
			var LmaxSol = new Solution(93, 92, 318.9678, 31,    80, 1.2248124883648079E-05, 1.2447109700648144E-05, 83.6085954073975,   0.97303219793731155, 4.3282358471377966);

			var AminSol = new Solution(92, 92, 315,      31,    80, 1.2640429644826136E-05, 1.2650945637629268E-05, 83.391399625208635, 0.97697631367951354, 4.3453860677783078);
			var AmaxSol = new Solution(92, 92, 322,      31,    80, 1.3012594722465182E-05, 1.3009488161238292E-05, 82.768420547096767, 0.98225017705248674, 4.3683184375124515);

			var dminSol = new Solution(92, 92, 318.9678, 30.95, 80, 1.2721509725278352E-05, 1.2718307305751641E-05, 83.195245160807715, 0.97680705981399674, 4.4083811424409234);
			var dmaxSol = new Solution(92, 92, 318.9678, 31.05, 80, 1.2961093006566129E-05, 1.3001543218937278E-05, 82.9218454302318,   0.98312941910510088, 4.308307733505397);

			var MminSol = new Solution(92, 92, 318.9678, 31,    75, 1.3266845337669472E-05, 1.3277352783110001E-05, 82.654094043815334, 0.98294533107016013, 4.3713411796329975);
			var MmaxSol = new Solution(92, 92, 318.9678, 31,    85, 1.2414847546951982E-05, 1.2412379727647852E-05, 83.428421669178846, 0.97698604917208609, 4.34542840067536);



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
