console.log('All about arrays ----------------------------------------');

const animals = [
    'Lion',
    'Racoon',
    'Monkey',
    'Cat',
    'Dog',
    'Bird',
    'Fish',
    'Turtle',
    'Snake'
];
console.log(animals);

animals[4] = 'Frog';
animals.push('Elephant');
animals.push('Horse', 'Cow', 'Pig');
animals.unshift('Tiger', 'Bear'); // reindex

animals.pop();
animals.pop();
animals.pop();

animals.shift(); // reindex
animals.shift(); // reindex
// Per masyva perejimas ciklu
let animalsLine = 'Animals: ';
for (let i = 0; i < animals.length; i++) {
    // console.log(animals[i]);
    animalsLine += animals[i] + ' + ';
}

const animalsLine2 = 'Animals: ' + animals.join(' + ');

console.log(animalsLine);
console.log(animalsLine2);

// for (let animal of animals) {
//     console.log(animal);
// }

const printRed = animal => {
    console.log(`%c ${animal}`, 'color: crimson');
}


// animals.forEach(animal => console.log(animal));
animals.forEach(printRed);

// animals.forEach(function (animal) {
//     console.log(animal);
// });

const arr123 = [1, 2, -3, 1, -1];

let sum = 0;

arr123.forEach(petras => sum += petras);

let positiveSum = 0;

// arr123.forEach(petras => {
//     if (petras > 0) {
//         positiveSum += petras;
//     }
// });

// one line
arr123.forEach(petras => petras > 0 ? positiveSum += petras : false);

console.log(sum, positiveSum);

let unknownObj = null;

console.log(unknownObj, typeof unknownObj);

const farm = [
    'Cow',
    'Chicken',
    'Pig',
    'Cow',
    'Chicken',
    'Cow'
];

let cowCount = 0;

let A = 5;
let B = 1;

let cowFingers = '';


A += B; // A = A + B;
console.log(A);

farm.forEach(animal => animal === 'Cow' ? cowCount++ : false);

farm.forEach(animal => animal === 'Cow' ? cowFingers += '|' : false);

console.log(cowCount, cowFingers);


const superFarm = [
    { animal:'Cow', weight: 500 },
    { animal:'Chicken', weight: 3 },
    { animal:'Pig', weight: 100 },
    { animal:'Cow', weight: 400 },
    { animal:'Chicken', weight: 2 },
    { animal:'Cow', weight: 600 }
];

let cowWeight = 0;

superFarm.forEach(a => a.animal === 'Cow' ? cowWeight += a.weight : false);


const allAnimalsWeight = {};

superFarm.forEach(a => {
    if (allAnimalsWeight[a.animal] === undefined) {
        allAnimalsWeight[a.animal] = 0;
    }
    allAnimalsWeight[a.animal] += a.weight;
});

console.log(allAnimalsWeight);

const colors = [
    'red',
    'green', 
    'blue',
    'yellow',
    'pink',
    'purple',
    'orange'
];

let isBlack = 'NO';
colors.forEach(color => color === 'black' ? isBlack = 'YES' : false);


let isPink = 'NO';
colors.forEach(color => color === 'pink' && (isPink = 'YES'));

let isPink2 = 'NO';

colors.forEach(color => {
    if (color === 'pink') {
        isPink2 = 'YES';
    }
});

console.log(isPink);








console.log(animals, animals.length);