require('./../../libs/numeric-1.2.6.js'); // подключение решателя нелиейных уравнений

module.exports = function Du3_geometry(obj) {
                
    const abs = Math.abs, sqrt = Math.sqrt, acos = Math.acos, PI = Math.PI; // сокращения для функций из библиотеки Math
    
    function sin(x) { return Math.sin(x * Math.PI/180)  };
    function cos(x) { return Math.cos(x * Math.PI/180)  };

    function solve(f, initX, times) {
        for (let i=0; i<times; i++) {
            initX = numeric.uncmin(f, initX).solution;
        }
        return initX;
    }

    const objLen = Object.getOwnPropertyNames(obj).length; // определение числа измерений в полученном объекте

    const dim = [];
    for (let i=0; i<objLen; i++) { // распаковка полученного объекта в массив измерений
        dim.push(obj['dim' + (i+1)]);
    }
    
              // углы, используемые при расчёте точек профиля трубки:
    const angles = [45, 45, 15, 57, 87, 87, 87, 87, 57, 15, 45, 45],
              // координаты Х точек профиля трубки:
              xs = [-35.53874809, -84.99826513, -94.65989298, -90.44433252, -79.53403247, -10.50720479,  10.50720479,  79.48042582,  90.44844785,  94.65862296,  85.00173487, 35.50426019],
              // коэффициенты при измерении dim, определяющие знак
              xc = [-1, -1, -1, -1, -1, -1,  1,  1,  1, 1, 1, 1],
              // координаты У точек профиля трубки:
              ys = [ 44.55804877, -4.901468260, -16.45951827, -27.43338045, -29.34552144, -32.96306419, -32.96306419, -29.34833085, -27.43070793, -16.45477851, -4.904938010, 44.59253667],
              // коэффициенты при измерении dim, определяющие знак
              yc = [ 1,  1,  1, -1, -1, -1, -1, -1, -1, 1, 1, 1];

    const points = [];
    for (let i=0; i<objLen; i++) { // расчёт точек профиля трубки
        points.push({
            x: xs[i] + xc[i]*dim[i]*cos(angles[i]),
            y: ys[i] + yc[i]*dim[i]*sin(angles[i])
        });
    }

    function k(obj) { // функция определения коэффициентов k (наклон прямого участка трубки)
        return (obj.A - obj.C)/(obj.B - obj.D);
    }
    function b(obj) { // функция определения коэффициентов b (смещения прямого участка трубки)
        return obj.A - obj.k*obj.B; 
    }
    
    // 1-я область
    const k1 = k({A: points[0].y, B: points[0].x, C: points[1].y, D:points[1].x}),
          b1 = b({A: points[0].y, B: points[0].x, k: k1});

    // 3-я область
    const k2 = k({A: points[4].y, B: points[4].x, C: points[5].y, D:points[5].x}),
          b2 = b({A: points[4].y, B: points[4].x, k: k2});

    // 2-я область
    let x1 = points[2].x,
        y1 = points[2].y;

    function fun1(x) { 
        let x0 = x[0],
            y0 = x[1],
            x2 = x[2],
            x3 = x[3],
            r  = x[4];
        return abs( y1 - y0 - ( r**2 - (x1-x0)**2 )**0.5 ) +
                abs( k1*x2 + b1 - y0 - ( r**2 - (x2-x0)**2 )**0.5 ) +
                abs( k2*x3 + b2 - y0 + ( r**2 - (x3-x0)**2 )**0.5 ) +
                abs( (x0 - x2) / ( r**2 - (x0-x2)**2 )**0.5 - k1 ) +
                abs( -(x0 - x3) / ( r**2 - (x0-x3)**2 )**0.5 - k2 );
    }
    
    const sol1 = solve(fun1, [-85, -19, -85, -85, 15], 10);

    // 4-я область
    const k3 = k({A: points[6].y, B: points[6].x, C: points[7].y, D:points[7].x}),
          b3 = b({A: points[6].y, B: points[6].x, k: k3});

    // 6-я область
    const k4 = k({A: points[10].y, B: points[10].x, C: points[11].y, D:points[11].x}),
          b4 = b({A: points[10].y, B: points[10].x, k: k4});
    
    // 5-я область
    x1 = points[8].x,
    y1 = points[8].y;

    function fun2(x) { 
        let x0 = x[0],
            y0 = x[1],
            x2 = x[2],
            x3 = x[3],
            r  = x[4];
        return abs( y1 - y0 + ( r**2 - (x1-x0)**2 )**0.5 ) +
                abs( k3*x2 + b3 - y0 + ( r**2 - (x2-x0)**2 )**0.5 ) +
                abs( k4*x3 + b4 - y0 - ( r**2 - (x3-x0)**2 )**0.5 ) +
                abs( -(x0 - x2) / ( r**2 - (x0-x2)**2 )**0.5 - k3 ) +
                abs( (x0 - x3) / ( r**2 - (x0-x3)**2 )**0.5 - k4 );
    }
    
    const sol2 = solve(fun2, [85, -19, 85, 95, 15], 10);

    // Дуга
    function fun3(x) { 
        let x0 = x[0],
            y0 = x[1],
            x1 = x[2],
            x2 = x[3],
            r  = 15;
        return  abs( k2*x1 + b2 - y0 + ( r**2 - (x1-x0)**2 )**0.5 ) +
                abs( k3*x2 + b3 - y0 + ( r**2 - (x2-x0)**2 )**0.5 ) +
                abs( -(x0 - x1) / ( r**2 - (x0-x1)**2 )**0.5 - k2 ) +
                abs( -(x0 - x2) / ( r**2 - (x0-x2)**2 )**0.5 - k3 );
    }
    
    const sol3 = solve(fun3, [-0.02, -23, -0.8, 0.8], 10);

    const V1 = [ points[1].x - points[0].x,
                 points[1].y - points[0].y ],
          V3 = [ points[4].x - points[5].x,
                 points[4].y - points[5].y ],
          V4 = [ points[7].x - points[6].x,
                 points[7].y - points[6].y ],
          V6 = [ points[10].x - points[11].x,
                 points[10].y - points[11].y ];

    const cosL = cosX(V1, V3),
          cosR = cosX(V4, V6),
          cosC = cosX(V3, V4);

    function cosX(v1, v2) {
        return scalMult(v1, v2) / ( vectLen(v1) * vectLen(v2) );
    }

    function scalMult(v1, v2) {
        if (v1.length !== v2.length) {
            console.error('Vector`s lengths are not equal');
            return;
        }
        let result = 0;
        for (let i=0, len = v1.length; i<len; i++) {
            result += v1[i]*v2[i];
        }
        return result;
    }

    function vectLen(v) {
        return v.reduce( (previousValue, currentValue) => previousValue**2 + currentValue**2)**0.5; // Корень из суммы квадратов
    }

    return {
        L: acos(cosL) * 180/PI,
        R: acos(cosR) * 180/PI,
        C: abs((acos(cosC) - PI)) * 180/PI,
        A: sol3[0] - sol1[0],
        RL: sol1[4],
        RR: sol2[4]
    };
}      