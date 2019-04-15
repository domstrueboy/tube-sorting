const Solution = require('./Du3_Solution');

module.exports = class Coefficient {
	constructor(sensor){

		if(sensor === 'Du3')
		{
			var nominalSolution = new Solution(48, 48, 174, 85, 15, 15, 2, 3.10596354131031E-03, 3.10493289406727E-03, 92.9514125220413, 1.29754739106907E-03);
			this.nominalSolution = nominalSolution;
			//console.log("Nominal Solution = " + nominalSolution);

			this.K_Freq_L = -0.41964638236315077;
			this.K_Freq_C = 0.6039121033059056;
			this.K_Freq_A = -0.5866271405348032;
			this.K_Freq_RL = -0.18864799503606858;
			this.K_Freq_d = -4.721415816245486;

			this.K_Def_L = -0.000002135225142895035;
			this.K_Def_C = -0.00010795194716858782;
			this.K_Def_A = 0.0000677127970089282;
			this.K_Def_RL = -0.0006337547181077181;
			this.K_Def_d = 0.0024727434105795395;

			this.K_m_L = -0.0000028115464318227626;
			this.K_m_C = -0.0000017873053322140758;
			this.K_m_A = 0.000010715368505808059;
			this.K_m_RL = 0.0000051548756332532396;
			this.K_m_d = 0.0012975473910690153;


			/* Резерв - вместе с расчётом коэффициентов
			var LminSol   = new Solution(47.08312, 48, 174, 85, 15, 15, 2, 3.11227349885017E-03, 3.09348849161845E-03, 93.3800077315431, 1.30010057074766E-03);
			var LmaxSol   = new Solution(50.45704, 48, 174, 85, 15, 15, 2, 3.05836422062978E-03, 3.12828034624361E-03, 92.037779046858,  1.29057319604565E-03);

			var CminSol   = new Solution(48, 48, 173.29, 85, 15, 15, 2, 3.1216722005956E-03, 3.12121410468932E-03, 92.6815289953986, 1.29881601134926E-03);
			var CmaxSol   = new Solution(48, 48, 174.1 , 85, 15, 15, 2, 3.09656060808986E-03, 3.09725105333391E-03, 93.0341831783866, 1.29736860891533E-03);

			var AminSol   = new Solution(48, 48, 174, 84.40398, 15, 15, 2, 3.08338742616715E-03, 3.08683415995326E-03, 93.271648678504,  1.29116081713218E-03);
			var AmaxSol   = new Solution(48, 48, 174, 85.2697 , 15, 15, 2, 3.10825745572595E-03, 3.12075782823748E-03, 92.7798932136626, 1.30043732595506E-03);

			var RLminSol  = new Solution(48, 48, 174, 85, 13.08368, 15, 2, 3.05233652706363E-03, 3.27242969993435E-03, 93.2698038811599,  1.2876684678068E-03);
			var RLmaxSol  = new Solution(48, 48, 174, 85, 17.47212, 15, 2, 3.16937071264293E-04, 2.90741996094284E-03, 92.4294275774245,  1.3102901759354E-03);

			var dminSol   = new Solution(48, 48, 174, 85, 15, 15, 1.99, 3.0947004111047E-03, 3.09119374235314E-03, 92.9749482740665, 1.28460435584315E-03);
			var dmaxSol   = new Solution(48, 48, 174, 85, 15, 15, 2.01, 3.11839892523054E-03, 3.11695009643889E-03, 92.8805199577416, 1.31055530366453E-03);



			var deltaFreq_Lmin = (LminSol.Freq - nominalSolution.Freq) / (LminSol.L - nominalSolution.L);	
			var deltaFreq_Lmax = (LmaxSol.Freq - nominalSolution.Freq) / (LmaxSol.L - nominalSolution.L);		this.K_Freq_L = (deltaFreq_Lmin + deltaFreq_Lmax) / 2; console.log("K_Freq_L = " + this.K_Freq_L);

			var deltaFreq_Cmin = (CminSol.Freq - nominalSolution.Freq) / (CminSol.C - nominalSolution.C);
			var deltaFreq_Cmax = (CmaxSol.Freq - nominalSolution.Freq) / (CmaxSol.C - nominalSolution.C);		this.K_Freq_C = (deltaFreq_Cmin + deltaFreq_Cmax) / 2; console.log("K_Freq_C = " + this.K_Freq_C);

			var deltaFreq_Amin = (AminSol.Freq - nominalSolution.Freq) / (AminSol.A - nominalSolution.A);
			var deltaFreq_Amax = (AmaxSol.Freq - nominalSolution.Freq) / (AmaxSol.A - nominalSolution.A);		this.K_Freq_A = (deltaFreq_Amin + deltaFreq_Amax) / 2; console.log("K_Freq_A = " + this.K_Freq_A);

			var deltaFreq_RLmin = (RLminSol.Freq - nominalSolution.Freq) / (RLminSol.RL - nominalSolution.RL);
			var deltaFreq_RLmax = (RLmaxSol.Freq - nominalSolution.Freq) / (RLmaxSol.RL - nominalSolution.RL);	this.K_Freq_RL = (deltaFreq_RLmin + deltaFreq_RLmax) / 2; console.log("K_Freq_RL = " + this.K_Freq_RL);

			var deltaFreq_dmin = (dminSol.Freq - nominalSolution.Freq) / (dminSol.d - nominalSolution.d);
			var deltaFreq_dmax = (dmaxSol.Freq - nominalSolution.Freq) / (dmaxSol.d - nominalSolution.d);		this.K_Freq_d = (deltaFreq_dmin + deltaFreq_dmax) / 2; console.log("K_Freq_d = " + this.K_Freq_d);


			var deltaDef_Lmin = (LminSol.Def - nominalSolution.Def) / (LminSol.L - nominalSolution.L);	
			var deltaDef_Lmax = (LmaxSol.Def - nominalSolution.Def) / (LmaxSol.L - nominalSolution.L);		this.K_Def_L = (deltaDef_Lmin + deltaDef_Lmax) / 2; console.log("K_Def_L = " + this.K_Def_L);

			var deltaDef_Cmin = (CminSol.Def - nominalSolution.Def) / (CminSol.C - nominalSolution.C);
			var deltaDef_Cmax = (CmaxSol.Def - nominalSolution.Def) / (CmaxSol.C - nominalSolution.C);		this.K_Def_C = (deltaDef_Cmin + deltaDef_Cmax) / 2; console.log("K_Def_C = " + this.K_Def_C);

			var deltaDef_Amin = (AminSol.Def - nominalSolution.Def) / (AminSol.A - nominalSolution.A);
			var deltaDef_Amax = (AmaxSol.Def - nominalSolution.Def) / (AmaxSol.A - nominalSolution.A);		this.K_Def_A = (deltaDef_Amin + deltaDef_Amax) / 2; console.log("K_Def_A = " + this.K_Def_A);

			var deltaDef_RLmin = (RLminSol.Def - nominalSolution.Def) / (RLminSol.RL - nominalSolution.RL);
			var deltaDef_RLmax = (RLmaxSol.Def - nominalSolution.Def) / (RLmaxSol.RL - nominalSolution.RL);	this.K_Def_RL = (deltaDef_RLmin + deltaDef_RLmax) / 2; console.log("K_Def_RL = " + this.K_Def_RL);

			var deltaDef_dmin = (dminSol.Def - nominalSolution.Def) / (dminSol.d - nominalSolution.d);
			var deltaDef_dmax = (dmaxSol.Def - nominalSolution.Def) / (dmaxSol.d - nominalSolution.d);		this.K_Def_d = (deltaDef_dmin + deltaDef_dmax) / 2; console.log("K_Def_d = " + this.K_Def_d);


			var deltam_Lmin = (LminSol.m - nominalSolution.m) / (LminSol.L - nominalSolution.L);	
			var deltam_Lmax = (LmaxSol.m - nominalSolution.m) / (LmaxSol.L - nominalSolution.L);		this.K_m_L = (deltam_Lmin + deltam_Lmax) / 2; console.log("K_m_L = " + this.K_m_L);

			var deltam_Cmin = (CminSol.m - nominalSolution.m) / (CminSol.C - nominalSolution.C);
			var deltam_Cmax = (CmaxSol.m - nominalSolution.m) / (CmaxSol.C - nominalSolution.C);		this.K_m_C = (deltam_Cmin + deltam_Cmax) / 2; console.log("K_m_C = " + this.K_m_C);

			var deltam_Amin = (AminSol.m - nominalSolution.m) / (AminSol.A - nominalSolution.A);
			var deltam_Amax = (AmaxSol.m - nominalSolution.m) / (AmaxSol.A - nominalSolution.A);		this.K_m_A = (deltam_Amin + deltam_Amax) / 2; console.log("K_m_A = " + this.K_m_A);

			var deltam_RLmin = (RLminSol.m - nominalSolution.m) / (RLminSol.RL - nominalSolution.RL);
			var deltam_RLmax = (RLmaxSol.m - nominalSolution.m) / (RLmaxSol.RL - nominalSolution.RL);	this.K_m_RL = (deltam_RLmin + deltam_RLmax) / 2; console.log("K_m_RL = " + this.K_m_RL);

			var deltam_dmin = (dminSol.m - nominalSolution.m) / (dminSol.d - nominalSolution.d);
			var deltam_dmax = (dmaxSol.m - nominalSolution.m) / (dmaxSol.d - nominalSolution.d);		this.K_m_d = (deltam_dmin + deltam_dmax) / 2; console.log("K_m_d = " + this.K_m_d);*/
		}
		else
		{
			alert('Нет рассчитанных коэффициентов для изделия ' + sensor + ' !');
		}
	}
};
