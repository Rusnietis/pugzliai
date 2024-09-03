console.log('Welcome to Rusne');

// atrinkti katinus ir sunis
console.log('Hi, from Array Kingdom!');

const small = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0];

const ones = small.filter(item => item == 1);

console.log(ones);

const farm = [
    { name: 'Moo', type: 'cow' },
    { name: 'Oink', type: 'pig' },
    { name: 'Cluck', type: 'chicken' },
    { name: 'Neigh', type: 'horse' },
    { name: 'Baa', type: 'sheep' },
    { name: 'Meow', type: 'cat', color: 'black' },
    { name: 'Woof', type: 'dog' },
    { name: 'Moo', type: 'cow' },
    { name: 'Oink', type: 'pig' },
    { name: 'Cluck', type: 'chicken' },
    { name: 'Neigh', type: 'horse' },
    { name: 'Baa', type: 'sheep' },
    { name: 'Meow', type: 'cat', color: 'white' },
    { name: 'Woof', type: 'dog' },
    { name: 'Moo', type: 'cow' },
    { name: 'Oink', type: 'pig' },
    { name: 'Cluck', type: 'chicken' },
    { name: 'Neigh', type: 'horse' },
    { name: 'Baa', type: 'sheep' },
    { name: 'Meow', type: 'cat', color: 'brown' },
    { name: 'Woof', type: 'dog' },
    { name: 'Moo', type: 'cow' },
    { name: 'Oink', type: 'pig' },
    { name: 'Cluck', type: 'chicken' },
    { name: 'Neigh', type: 'horse' },
    { name: 'Baa', type: 'sheep' },
    { name: 'Meow', type: 'cat', color: 'white and black' },
    { name: 'Woof', type: 'dog' },
    { name: 'Moo', type: 'cow' },
    { name: 'Oink', type: 'pig' },
    { name: 'Cluck', type: 'chicken' },
    { name: 'Neigh', type: 'horse' },
    { name: 'Baa', type: 'sheep' },
    { name: 'Meow', type: 'cat', color: 'tricolor' },
    { name: 'Woof', type: 'dog' },
    { name: 'Moo', type: 'cow' }
];

const catsAndDogs = farm.filter(item => item.type == 'cat' || item.type == 'dog');

console.log(catsAndDogs);

const noPigs = farm.filter(item => item.type != 'pig');

console.log(noPigs);

const whiteDogs = farm.filter(item => item.type == 'dog').map(item => ({ ...item, color: 'white' }));

console.log(whiteDogs);


const findCat = farm.find(item => item.type == 'cat');
const findCatColor = farm.find(item => item.type == 'beaver')?.color;

console.log(findCatColor);

const dog = { name: 'Woof' };

console.log(dog?.name);


let catCount = 0;

const secondCat = farm.find(item => item.type == 'cat' && ++catCount == 2);

console.log(secondCat);

let catsDogCounter = 0;

const first5CatsOrDogs = farm.filter(item => (item.type == 'cat' || item.type == 'dog') && ++catsDogCounter <= 2);

console.log(first5CatsOrDogs);

const animals = [
    {name: 'Fancy', species: 'dog', age: 5},
    {name: 'Poncho', species: 'dog', age: 10},
    {name: 'Tom', species: 'cat', age: 3},
    {name: 'Jerry', species: 'cat', age: 1},
    {name: 'Bella', species: 'dog', age: 12},
    {name: 'Charlie', species: 'dog', age: 8},
    {name: 'Max', species: 'cat', age: 7}
];

// const sumAgeOfAnimals = animals.reduce((sum, item) => sum + item.age, 0);

// console.log(sumAgeOfAnimals);

const averageAgeOfAnimals = animals.reduce((sum, item, index, array) => {
    sum += item.age;

    if (index === array.length - 1) {
        return sum / array.length;
    }

    return sum;
}, 0);

console.log(averageAgeOfAnimals);

const maxAgeOfAnimals = animals.reduce((max, item) => max > item.age ? max : item.age, 0);

console.log(maxAgeOfAnimals);

// animals.sort((a, b) => b.age - a.age);

// animals.sort((a, b) => b.name.localeCompare(a.name));

animals.sort((a, b) => {
    if (a.species < b.species) {
        return -1;
    }

    if (a.species > b.species) {
        return 1;
    }

    if (a.age < b.age) {
        return 1;
    }

    if (a.age > b.age) {
        return -1;
    }

    return 0;
});

console.log(animals);
