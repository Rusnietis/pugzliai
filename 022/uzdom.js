console.log('%cDOM uždaviniai', 'background-color: blue; color: white; font-size: 12px; padding: 5px 10px');

console.log('%cPirmas uždavinys:', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
// A Dalis:
const h1 = document.querySelector('h1');

h1.style.color = 'darkgreen';
// B Dalis:
const i = document.querySelector('i');

i.classList.add('small')
console.log(i);
// C Dalis:
h1.classList.remove('main');
console.log(h1);
// D Dalis:
const h2 = document.querySelector('h2');

h2.classList.add('first');
h2.classList.remove('main');
console.log(h2);
// E Dalis:
const span = document.querySelector('span');
span.style.color = 'grey';
span.style.fontSize = '10px';
console.log(span);

// Antras uždavinys:
console.log('%cAntras uždavinys:', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
// A Dalis:

let h21 = document.querySelectorAll('h2');
let count = h21.length;

console.log(count++);

// B Dalis:

let kiekis = 0;

h21.forEach(h21 => {
    if (h2 != h2.first) {
        kiekis++
        // C Dalis:
        h21.style.color = 'skyblue';
    }
});

console.log(kiekis);
console.log(h21);
// D Dalis:

let divClasses = document.querySelectorAll('div.prices h2');

divClasses.forEach(h2 => {
    h2.classList.add('price-tag');
})

console.log(divClasses);

// E Dalis:

let allNew = document.querySelectorAll('.new');

allNew.forEach(allNew => {

    allNew.style.textDecoration = 'underline';

});

console.log(allNew);
// F Dalis:
let allUl = document.querySelectorAll('ul');

let kiekis1 = 0;

allUl.forEach(allUl => kiekis1++);

console.log('Givunu kategoriju yra:', kiekis1);

// G Dalis:

console.log(allUl);

allUl.forEach(allUl => {
    console.log(allUl.id);
    allUl.style.border = '1px solid black';
    allUl.style.padding = ' 15px 50px 15px 50px';

});

// console.log(allUl.id);
// H Dalis:

let sum = 0;
allNew.forEach(allNew => sum++);

console.log('Nauju gyvunu yra:', sum);

// I Dalis:
let li = document.querySelectorAll('li');
let sum1 = 0;
li.forEach(li => {
    if (allUl.li === li.new) {
        sum1++
    }

});
console.log(li)
console.log(sum1);

console.log('%cTrecias uždavinys:', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
// A Dalis:
// const h1 = document.querySelector('h1');
const button1 = document.querySelector('#h1-color');

button1.addEventListener('click', _ => {
    h1.style.color = 'orange';
})
const button2 = document.querySelector('#h1-font');

button2.addEventListener('click', _ => {
    h1.style.fontSize = '10px';
});

console.log(button2);

// B Dalis:

i.addEventListener('click', _ => {
    i.style.fontWeight = 'bold';
});
console.log(i)
// C Dalis:
let bigPrices = document.querySelector('.prices');

let bigPrices1 = true;

bigPrices.addEventListener('click', _ => {
    if (bigPrices1) {
        bigPrices.style.backgroundColor = 'grey';
    } else {
        bigPrices.style.backgroundColor = 'white';
    }

    bigPrices1 = !bigPrices1;
});
// D Dalis:

let contacts = document.querySelector('#contacts');

contacts.addEventListener('click', _ => {

    contacts.style.backgroundColor = 'orange';

});

console.log(contacts)
// E Dalis:

let padidinti = document.querySelector('u');

padidinti.addEventListener('click', _ => {

    contacts.style.fontSize = ('20px')

});
// F Dalis:

let contacts1 = document.querySelector('b');

console.log(contacts);

contacts1.addEventListener('click', _ => {
    function backTo() {
        contacts.style.backgroundColor = '';
    }
    backTo(contacts);

});

console.log(contacts1);
// G Dalis:
let goBack = document.querySelector('#h1-color-back');

goBack.addEventListener('click', _ => {
    h1.style.color = '';
})

let goBack1 = document.querySelector('#h1-font-back');

goBack1.addEventListener('click', _ => {
    h1.style.fontSize = '';
})



console.log('%cKetvirtas  uždavinys:', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
// A Dalis:
let allNew1 = document.querySelectorAll('.new');

allNew1.forEach(allNew1 => {
    allNew1.addEventListener('dblclick', _ => {
        allNew1.style.color = 'red';
    })
});
// B Dalis:
// let li = document.querySelectorAll('li');
let li1 = document.querySelectorAll('.like-button');
console.log(li1)
li.forEach(li => {

    li.addEventListener('click', _ =>{
        if (li !== li1) {
        li.style.fontSize = '130%';
        } else {
            li.style.fontSize = '100%';
        }
    });
});
console.log(li);
// B Dalis:
li1.forEach(li1 => {

    li1.addEventListener('click', _ => {
        li1.classList.add('like');
    })
})
console.log(li);






console.log('%cPenktas uždavinys:', 'background-color: red; color: white; font-size: 12px; padding: 5px 10px');
//A Dalis
// const place = document.querySelectorAll('.prices h2');

// prices.innerHTML = '<h2>Senjorai tik: 1.99 eur</h2>';

const prices1 = document.querySelectorAll('.prices h2');

const newElement = document.createElement('h2');
const textNode = document.createTextNode('Senjorai tik: 1.99 eur');
newElement.appendChild(textNode);
h2.appendChild(newElement);
//B Dalis

const newElement1 = document.createElement('h2');
const textNode1 = document.createTextNode('Senjorų grupė iki 10: tik 5.99 eur');
newElement1.appendChild(textNode1);
h2.appendChild(newElement1);
newElement1.classList.add('new')
console.log(newElement1);
newElement1.addEventListener('click', _=> newElement1.style.color = 'darkgreen');

