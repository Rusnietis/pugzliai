console.log('Welcome to DOM!');


const h1 = document.querySelector('h1');

h1.style.color = 'crimson';
h1.style.fontSize = '4em'; // font-size => fontSize
h1.style.textAlign = 'center';
// h1.style.letterSpacing = '-0.3em';

// let times = 3;

// const si = setInterval(_ => {
//     h1.style.backgroundColor = h1.style.backgroundColor === 'crimson' ? 'black' : 'crimson';
//     times--;
//     if (times === 0) {
//         clearInterval(si);
//     }
// }
//     , 1000);

// setTimeout(_ => {
//     h1.style.backgroundColor = 'pink';
// }
//     , 5000);



// setInterval(_ => {
//     h1.style.backgroundColor = h1.style.backgroundColor === 'crimson' ? 'black' : 'crimson';
//   }
//   , 300);


setTimeout(_ => {

    let text = h1.innerText; // getter
    console.log(text);
    // replace Object to Racoon
    text = text.replace('Object', 'Racoon');
    h1.innerText = text; // setter

}, 3000);


let html = h1.innerHTML; // getter

console.log(html);

// h1.innerText = 'Racoon City';

// const word = 'Racoon City     ';
// const letters = word.split('');
// const spans = letters.map(letter => `<span>${letter}</span>`);
// const line = spans.join('');
// const divLine = document.querySelector('.line');
// divLine.innerHTML = line;

// setInterval(_ => {
//     // spans.unshift(spans.pop());
//     spans.push(spans.shift());
//     divLine.innerHTML = spans.join('');
// }, 300);

// console.log(line);

h21 = document.querySelectorAll('h2');

h21.forEach((h2, i) => {
    console.log(h2.innerText);
    h2.classList.add('big');
    h2.classList.remove('blue');
    h2.setAttribute('href', i);
});

const img = document.querySelector('img');

setInterval(_ => {
    img.setAttribute('src', img.getAttribute('src') === 'racoon.jpg' ? 'racoon2.jpg' : 'racoon.jpg');
}
    , 2000);