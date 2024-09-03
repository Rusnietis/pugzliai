console.log('Welcome to task SEVEN!');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let seven;
let sum = 0;
let sum2 = 0;

for (let i = 0; i < 5; i++) {
    let random = rand(10, 20);
    // seven = random; //A. Assigning the random number to the variable seven
  
    // seven = seven || 0; //B. Assigning 0 to the variable seven
    // seven = seven + random; //B. Adding the random number to the variable seven

    // seven = seven || ''; //C. Assigning an empty string to the variable seven
    // seven = seven + ' ' + random; //C. Adding the random number to the variable seven

    // sum = sum + random; //D. Adding the random number to the variable sum
    // seven = seven || ''; //D. Assigning an empty string to the variable seven
    // seven = seven + ' ' + random; //D. Adding the random number to the variable seven

    sum2 = sum2 + random; //E. Adding the random number to the variable sum
    seven = seven || ''; //E. Assigning an empty string to the variable seven
    seven = seven + (i ? ' + ' : '') + random; //E. Adding the random number to the variable seven
}

// seven = seven + ' ' + sum; //D. Adding the sum to the variable seven
seven = seven + ' = ' + sum2; //E. Adding the sum to the variable seven

console.log(seven);