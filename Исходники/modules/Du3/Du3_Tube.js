const Coefficient = require('./Du3_Coefficient');
const geometry = require('./Du3_geometry');

const filterFloat = require('./../filterFloat');

const deg = require('./../deg');
const rad = require('./../rad');

const sin  = Math.sin,  cos = Math.cos, asin = Math.asin, atan = Math.atan;
const sqrt = Math.sqrt, abs = Math.abs, PI = Math.PI;

module.exports = class Tube {
  constructor(obj) {

    // id - Номер трубки (проставляется на трубке), должен быть уникальным;
    this._id  = obj._id + '';

    // Массив, в котором хранятся все измерения и вычисленные значения параметров для этих измерений
    this.params = []

    for (let i = 0; i < obj.params.length; i++) {
        this.params.push( this.measurement(obj.params[i]) )
    }
    
    this.selected = obj.hasOwnProperty('selected') ? filterFloat(obj.selected) : 0;

    this.pair = (obj.hasOwnProperty('pair')) ? obj.pair : ''
  }

  measurement(obj) {

    const resultObject = {};

    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Создаём "перечислитель" для всех свойств dim
    if (range.every(el => obj.hasOwnProperty(`dim${el}`))) { // Если во входящем объекте есть все свойства от dim1 до dim12, то:
        range.forEach(el => resultObject[`dim${el}`] = filterFloat(obj[`dim${el}`])); // копируем в результирующий объект свойства dim1...dim12 из входящего
    }

    const countedProps = ['MM', 'l', 'L', 'R', 'C', 'A', 'RL', 'RR', 'M', 'd', 'Freq', 'Def', 'm']; // Создаём "перечислитель" для всех вычисляемых геометрических свойств
    if (countedProps.every(el => obj.hasOwnProperty(el))) { // Если во входящем объекте есть все вычисляемые геометрические свойства, то:
        countedProps.forEach(el => resultObject[el] = filterFloat(obj[el])); // копируем в результирующий объект соответствующие свойства из входящего или вычисляем их и создаём
    } else {
        resultObject.MM = filterFloat(obj.MM);
        resultObject.l = filterFloat(obj.l);

        const inputDims = {};
        range.forEach(el => inputDims[`dim${el}`] = resultObject[`dim${el}`]);
        const o = geometry(inputDims);
        resultObject.R = o.R;
        resultObject.L = o.L;
        resultObject.C = (o.C < 90) ? 180 - o.C : o.C;
        resultObject.A = o.A;
        resultObject.RL = o.RL;
        resultObject.RR = o.RR;

        resultObject.M = resultObject.MM/resultObject.l * 1000;
        resultObject.d = sqrt( 3**2 - 1000000 * ( resultObject.M*4*0.001 / (7920*PI) ) );

        const coef = new Coefficient('Du3');

        const {L, R, C, A, RL, RR, d} = resultObject;

        resultObject.Freq = coef.nominalSolution.Freq
                            + (L - coef.nominalSolution.L)   * coef.K_Freq_L
                            + (R - coef.nominalSolution.L)   * coef.K_Freq_L
                            + (C - coef.nominalSolution.C)   * coef.K_Freq_C

                            + (A - coef.nominalSolution.A)   * coef.K_Freq_A

                            + (RL - coef.nominalSolution.RL) * coef.K_Freq_RL
                            + (RR - coef.nominalSolution.RL) * coef.K_Freq_RL

                            + (d - coef.nominalSolution.d)   * coef.K_Freq_d;

        resultObject.Def = coef.nominalSolution.Def
                           + (L - coef.nominalSolution.L)   * coef.K_Def_L
                           + (R - coef.nominalSolution.L)   * coef.K_Def_L
                           + (C - coef.nominalSolution.C)   * coef.K_Def_C

                           + (A - coef.nominalSolution.A)   * coef.K_Def_A

                           + (RL - coef.nominalSolution.RL) * coef.K_Def_RL
                           + (RR - coef.nominalSolution.RL) * coef.K_Def_RL
                
                           + (d - coef.nominalSolution.d)   * coef.K_Def_d;

        resultObject.m = coef.nominalSolution.m
                         + (L - coef.nominalSolution.L)   * coef.K_m_L
                         + (R - coef.nominalSolution.L)   * coef.K_m_L
                         + (C - coef.nominalSolution.C)   * coef.K_m_C

                         + (A - coef.nominalSolution.A)   * coef.K_m_A

                         + (RL - coef.nominalSolution.RL) * coef.K_m_RL
                         + (RR - coef.nominalSolution.RL) * coef.K_m_RL
                
                         + (d - coef.nominalSolution.d)   * coef.K_m_d;
    }
    
    if (obj.hasOwnProperty('createTime') && obj.hasOwnProperty('editTime')) {
        resultObject.createTime = obj.createTime;
        resultObject.editTime   = obj.editTime;
    } else {
        let now = new Date();

        let month = now.getMonth() + 1;
        month = (month < 10) ? ('0' + month) : ('' + month);

        resultObject.createTime = {
            value: now,
            text:  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' +
                   now.getDate()  + '-' + month + '-' + now.getFullYear()
        }

        resultObject.editTime = {
            value: now,
            text:  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' +
                   now.getDate()  + '-' + month + '-' + now.getFullYear()
        }
    }

    return resultObject;
    /*
    MM, l - масса и длина заготовки (для расчёта условного внутреннего диаметра d), г, мм;
    L, R, С - углы правый, левый и центральный, град;
    A - расстояние от оси гиба до плоскости симметрии, мм;
    RL, RR - радиусы левый и правый, мм;
    d - внутренний диаметр трубки, мм, до сотых.
    */
  }

  addMeasurement(data) {
    this.params.push( this.measurement(data) );
  }

  removeMeasurement(num) {
    this.params.splice(num, 1);
  }
};