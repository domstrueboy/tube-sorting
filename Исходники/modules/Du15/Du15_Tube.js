const Coefficient = require('./Du15_Coefficient');

const filterFloat = require('./../filterFloat');

const deg = require('./../deg');
const rad = require('./../rad');

const sin = Math.sin;
const cos = Math.cos;

const asin = Math.asin;
const atan = Math.atan;

const sqrt = Math.sqrt;
const abs = Math.abs;
const PI = Math.PI;

module.exports = class Tube {
  constructor(obj) {

    Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
        if(obj[val] === null){
            console.log(val + ' -> ' + obj[val]);
            console.log(obj._id)
        }
    });

    let id = obj._id + '',
        MM = filterFloat(obj.MM),
        l  = filterFloat(obj.l),
        L  = filterFloat(obj.L),
        R  = filterFloat(obj.R),
        C  = (filterFloat(obj.C) < 90) ? 180 - filterFloat(obj.C) : filterFloat(obj.C),
        A  = filterFloat(obj.A),
        RL = filterFloat(obj.RL),
        RR = filterFloat(obj.RR);
        
    /*
    id - Номер трубки (проставляется на трубке), должен быть уникальным;
    MM, l - масса и длина заготовки (для расчёта условного внутреннего диаметра d), г, мм;
    L, R, С - углы правый, левый и центральный, град;
    A - расстояние от оси гиба до плоскости симметрии, мм;
    RL, RR - радиусы левый и правый, мм;
    d - внутренний диаметр трубки, мм, до сотых.
    */

    this._id  = id;

    this.MM = MM;
    this.l  = l;

    this.L  = L;
    this.R  = R;
    this.C  = C;

    this.A  = A;

    this.RL = RL;
    this.RR = RR;

    let M = MM/l * 1000; // Масса удельная, г

    this.M = M;

    let d = sqrt( 10**2 - 1000000 * ( M*4*0.001 / (7920*PI) ) );

    this.d  = d;

    let coef = new Coefficient('Du15');

    this.Freq = coef.nominalSolution.Freq
                + (L - coef.nominalSolution.L)   * coef.K_Freq_L
                + (R - coef.nominalSolution.L)   * coef.K_Freq_L
                + (C - coef.nominalSolution.C)   * coef.K_Freq_C

                + (A - coef.nominalSolution.A)   * coef.K_Freq_A

                + (RL - coef.nominalSolution.RL) * coef.K_Freq_RL
                + (RR - coef.nominalSolution.RL) * coef.K_Freq_RL

                + (d - coef.nominalSolution.d)   * coef.K_Freq_d;

    this.Def = coef.nominalSolution.Def
                + (L - coef.nominalSolution.L)   * coef.K_Def_L
                + (R - coef.nominalSolution.L)   * coef.K_Def_L
                + (C - coef.nominalSolution.C)   * coef.K_Def_C

                + (A - coef.nominalSolution.A)   * coef.K_Def_A

                + (RL - coef.nominalSolution.RL) * coef.K_Def_RL
                + (RR - coef.nominalSolution.RL) * coef.K_Def_RL
                
                + (d - coef.nominalSolution.d)   * coef.K_Def_d;

    this.m = coef.nominalSolution.m
                + (L - coef.nominalSolution.L)   * coef.K_m_L
                + (R - coef.nominalSolution.L)   * coef.K_m_L
                + (C - coef.nominalSolution.C)   * coef.K_m_C

                + (A - coef.nominalSolution.A)   * coef.K_m_A

                + (RL - coef.nominalSolution.RL) * coef.K_m_RL
                + (RR - coef.nominalSolution.RL) * coef.K_m_RL
                
                + (d - coef.nominalSolution.d)   * coef.K_m_d;


    let now = new Date();

    let month = now.getMonth() + 1;
    if( month < 10 )
    {
        month = '0' + month;
    }
    else
    {
        month = '' + month;
    }


    this.createTime =
    {
        value: now,
        text:  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' +
               now.getDate()  + '-' + month + '-' + now.getFullYear()
    };
    

    this.editTime = 
    {
        value: now,
        text:  now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' +
               now.getDate()  + '-' + month + '-' + now.getFullYear()
    };


    if( obj.pair!==undefined )
    {
        this.pair = obj.pair;
    }
    else
    {
        this.pair = '';
    }
  }
};