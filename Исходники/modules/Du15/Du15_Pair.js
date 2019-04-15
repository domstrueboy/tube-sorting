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
    L, R, С - углы правый, левый и центральный, град;
    A - расстояние от оси гиба до плоскости симметрии, мм;
    RL, RR - радиусы левый и правый, мм;
    d - внутренний диаметр трубки, мм, до сотых.
    */

    // Вычисляемые параметры
    this.MM = abs(tube1.MM - tube2.MM);
    this.l  = abs(tube1.l - tube2.l);

    this.L  = abs(tube1.L - tube2.L);
    this.R  = abs(tube1.R - tube2.R);
    this.C  = abs(tube1.C - tube2.C);

    this.A  = abs(tube1.A - tube2.A);

    this.RL = abs(tube1.RL - tube2.RL);
    this.RR = abs(tube1.RR - tube2.RR);

    this.d  = abs(tube1.d - tube2.d);


    this.Freq = abs(tube1.Freq - tube2.Freq);
    this.Def  = abs(tube1.Def - tube2.Def);
    this.m    = abs(tube1.m - tube2.m);
  }
};