console.log('Ciklų uždaviniai');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log('----------------');

// console.log('Pirmas uždavinys');

// let kint1 = rand(5, 25);
// let kint2 = rand(5, 25);
// let kint3 = rand(5, 25);
// let sum = kint1 + kint2 + kint3;
// let rezult = `${sum}`;
// console.log('kint1:', kint1, 'kint2:', kint2, 'kint3:', kint3);
// console.log('Suma:', sum);
// console.log('rezult', typeof rezult, rezult);
// let sum1 = `${kint1}` + ' ' + `${kint2}` + ' ' + `${kint3}`;
// console.log(sum1);
// console.log(sum1, 'Jų suma:', sum);

// console.log('----------------');

// console.log('Antras uždavinys');

// let one = rand(5, 10);

// console.log(one);


// console.log('----------------');

// console.log('Trecias uždavinys');

// let two = "Labas";

// for (let i = 1; i <= 5; i++) {

//     console.log(two, i);

// }

// console.log('----------------');

// console.log('Ketvirtas uždavinys');

// for (let i = 1; i <= 7; i++) {

//     console.log(one, i);
// }

// console.log('----------------');

// console.log('Penktas uždavinys');

// for (let i = 0; i < one; i++) {

//     console.log(one, i)

// }

// console.log('----------------');

// console.log('Sestas uždavinys');

// for (let i = 0; i < one; i++) {
//     if (one > 7) {
//         console.log(one, i);
//     } else {
//         console.log('Skaicius yra mazesnis uz septynis');
//     }
// }

// console.log('----------------');

// console.log('Septintas uždavinys');

// let seven;
// // let sum = 0;
// // let sum2 = 0;

// for (let i = 0; i < 5; i++) {
//     let random = rand(10, 20);
//     seven = random; //A. Assigning the random number to the variable seven

//     // seven = seven || 0; //B. Assigning 0 to the variable seven
//     // seven = seven + random; //B. Adding the random number to the variable seven

//     // seven = seven || ''; //C. Assigning an empty string to the variable seven
//     // seven = seven + ' ' + random; //C. Adding the random number to the variable seven

//     // sum = sum + random; //D. Adding the random number to the variable sum
//     // seven = seven || ''; //D. Assigning an empty string to the variable seven
//         seven = seven + ' ' + random; //D. Adding the random number to the variable seven

//     //     sum2 = sum2 + random; //E. Adding the random number to the variable sum
//     //     seven = seven || ''; //E. Assigning an empty string to the variable seven
//     //     seven = seven + (i ? ' + ' : '') + random; //E. Adding the random number to the variable seven
// }

// // seven = seven + ' ' + sum; //D. Adding the sum to the variable seven
// // seven = seven + ' = ' + sum2; //E. Adding the sum to the variable seven

// console.log(seven);

// console.log('----------------');
console.log('Aštuntas uždavinys');
console.log('Ciklas for');
let fiveBig = 0; // A dalis
// let i = 0;


for (let i = 0; i < 5; i++) {

    console.log('Gera diena', i);
    console.log(`Iteracijos: ${i + 1}`);
}

let count1 = 0;
let count2 = 0;
let suma = 0;
let suma1 = 0;


for (let i = 0; i < 25; i++) {

    let random = rand(10, 25);
    fiveBig = random;
    count1++
    console.log(`%cSugeneruotas skaicius:${fiveBig}`, 'background-color: darkgreen; color: white; font-size: 20px; padding: 5px 10px');

    if (fiveBig <= 12) {
        // C dalis
        console.log('%cCiklas baigtas, kadangi fiveBig < 12', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
        break;
    } else if (fiveBig >= 18) {
        count2++;
        suma1 += fiveBig
        console.log('%cCiklas baigtas, kadangi fiveBig >18', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
        continue;


    }

    suma += fiveBig; // C dalis

    console.log(`%cIteracijos: ${i + 1}`, 'background-color: yellow; color: black; padding: 5px 5px');

}


console.log(`%cKintamuju suma sugeneruota nuo 12 iki 18: ${suma}`, 'background-color: blue; color: white; padding: 5px 5px');
console.log('Praleistu kintamuju suma:', suma1)
console.log(`%cPraleistos iteracijos: ${count2}`, 'background-color: yellow; color: black; padding: 5px 5px');
console.log('%cCiklo pabaiga', 'background-color: darkred; color: white; font-size: 12px; padding: 5px 10px');
console.log(`%cBendrai iteracijos: ${count1}`, 'background-color: yellow; color: black; padding: 5px 5px'); // B dalis


