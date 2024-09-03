console.log('Fun with Objects');

// 1. Create an object that represents a person.
const person = {
    firstName: 'James',
    lastName: 'Bond',
    age: 30,
    occupation: 'Secret agent',
};

const props = {
    name: 'firstName',
    surname: 'lastName',
    age: 'age',
    occupation: 'occupation',
}

// const agent007 = person; // reference to person object

// const agent007 = {...person}; // copy person object

const agent007 = {...person, codeName: '007', age: 43};

person.age = 40;

const n = 'firstName';

console.log(person.firstName, ',', person[n], person['last' + 'Name']);

console.log(person[props.surname]);

console.log(agent007);


const sumator = (a, b, c) => a + b + c;

console.log(sumator(1, 2, 3));

// sumator with rest operator
const sumator2 = (...args) => {
    console.log(args);
    let sum = 0;
    for (const arg of args) {
        sum += arg;
    }
    return sum;
};

console.log(sumator2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));


// destructuring
const {codeName, firstName, lastName} = agent007;

const age = agent007.age;

console.log(codeName, firstName, lastName, age);


// agent007 for in
for (const key in agent007) {
    console.log(key, ':', agent007[key]);
}

const animals = [
    'racoon',
    'fox',
    'tiger',
    'lion',
    'elephant',
    'cat',
];

animals[16] = 'dog';
animals[10] = 'bear';

console.log(animals, animals.length, animals[10]);

for (let i = 0; i < animals.length; i++) {
    console.log(animals[i]);
}

console.log('for of ------------------------------------------------');

for (const animal of animals) {
    console.log(animal);
}

console.log('for in ------------------------------------------------');

for (const index in animals) {
    console.log(animals[index]);
}

agent007.goToMission = _ => {
    console.log('Going to mission');
};




agent007.guns = ['Walter PPK', 'AK-47', 'M16'];

agent007.goToMission = (mission) => {
    console.log('Going to mission', mission);
}

agent007.goToMission('Kill the good guy');


for (const gun of agent007.guns) {
    console.log(gun);
}

agent007.useGuns = function() {

    // console.log('Guns:', this.guns);

    for (const gun of this.guns) {
        console.log('Using gun:', gun);
    }
}
agent007.useGuns();

const isItString = 'Go to mission';

const isItString2 = new String('Go to mission');

console.log(typeof isItString2, isItString2 + ' !!!');

console.log(typeof isItString, isItString.length);

// prototype string
String.prototype.hello = function() {
    return 'Hello ' + this;
}

const me = 'Racoon';


console.log(me.hello());

console.log('Racoon'.hello());