const colors = require('colors');
const geometry = require('./../modules/Du3/Du3_geometry');

let result1 =
geometry({
    dim1:  5,
    dim2:  5,
    dim3:  5,
    dim4:  5,
    dim5:  5,
    dim6:  5,
    dim7:  5,
    dim8:  5,
    dim9:  5,
    dim10: 5,
    dim11: 5,
    dim12: 5
});

//console.log('Test:'.inverse);
//console.log('Right!'.green);
//console.log('Wrong!'.red);
//console.log(JSON.stringify(result1));

//console.assert(true, 'Right!');
//console.assert(false, 'Wrong!');

console.warn(result1);
//console.error(result1);