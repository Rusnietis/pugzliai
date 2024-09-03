console.log('Task 9');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let random;
let small = 0;
let big = 0;
let fives = 0;

do {
    random = rand(5, 10);
    for (let i = 0; i < random; i++) {
        small++;
        // console.log('-',);
    }
    big++;
    // console.log('----',);

    fives = random == 5 ? fives : 0; // reset

    fives = random == 5 ? fives + 1 : fives; // count
    
} while(random != 5 || fives < 3);


console.log('big', big, 'small', small, 'fives', fives);