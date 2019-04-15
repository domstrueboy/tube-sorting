const Criteria = require('./Du3_Criteria');
const Coefficient = require('./Du3_Coefficient');

const abs = Math.abs;

module.exports = function makeField(sensor, criteriaMax, sortField, tubes) {

    let coef = new Coefficient( sensor );

    let FreqField = []; let DefField = []; let mField = [];
    //let FreqFieldAverage = 0, DefFieldAverage = 0, mFieldAverage = 0;
    let FreqFieldAverage = 0.708,
        DefFieldAverage  = 8.84E-05,
        mFieldAverage    = 1.46E-05;
    
    for ( let i=0; i<tubes.length; i++ )
    {
    	for ( let j=i+1; j<tubes.length; j++ )
    	{
    		FreqField.push({

    						id1: tubes[i]._id,
				    		id2: tubes[j]._id,
				    		criteria: new Criteria( tubes[i].params[tubes[i].selected], tubes[j].params[tubes[j].selected], coef.K_Freq_L, coef.K_Freq_C, coef.K_Freq_A, coef.K_Freq_RL, coef.K_Freq_d ) 
    						
    						});
    			
    		//FreqFieldAverage = (FreqFieldAverage + FreqField[FreqField.length-1].criteria.C) / 2;
    		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    		DefField.push({

    						id1: tubes[i]._id,
				    		id2: tubes[j]._id,
				    		criteria: new Criteria( tubes[i].params[tubes[i].selected], tubes[j].params[tubes[j].selected], coef.K_Def_L, coef.K_Def_C, coef.K_Def_A, coef.K_Def_RL, coef.K_Def_d ) 
    						
    						});
    			
    		//DefFieldAverage = (DefFieldAverage + DefField[DefField.length-1].criteria.C) / 2;
    		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    		mField.push({

    						id1: tubes[i]._id,
				    		id2: tubes[j]._id,
				    		criteria: new Criteria( tubes[i].params[tubes[i].selected], tubes[j].params[tubes[j].selected], coef.K_m_L, coef.K_m_C, coef.K_m_A, coef.K_m_RL, coef.K_m_d ) 
    						
    						});
    			
    		//mFieldAverage = (mFieldAverage + mField[mField.length-1].criteria.C) / 2;
    	}
    }


    let field = [];
    for(let i=0, len=FreqField.length; i<len; i++)
    {
        let tempCrit = (function(){
            if( FreqFieldAverage > 0 && DefFieldAverage > 0 && mFieldAverage > 0 )
            {
                return FreqField[i].criteria.C / FreqFieldAverage + DefField[i].criteria.C / DefFieldAverage + mField[i].criteria.C / mFieldAverage;
            }
            else
            {
                return 0;
            }
        })();

        if (tempCrit <= criteriaMax) {
            field.push(
            {
                id1: FreqField[i].id1,
                id2: FreqField[i].id2,
                criteria: tempCrit,
                intersection: 0
            })
        }
    	
    }

    for( let i=0, len=field.length; i<len; i++ )
    {
        let intersectionCount = 0;

        for( let j=0, len=field.length; j<len; j++ )
        {
            if(    field[i].id1 === field[j].id1
                || field[i].id1 === field[j].id2
                || field[i].id2 === field[j].id2
                || field[i].id2 === field[j].id1 )
            {
                intersectionCount++;
            }
        }

        field[i].intersection = intersectionCount-1;
    } 

    return field;
}