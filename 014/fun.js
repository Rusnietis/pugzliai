console.log('More fun with functions!');

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (true) {
    var A = 'A';
}


function fun1() {
    var B = 'B';
    console.log(A);
}

console.log(A);
// console.log(B);
fun1();

const fun2 = () => {
    console.log('fun2 function ver 1');
}

// fun2 = () => console.log('fun2 function ver 2');

fun2();

// recursion function

function count123(count) {
    console.log('start', count);
    count++;
    if (count <= 3) {
        count123(count);
    }
    console.log('end', count - 1);
}
count123(1);

const fun3 = () => {
    console.log('fun3 function');
}

const fun3a = () => {
    console.log('fun3A function');
}

const fun4 = () => {
    console.log('fun4 function');
    return fun3;
}

// let f3 = fun4();
// f3();
fun4()();

const fun5 = f => {
    f();
    console.log('fun5 function');
}

fun5(fun3a);


const cal = (action, f1, f2) => {
    const result = action(f1, f2);
    console.log(`%cResult: ${result}`, 'color:crimson; font-size: 20px; background-color: darkorange; padding: 10px');
}

const cal2 = (action1, action2, f1, f2) => {
    let result;
    result = action1(f1, f2);
    console.log(`%cResult 1: ${result}`, 'color:crimson; font-size: 20px; background-color: darkorange; padding: 10px');
    result = action2(f1, f2);
    console.log(`%cResult 2: ${result}`, 'color:crimson; font-size: 20px; background-color: darkorange; padding: 10px');
}

const sum = (a, b) => a + b;
// const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

// cal(sub, 10, 5);
// cal(sum, 10, 5);
// cal(mul, 10, 5);
// cal(div, 10, 5);

// cal2(div, sum, 10, 5);

const cal3 = (action) => {
    for (let i = 0; i < 5; i++) {
        let f1 = rand(0, 10);
        let f2 = rand(0, 10);
        const result = action(f1, f2);
        console.log(`%cResult: ${f1}  ${f2} = ${result}`, 'color:crimson; font-size: 20px; background-color: darkorange; padding: 10px');
    }
}

cal3((x, b) => x % b);