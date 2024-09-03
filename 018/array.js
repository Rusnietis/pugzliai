console.log('Welcome to Magic World of array');

const arr1 = [
    [1, 7, 3],
    [4, 22, 6],
    [0, 8]
];

let sum = 0;
for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
        sum += arr1[i][j];
    }
}
let sum1 = 0;
arr1.forEach(item => {
    item.forEach(item1 => {
        sum1 += item1;
    })
});
console.log(sum1);

const arr2 = [
    [
        0, [4, 22, 6]
    ],
    0,
    3,
    [
        4,
        [
            4,
            22,
            [1, [0, [0, [[[[0, 8], 8], 8], 8]]]]
        ],
        6
    ],
    5,
    6,
    [0, 8],
    8,
    9
];

let sum2 = 0;

function sumArr(arr) {
    arr.forEach(item => {
        if (Array.isArray(item)) {
            sumArr(item);
        } else {
            sum2 += item;
        }
    })
}
sumArr(arr2);

// console.log(arr2.flat(Infinity).reduce((a, b) => a + b, 0));
console.log(arr2);
console.log(sum2);

const arr3 = [-5, 8, -3, 0, 4, 2, -1, 0, 1, -9, 6];

console.log(arr3);

const arr31 = arr3.map(item => {
    if (item < 0) {
        return 0;
    }
    return item;
});

console.log(arr31);

const arr32 = arr3.map(item => {
    if (item < 0) {
        return 1;
    }
    return item;
});

console.log(arr32);



// const arr31 = [...arr3];

// arr31.forEach((item, i) => {
//     if (item < 0) {
//         arr31[i] = 0;
//     }
// });

// console.log(arr31);

// arr3.forEach((item, i) => {
//     if (item < 0) {
//         arr3[i] = 1;
//     }
// });

// console.log(arr3);

const colors = ['pink', 'green', 'blue', 'yellow', 'pink', 'black', 'pink'];

console.log(colors);

const noPinkIsBlack = colors.map(item => item == 'pink' ? 'black' : item);

console.log(noPinkIsBlack);

const colors2 = [
    {color: 'pink'},
    {color: 'green'},
    {color: 'blue'},
    {color: 'yellow'},
    {color: 'pink'},
    {color: 'black'},
    {color: 'pink'}
];

const noPinkIsBlack2 = colors2.map(item => item.color == 'pink' ? {color: 'black'} : item);

const colors3 = [
    {color: 'pink', id: 1, sky: 'blue'},
    {color: 'green', id: 2, sky: 'blue'},
    {color: 'blue', id: 3, tractor: 'green'},
    {color: 'yellow', id: 4, sky: 'blue'},
    {color: 'pink', id: 5, forest: 'green'},
    {color: 'black', id: 6, sky: 'blue'},
    {color: 'pink', id: 7, sky: 'blue'}
];

const noPinkIsBlack3 = colors3.map(item => item.color == 'pink' ? {...item, color: 'black'} : {...item});

colors3[0].color = 'red';
colors3[1].color = 'red';


console.log(colors3);
console.log(noPinkIsBlack3);

const allBlack = colors3.map(item => ({...item, color: 'black'})   );

console.log(allBlack);

const colors4 = [
    ['pink', 'green', 'blue'],
    ['yellow', 'pink', 'black'],
    ['pink', 'green', 'blue'],
    ['yellow', 'pink', 'black'],
    ['pink', 'green', 'blue'],
    ['yellow', 'pink', 'black'],
    ['pink', 'green', 'blue'],
    ['yellow', 'pink', 'black'],
    ['pink', 'green', 'blue'],
    ['yellow', 'pink', 'black'],
    ['pink', 'green', 'blue'],
    ['yellow', 'pink', 'black']
];

const secondElementBlack = colors4.map(item => {
    item[1] = 'black';
    return item;
});