console.log('Welcome to Hell!');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// console.log('Break');
// for (let i = 0; i < 5; i++) {
//     console.log(i + 1);
//     if (i + 1 == 3) {
//         break;
//     }
//     console.log('Next');
// }


// let fuse = 0;

// while (true) {
//     if (++fuse > 50) {
//         console.log('Short circuit!');
//         break;
//     }

//     console.log('Hello');
// }
// console.log('Continue');
// for (let i = 0; i < 5; i++) {
//     if (i + 1 == 3) {
//         continue;
//     }
//     console.log(i + 1);
//     console.log('Next');
// }

// for (let i = 0; i < 5; i++) {
//     if (i + 1 != 3) {
//         console.log(i + 1);
//         console.log('Next');
//     }
// }

// let parcel = 'XL';



// if (parcel == 'S') {
//     console.log('Small');
// } 
// if (parcel == 'M' || parcel == 'S') {
//     console.log('Medium');
// }
// if (parcel == 'L' || parcel == 'S' || parcel == 'M') {
//     console.log('Large');
// }
// console.log('X-Large');


// switch (parcel) {
//     case 'S':
//         console.log('Small');
//     case 'M':
//         console.log('Medium');
//     case 'L':
//         console.log('Large');
//     default:
//         console.log('X-Large');
// }

let animal = 'cat';

// if (animal == 'cat') {
//     console.log('Meow!');
// } else if (animal == 'dog') {
//     console.log('Woof!');
// } else if (animal == 'cow') {
//     console.log('Moo!');
// } else {
//     console.log('Unknown animal');
// }


// switch (animal) {
//     case 'cat':
//     case 'kitten':
//         console.log('Meow!');
//         break;
//     case 'dog':
//         console.log('Woof!');
//         break;
//     case 'cow':
//         console.log('Moo!');
//         break;
//     default:
//         console.log('Unknown animal');
// }


// bigCycle: for (let i = 0; i < 3; i++) {
//     console.log('Big one', i + 1);
//     for (let j = 0; j < 3; j++) {
//         console.log('Small one', j + 1);
//         if (j + 1 == 2) {
//             continue bigCycle;
//         }
//     }
// }

let statistic = 0;
for (let i = 0; i < 5; i++) {
    console.log(`%cMetimas Nr ${i + 1}!`, 'color: crimson; font-weight: bold; background-color: lightblue; padding: 5px; border-radius: 5px;');
    let coin;
    do {
        statistic++;
        coin = rand(0, 1) ? 'H' : 'T';
        console.log(coin);
    } while (coin != 'H');
}

console.log(`%cStatistika: ${statistic}`, 'color: crimson; font-weight: bold; background-color: lightblue; padding: 5px; border-radius: 5px;');