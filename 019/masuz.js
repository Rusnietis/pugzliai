console.log('%cFunkciju ir masyvu uzdaviniai', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// console.log('%cPirmas uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

// function printWord(tekstas) {
//     console.log(tekstas);
// }

// printWord('Hello');

// console.log('%cAntras uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

// let i = 0;

// function printWord1(tekstas, skaicius) {
//     for (let i = 0; i < skaicius; i++) {
//         console.log(tekstas);
//     }
// }

// printWord1('Pagaliau penktadienis', 5);

// console.log('%cKetvirtas uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');


// function countDivisors(n) {
//     let count = 0;
//     for (let i = 2; i < n; i++) {
//         if (n % i === 0) {
//             count++;
//         }
//     }
//     return count;
// }

// console.log(countDivisors(56));


// console.log('%cPenktas uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

// let array = [];
// let random = 0;

// for (let i = 0; i < 100; i++) {
//     random = rand(33, 77);
//     array.push(random);

// }

// console.log(array);

// // let array = Array.from({ length: 100 }, () => rand(33, 77));

// // ? array[i] /= 2 : 0);
// array.forEach( i => {
//     if (array[i] % 2 === 0 ) {
//         array.sort((a, b) => b - a);
//         console.log(i)
//     }
// });

// console.log(array);

console.log('%c3 patikrinimo masyvu uzdaviniai', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');

// const bitGirls = ['Edita', 'Lina', 'Brigita', 'Deimantė', 'Justė'];
// const cats = ['Murka', 'Rainius', 'Meilutė', 'Bosas', 'Dičkis'];

// console.log('%cPirmas uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

// bitGirls.unshift('Nausėda');
// console.log(bitGirls);
// console.log('%cAntras uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

// let bitCats = [];

// bitCats[0] = { vardas: 'Murka', svoris: 'normalus' };
// bitCats[1] = { vardas: 'Rainis', svoris: 'storas' };
// bitCats[2] = { vardas: 'Meilutė', svoris: 'normalus' };
// bitCats[3] = { vardas: 'Bosas', svoris: 'normalus' };
// bitCats[4] = { vardas: 'Dičkis', svoris: 'storas' };

// console.log(bitCats)

// let random = rand(4, 8)
// cats.forEach(a => {
//     if (bitCats[a] === undefined) {

//         bitCats[a]. = {vardas: a ,svoris: random} 
//     }

// })
// console.log(bitCats)



// console.log('%cTrečias uzdavinys', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

// let sum = 0;


// bitCats.forEach(a => {
//     if (a.svoris === 'storas') {
//         sum++;
//     }
// });
// console.log('Katinukas storas:', sum, 'vnt ');

// let kiekis = 0;

// bitCats.forEach(a => {
//     if (a.svoris === 'normalus') {
//         kiekis++;
//     }
// });
// console.log('Katinukas normalus:', kiekis, 'vnt ');

console.log('%cBoso lygis', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

let bitGirls = ['Edita', 'Lina', 'Brigita', 'Deimantė', 'Justė'];

console.log(bitGirls);

let bitCats1 = [
    { vardas: 'Murka', svoris: 'normalus' },
    { vardas: 'Rainis', svoris: 'storas' },
    { vardas: 'Meilutė', svoris: 'normalus' },
    { vardas: 'Bosas', svoris: 'normalus' },
    { vardas: 'Dičkis', svoris: 'storas' }
]
console.log(bitCats1);

let happyCats = bitGirls.map((name, index) => {
    let onebit = bitCats1[index];
    return { vardas: name, name: onebit.vardas };
    
});

console.log(happyCats);
