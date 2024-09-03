console.log('Welcome to If Else world!');

// >, <, >=, <=, ==, ===, !=, !==


console.log('Start');

console.log('1 km');

console.log('2 km');

if (5 > 31) {
    console.log('Bar');
} else if (8 > 51) {
    console.log('Shop');
} else {
    console.log('Go home');
}

console.log('3 km');

console.log('4 km');

console.log('End');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// let digit1 = rand(0, 4);
// let digit2 = rand(0, 4);


// console.log(digit1, digit2);

let r = rand(0, 5) || 'Zero';

// if (r == 0) {
//     r = 'Zero';
// }

// console.log(r);

let randDigit = rand(0, 1);

if (randDigit == 0) {
    console.log('Zero');
} else {
    console.log('One');
}

let what = rand(0, 1) ? 1 : rand(0, 1) ? 2 : 3;

console.log(what, typeof what);