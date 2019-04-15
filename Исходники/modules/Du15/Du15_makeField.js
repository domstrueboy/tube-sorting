const Criteria = require('./Du15_Criteria');
const Coefficient = require('./Du15_Coefficient');

const abs = Math.abs;

module.exports = function makeField(sensor, criteriaMax, sortField, tubes) {

    let coef = new Coefficient( sensor );

    let FreqField = []; let DefField = []; let mField = [];
    //let FreqFieldAverage = 0, DefFieldAverage = 0, mFieldAverage = 0;
    let FreqFieldAverage = 0.628,
        DefFieldAverage  = 6.86E-06,
        mFieldAverage    = 3.56E-04;
    
    for ( let i=0; i<tubes.length; i++ )
    {
    	for ( let j=i+1; j<tubes.length; j++ )
    	{
    		FreqField.push({

    						id1: tubes[i]._id,
				    		id2: tubes[j]._id,
				    		criteria: new Criteria( tubes[i], tubes[j], coef.K_Freq_L, coef.K_Freq_C, coef.K_Freq_A, coef.K_Freq_RL, coef.K_Freq_d ) 
    						
    						});
    			
    		//FreqFieldAverage = (FreqFieldAverage + FreqField[FreqField.length-1].criteria.C) / 2;
    		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    		DefField.push({

    						id1: tubes[i]._id,
				    		id2: tubes[j]._id,
				    		criteria: new Criteria( tubes[i], tubes[j], coef.K_Def_L, coef.K_Def_C, coef.K_Def_A, coef.K_Def_RL, coef.K_Def_d ) 
    						
    						});
    			
    		//DefFieldAverage = (DefFieldAverage + DefField[DefField.length-1].criteria.C) / 2;
    		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    		mField.push({

    						id1: tubes[i]._id,
				    		id2: tubes[j]._id,
				    		criteria: new Criteria( tubes[i], tubes[j], coef.K_m_L, coef.K_m_C, coef.K_m_A, coef.K_m_RL, coef.K_m_d ) 
    						
    						});
    			
    		//mFieldAverage = (mFieldAverage + mField[mField.length-1].criteria.C) / 2;
    	}
    }


    let field = [];
    for(let i=0, len=FreqField.length; i<len; i++)
    {
    	field.push(
    	{
    		id1: FreqField[i].id1,
    		id2: FreqField[i].id2,
    		criteria: (function(){
                if( FreqFieldAverage > 0 && DefFieldAverage > 0 && mFieldAverage > 0 )
                {
                    return FreqField[i].criteria.C / FreqFieldAverage + DefField[i].criteria.C / DefFieldAverage + mField[i].criteria.C / mFieldAverage;
                }
                else
                {
                    return 0;
                }
            })(),
            intersection: 0
    	});
    }

    field = field.filter( function (elem) { return elem.criteria < criteriaMax; } );

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


    if(sortField === 'byCriteria')
    {
        field = field.sort( function(a, b){ return a.criteria - b.criteria; } );
    }
    else if(sortField === 'byIntersection')
    {
        field = field.sort( function(a, b){ return a.intersection - b.intersection; } );
    }


    return field;
}