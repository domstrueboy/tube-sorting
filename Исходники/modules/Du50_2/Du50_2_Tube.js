const Coefficient = require('./Du50_2_Coefficient');

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

    let id   = obj._id,
        MM   = obj.MM,
        l    = obj.l,
        dim1 = obj.dim1,
        dim2 = obj.dim2,
        dim3 = obj.dim3,
        dim4 = obj.dim4,
        M    = obj.M;

    /*
    id - Номер трубки (проставляется на трубке), должен быть уникальным;
    MM, l - масса и длина заготовки (для расчёта условного внутреннего диаметра d), г, мм;
    dim1, dim2, dim3, dim4 - измерения в точках, соответственно, 1, 2, 3 и 4, мм;
    M - масса готовой трубки, г.
    */

    this._id = id + '';

    this.MM = filterFloat(MM);
    this.l = filterFloat(l);

    this.dim1 = filterFloat(dim1);
    this.dim2 = filterFloat(dim2);
    this.dim3 = filterFloat(dim3);
    this.dim4 = filterFloat(dim4);

    const I   = 5 - this.dim1;
    const II  = 5 - this.dim2;
    const III = 5 - this.dim3;
    const IV  = 5 - this.dim4;

    let a = 2; // Угол наклона левого участка трубы к вертикали
    let b = deg( atan( (II - I) / 128.84 ) ); // Угол наклона среднего участка к горизонтали
    let c = deg( atan( (IV - III) / 328.06) ); // Угол наклона правого участка к вертикали

    this.L = 2 + 90 + b; // Левый характерный угол трубы (м/у левым и средним участками)
    this.R = 2 + 90 + c - b; // Правый характерный угол трубы (м/у правым и средним участками)

    let L = this.L;
    let R = this.R;

    let Y = 156.921 + 5;
    let Z = 156.921 + IV;
    let alpha = deg(atan((Z * sin( rad(4) ) / Y) / (1 + (Z * cos( rad(4) ) / Y))));
    let X = Z * sin( rad(176)) / sin( rad(alpha) );
    let L1 = 550.219 * sin( rad( 180 - 17.0773 - L ) ) / sin( rad(L) ); // Длина левого участка трубы (без учёта радиуса)

    let hh = 17.5 * sin( rad(L - 90) ); // Поправка на высоту (не суть)
    let H = 423.67 - hh; // Высота треугольника (с учётом поправки)
    let l1 = H / cos( rad(L - 90) ); // Длина левого участка до измерительного щупа
    let AB = L1 - l1 - 15 - 15; // Искомая сторона четырёхугольника
    let AD = X; 

    let BD = sqrt( AB**2 + AD**2 - 2*AB*AD*cos(rad(90 - alpha)) );
    let ABD = deg( asin( AD * sin(rad(90 - alpha)) / BD ) );
    let CBD = L - ABD;

    let ADC = 360 - L - R - (90-alpha);
    let ADB = 180 - ABD - (90-alpha);
    let BDC = ADC - ADB;

    let BCD = 180 - CBD - BDC;
    let A = BD * sin(rad( BDC )) / sin(rad( BCD ));

    this.A = A;

    let d = sqrt( 35**2 - ( MM*1000000*4 / (7900*l*PI) ) );
    this.d = d;

    this.M = filterFloat(M);

    /////

    let coef = new Coefficient('Du50_2');

    this.Freq = coef.nominalSolution.Freq
                + (L - coef.nominalSolution.L) * coef.K_Freq_L
                + (R - coef.nominalSolution.L) * coef.K_Freq_L
                + (A - coef.nominalSolution.A) * coef.K_Freq_A
                + (d - coef.nominalSolution.d) * coef.K_Freq_d
                + (M - coef.nominalSolution.M) * coef.K_Freq_M;

    this.Def = coef.nominalSolution.Def
                + (L - coef.nominalSolution.L) * coef.K_Def_L
                + (R - coef.nominalSolution.L) * coef.K_Def_L
                + (A - coef.nominalSolution.A) * coef.K_Def_A
                + (d - coef.nominalSolution.d) * coef.K_Def_d
                + (M - coef.nominalSolution.M) * coef.K_Def_M;

    this.m = coef.nominalSolution.m
                + (L - coef.nominalSolution.L) * coef.K_m_L
                + (R - coef.nominalSolution.L) * coef.K_m_L
                + (A - coef.nominalSolution.A) * coef.K_m_A
                + (d - coef.nominalSolution.d) * coef.K_m_d
                + (M - coef.nominalSolution.M) * coef.K_m_M;


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