console.log('UŽDAVINIAI')

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pirmas uždavinys

// let kint1 = rand(0, 4);
// let kint2 = rand(0, 4);
// let rezultatas = kint1 / kint2;


// if (kint1 > kint2) {
//     console.log('didesnis', kint1);
// } else if (kint1 < kint2) {
//     console.log('mazesnis', kint2);
// }
// console.log(rezultatas);

// console.log(kint1, kint2);

console.log('Antras uždavinys')

let kint1 = rand(0, 25);
let kint2 = rand(0, 25);
let kint3 = rand(0, 25);

if (kint1 < kint3 && kint1 > kint2) {
    // console.log('Pirmas', kint1);
    console.log('Vidurinis1', kint1);
    // console.log('Paskutinis', kint3)
}

if (kint2 > kint1 && kint2 < kint3) {
    console.log('Vidurinis2', kint2);
}

if (kint3 < kint2 && kint1 < kint3) {
    console.log('Vidurinis3', kint3);
}
console.log(kint1, kint2, kint3)

console.log('Trečias uždavinys')

let a = rand(1, 10)
let b = rand(1, 10)
let c = rand(1, 10)

if (a === b && b === c && c === a) {
    console.log('Susidaro trikampis')
}
if (a && b === c) {
    console.log('Susidaro trikampis')
} else console.log('Nesusidaro trikampis')

console.log(a, b, c)

console.log('Ketvirtas uždavinys')

let pirmKint = rand(0, 2);
let antrKint = rand(0, 2);
let trecKint = rand(0, 2);
let ketvKint = rand(0, 2);

if (pirmKint == 0 && antrKint == 0 && trecKint == 0 && ketvKint == 0) {
    console.log('Nulis', pirmKint, antrKint, trecKint, ketvKint);
}

console.log(pirmKint, antrKint, trecKint, ketvKint);

console.log('Penktas uždavinys')

let kintP = rand(-10, 10);
let kintA = rand(-10, 10);
let kintT = rand(-10, 10);

// kintP > 0 && kintA > 0 && kintT > 0

if (kintP < 0) {
    console.log('+', kintP, '+');
} else if (kintP > 0) {
    console.log('-', kintP, '-');
} else if (kintP == 0) {
    console.log('*', kintP, '*');
}

if (kintA < 0) {
    console.log('+', kintA, '+');
} else if (kintA > 0) {
    console.log('-', kintA, '-');
} else if (kintA == 0) {
    console.log('*', kintA, '*');
}

if (kintT < 0) {
    console.log('+', kintT, '+');
} else if (kintT > 0) {
    console.log('-', kintT, '-');
} else if (kintT == 0) {
    console.log('*', kintT, '*');
}
console.log(kintP, kintA, kintT);

console.log('Šeštas uždavinys')

let zvakes = rand(5, 3000);
let kaina = 1;
let kaina2 = 0.97;
let kaina3 = 0.96;

if (zvakes <= 1000 && kaina == 1) {
    console.log('Žvakių kaina po:', kaina, 'eur. Kiekis:', zvakes, 'Viso kaina eur:', kaina * zvakes);
}
if (zvakes > 1000 &&  zvakes < 2000 && kaina2 == 0.97) {
    console.log('Žvakių kaina po:', kaina2, 'eur. Kiekis:', zvakes, 'Viso kaina eur:', kaina2 * zvakes);
}
if (zvakes > 2000 && kaina3 == 0.96) {
    console.log('Žvakių kaina po:', 0.96, 'eur. Kiekis:', zvakes, 'Viso kaina eur:', 0.96 * zvakes);
}

console.log(kaina3);
console.log('Žvakių kiekis:', zvakes);

console.log('Septintas uždavinys')

let fist = rand(0,100);
let second = rand(0,100);
let three = rand(0,100);
let vidurkis = (fist + second + three) / 3;



if (vidurkis > 10) {
    console.log('vidurkis:', vidurkis);
} else if(vidurkis < 10) {
    console.log('vidurkis < 10')
}
if (vidurkis <= 90 && vidurkis > 10) {
    console.log('vidurkis:', vidurkis);
}
console.log(fist, second, three);