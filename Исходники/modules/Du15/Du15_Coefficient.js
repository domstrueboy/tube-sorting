const Solution = require('./Du15_Solution');

module.exports = class Coefficient {
	constructor(sensor){

		if(sensor === 'Du15')
		{
			var nominalSolution = new Solution(48.75, 48.75, 174.5, 129, 36.5, 36.5, 8, 2.55469723357833E-04, 2.55079192145391E-04, 90.8063340606808, 3.81693670430495E-02);
			this.nominalSolution = nominalSolution;

			
			var LminSol   = new Solution(47.2 , 48.75, 174.5, 129, 36.5, 36.5, 8, 2.55387889821701E-04, 2.5451207878114E-04, 91.5092851243693, 3.82615514844733E-02);
			var LmaxSol   = new Solution(49.12, 48.75, 174.5, 129, 36.5, 36.5, 8, 2.55328003889365E-04, 2.5522555909512E-04, 90.6443874644772, 3.81468204718011E-02);

			var CminSol   = new Solution(48.75, 48.75, 173.93, 129, 36.5, 36.5, 8, 2.56364264076946E-04, 2.5584051578734E-04, 90.5968893722483, 3.81992521987704E-02);
			var CmaxSol   = new Solution(48.75, 48.75, 175.5 , 129, 36.5, 36.5, 8, 2.53754725846843E-04, 2.53770246368672E-04, 91.1918138363137, 3.81164133717823E-02);	

			var AminSol   = new Solution(48.75, 48.75, 174.5, 127.53, 36.5, 36.5, 8, 2.52689601230009E-04, 2.52316314033515E-04, 91.3058110131239, 3.79192102624279E-02);
			var AmaxSol   = new Solution(48.75, 48.75, 174.5, 130.1 , 36.5, 36.5, 8, 2.57394643508301E-04, 2.56477799925208E-04, 90.478818727721 , 3.8356559191814E-02);

			var RLminSol  = new Solution(48.75, 48.75, 174.5, 129, 35.1 , 36.5, 8, 2.53501175528651E-04, 2.59458160800298E-04, 90.9723591861583, 3.80559137938566E-02);
			var RLmaxSol  = new Solution(48.75, 48.75, 174.5, 129, 40.34, 36.5, 8, 2.60376781771476E-04, 2.42073296151585E-04, 90.4056718696609, 3.84805318084488E-02);

			var dminSol   = new Solution(48.75, 48.75, 174.5, 129, 36.5, 36.5, 7.99, 2.5447396403681E-04, 2.54045087519555E-04, 90.8674275639761, 3.80740032650779E-02);
			var dmaxSol   = new Solution(48.75, 48.75, 174.5, 129, 36.5, 36.5, 8.01, 2.56184771978995E-04, 2.55806589764327E-04, 90.7709252500459, 3.82648501002932E-02);



			var deltaFreq_Lmin = (LminSol.Freq - nominalSolution.Freq) / (LminSol.L - nominalSolution.L);	
			var deltaFreq_Lmax = (LmaxSol.Freq - nominalSolution.Freq) / (LmaxSol.L - nominalSolution.L);		this.K_Freq_L = (deltaFreq_Lmin + deltaFreq_Lmax) / 2;

			var deltaFreq_Cmin = (CminSol.Freq - nominalSolution.Freq) / (CminSol.C - nominalSolution.C);
			var deltaFreq_Cmax = (CmaxSol.Freq - nominalSolution.Freq) / (CmaxSol.C - nominalSolution.C);		this.K_Freq_C = (deltaFreq_Cmin + deltaFreq_Cmax) / 2;

			var deltaFreq_Amin = (AminSol.Freq - nominalSolution.Freq) / (AminSol.A - nominalSolution.A);
			var deltaFreq_Amax = (AmaxSol.Freq - nominalSolution.Freq) / (AmaxSol.A - nominalSolution.A);		this.K_Freq_A = (deltaFreq_Amin + deltaFreq_Amax) / 2;

			var deltaFreq_RLmin = (RLminSol.Freq - nominalSolution.Freq) / (RLminSol.RL - nominalSolution.RL);
			var deltaFreq_RLmax = (RLmaxSol.Freq - nominalSolution.Freq) / (RLmaxSol.RL - nominalSolution.RL);	this.K_Freq_RL = (deltaFreq_RLmin + deltaFreq_RLmax) / 2;

			var deltaFreq_dmin = (dminSol.Freq - nominalSolution.Freq) / (dminSol.d - nominalSolution.d);
			var deltaFreq_dmax = (dmaxSol.Freq - nominalSolution.Freq) / (dmaxSol.d - nominalSolution.d);		this.K_Freq_d = (deltaFreq_dmin + deltaFreq_dmax) / 2;


			var deltaDef_Lmin = (LminSol.Def - nominalSolution.Def) / (LminSol.L - nominalSolution.L);	
			var deltaDef_Lmax = (LmaxSol.Def - nominalSolution.Def) / (LmaxSol.L - nominalSolution.L);		this.K_Def_L = (deltaDef_Lmin + deltaDef_Lmax) / 2;

			var deltaDef_Cmin = (CminSol.Def - nominalSolution.Def) / (CminSol.C - nominalSolution.C);
			var deltaDef_Cmax = (CmaxSol.Def - nominalSolution.Def) / (CmaxSol.C - nominalSolution.C);		this.K_Def_C = (deltaDef_Cmin + deltaDef_Cmax) / 2;

			var deltaDef_Amin = (AminSol.Def - nominalSolution.Def) / (AminSol.A - nominalSolution.A);
			var deltaDef_Amax = (AmaxSol.Def - nominalSolution.Def) / (AmaxSol.A - nominalSolution.A);		this.K_Def_A = (deltaDef_Amin + deltaDef_Amax) / 2;

			var deltaDef_RLmin = (RLminSol.Def - nominalSolution.Def) / (RLminSol.RL - nominalSolution.RL);
			var deltaDef_RLmax = (RLmaxSol.Def - nominalSolution.Def) / (RLmaxSol.RL - nominalSolution.RL);	this.K_Def_RL = (deltaDef_RLmin + deltaDef_RLmax) / 2;

			var deltaDef_dmin = (dminSol.Def - nominalSolution.Def) / (dminSol.d - nominalSolution.d);
			var deltaDef_dmax = (dmaxSol.Def - nominalSolution.Def) / (dmaxSol.d - nominalSolution.d);		this.K_Def_d = (deltaDef_dmin + deltaDef_dmax) / 2;


			var deltam_Lmin = (LminSol.m - nominalSolution.m) / (LminSol.L - nominalSolution.L);	
			var deltam_Lmax = (LmaxSol.m - nominalSolution.m) / (LmaxSol.L - nominalSolution.L);		this.K_m_L = (deltam_Lmin + deltam_Lmax) / 2;

			var deltam_Cmin = (CminSol.m - nominalSolution.m) / (CminSol.C - nominalSolution.C);
			var deltam_Cmax = (CmaxSol.m - nominalSolution.m) / (CmaxSol.C - nominalSolution.C);		this.K_m_C = (deltam_Cmin + deltam_Cmax) / 2;

			var deltam_Amin = (AminSol.m - nominalSolution.m) / (AminSol.A - nominalSolution.A);
			var deltam_Amax = (AmaxSol.m - nominalSolution.m) / (AmaxSol.A - nominalSolution.A);		this.K_m_A = (deltam_Amin + deltam_Amax) / 2;

			var deltam_RLmin = (RLminSol.m - nominalSolution.m) / (RLminSol.RL - nominalSolution.RL);
			var deltam_RLmax = (RLmaxSol.m - nominalSolution.m) / (RLmaxSol.RL - nominalSolution.RL);	this.K_m_RL = (deltam_RLmin + deltam_RLmax) / 2;

			var deltam_dmin = (dminSol.m - nominalSolution.m) / (dminSol.d - nominalSolution.d);
			var deltam_dmax = (dmaxSol.m - nominalSolution.m) / (dmaxSol.d - nominalSolution.d);		this.K_m_d = (deltam_dmin + deltam_dmax) / 2;
		}
		else
		{
			alert('Нет рассчитанных коэффициентов для изделия ' + sensor + ' !');
		}
	}
};
