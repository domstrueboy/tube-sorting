const PI = Math.PI;

module.exports = class Solution {
  constructor(L, R, A, d, Radius, Def1, Def2, Freq, m, M_2) {

    // Входные параметры для расчёта:
    this.L = L; // Левый угол, градусов
    //R - Правый угол, градусов
    this.A = A; // Расстояние на высоте перемычек, мм
    this.d = d; // Внутренний диаметр трубки, мм
    //Radius; // Радиус сгиба трубки (по оси), мм
    this.M = 1000 * (M_2 - 2*( 50*100 - 2*PI*(35/2)**2 )*2*7900/1e9)/2; // Масса одной трубки (готовой, т.е. подрезанной), г
    
    // Def1 - Деформация (чувствительность) 1, м
    // Def2 - Деформация (чувствительность) 2, м

    // Проверочные параметры:
    this.Def   = 1000 * (Def1 + Def2); // Просто сумма 2х деформаций (мм), чтобы учесть обе и не учитывать неравномерность
    this.Freq  = Freq; // Рабочая частота, Гц
    this.m     = m * 1000; // Масса воды в одной трубке, г
  }
};