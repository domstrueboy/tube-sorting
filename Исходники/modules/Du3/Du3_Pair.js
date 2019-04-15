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
    this.MM = abs(tube1.params[tube1.selected].MM - tube2.params[tube2.selected].MM);
    this.l  = abs(tube1.params[tube1.selected].l - tube2.params[tube2.selected].l);

    this.L  = abs(tube1.params[tube1.selected].L - tube2.params[tube2.selected].L);
    this.R  = abs(tube1.params[tube1.selected].R - tube2.params[tube2.selected].R);
    this.C  = abs(tube1.params[tube1.selected].C - tube2.params[tube2.selected].C);

    this.A  = abs(tube1.params[tube1.selected].A - tube2.params[tube2.selected].A);

    this.RL = abs(tube1.params[tube1.selected].RL - tube2.params[tube2.selected].RL);
    this.RR = abs(tube1.params[tube1.selected].RR - tube2.params[tube2.selected].RR);

    this.d  = abs(tube1.params[tube1.selected].d - tube2.params[tube2.selected].d);


    this.Freq = abs(tube1.params[tube1.selected].Freq - tube2.params[tube2.selected].Freq);
    this.Def  = abs(tube1.params[tube1.selected].Def - tube2.params[tube2.selected].Def);
    this.m    = abs(tube1.params[tube1.selected].m - tube2.params[tube2.selected].m);    
  }
};