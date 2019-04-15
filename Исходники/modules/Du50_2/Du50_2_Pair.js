const abs = Math.abs;

module.exports = class Pair {
  constructor(id1, id2, criteria, intersection, tube1, tube2) {

    let now = new Date();

    this._id = id1 + '-' + id2;

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



    this.id1 = id1;
    this.id2 = id2;
    this.criteria = criteria;
    this.intersection = intersection;

    this.tube1 = tube1;
    this.tube2 = tube2;

    /*
    id - Номер трубки (проставляется на трубке), должен быть уникальным;
    MM, l - масса и длина заготовки (для расчёта условного внутреннего диаметра d), г, мм;
    dim1, dim2, dim3, dim4 - измерения в точках, соответственно, 1, 2, 3 и 4, мм;
    M - масса готовой трубки, г.
    */

    // Вычисляемые параметры
    this.MM = abs(tube1.MM - tube2.MM);
    this.l  = abs(tube1.l - tube2.l);

    this.dim1 = abs(tube1.dim1 - tube2.dim1);
    this.dim2 = abs(tube1.dim2 - tube2.dim2);
    this.dim3 = abs(tube1.dim3 - tube2.dim3);
    this.dim4 = abs(tube1.dim4 - tube2.dim4);

    this.L = abs(tube1.L - tube2.L); // Левый характерный угол трубы (м/у левым и средним участками)
    this.R = abs(tube1.R - tube2.R); // Правый характерный угол трубы (м/у правым и средним участками)
    this.A = abs(tube1.A - tube2.A);

    this.d = abs(tube1.d - tube2.d);

    this.M = abs(tube1.M - tube2.M);

    this.Freq = abs(tube1.Freq - tube2.Freq);
    this.Def  = abs(tube1.Def - tube2.Def);
    this.m    = abs(tube1.m - tube2.m);

  }
};