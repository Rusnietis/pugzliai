console.log('This is how new elements are born.');

const place1 = document.querySelector('#place1');
const place1a = document.querySelector('#place1a');
const place2 = document.querySelector('#place2');
const place3 = document.querySelector('#place3');
const el = '<i>Bebrai yra <b>jėga</b></i>';

place1.innerHTML = el;
place1a.innerHTML = el;

const newElement = document.createElement('i');
const textNode = document.createTextNode('Bebrai yra ');
const textNode2 = document.createTextNode('jėga');
const boldElement = document.createElement('b');
boldElement.appendChild(textNode2);
newElement.appendChild(textNode);
newElement.appendChild(boldElement);
place2.appendChild(newElement);
place3.appendChild(newElement);