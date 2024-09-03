console.log('Say hi to Objects!');

//shortcuts
const arr = [];
const obj = {};

//longcuts
const arr2 = new Array();
const obj2 = new Object({ food: 5 });
const map = new Map();

class Racoon {

    // constructor
    constructor(racoonName, color = 'grey') {
        console.log('New racoon is born');
        this.food = 5;
        this.name = racoonName;
        this.color = color;
    }

    // eat method
    eat() {
        console.log(this.color + ' ' + this.name + ' is eating');
        this.food--;
        console.log('I have ' + this.food + ' food left');
    }

}

const racoon1 = new Racoon('Bobby', 'brown');
const racoon2 = new Racoon('Robby');


racoon1.eat();
racoon1.eat();
racoon2.eat();
racoon1.eat();


class Circle {

    static circles = [];
    static effectInterval;
    static circlesPlace;
    static buttonsPlace;

    static init(circlesPlace, buttonsPlace, count = 5) {
        this.circlesPlace = circlesPlace;
        this.buttonsPlace = buttonsPlace;
        for (let i = 0; i < count; i++) {
            new this(circlesPlace);
        }
        this.createButton(buttonsPlace, 'Start changing colors', this.effectChangeColors.bind(this));
        this.createButton(buttonsPlace, 'Move left', this.effectMoveLeft.bind(this));
        this.createButton(buttonsPlace, 'Move right', this.effectMoveRight.bind(this));
        this.createButton(buttonsPlace, 'Stop', _ => clearInterval(this.effectInterval));
    }

    static createButton(buttonsPlace, text, action) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', action);
        buttonsPlace.appendChild(button);
    }

    static effectChangeColors() {
        clearInterval(this.effectInterval);
        this.effectInterval = setInterval(_ => {
            this.circles.forEach(circle => circle.changeColor());
        }, 300);
    }

    static effectMoveLeft() {
        clearInterval(this.effectInterval);
        this.effectInterval = setInterval(_ => {
            this.circles.push(this.circles.shift());
            this.circles.forEach(circle => this.circlesPlace.appendChild(circle.circleDiv));
        }, 700);
    }

    static effectMoveRight() {
        clearInterval(this.effectInterval);
        this.effectInterval = setInterval(_ => {
            this.circles.unshift(this.circles.pop());
            this.circles.forEach(circle => this.circlesPlace.appendChild(circle.circleDiv));
        }, 700);
    }

    constructor(place) {
        this.circleDiv = document.createElement('div');
        this.circleDiv.style.width = '100px';
        this.circleDiv.style.height = '100px';
        this.circleDiv.style.borderRadius = '50%';
        this.circleDiv.style.backgroundColor = this.randomColor();
        this.circleDiv.style.margin = '10px';
        this.circleDiv.style.display = 'inline-block';
        place.appendChild(this.circleDiv);
        this.constructor.circles.push(this);
    }

    randomColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
        return '#' + randomColor;
    }

    changeColor() {
        this.circleDiv.style.backgroundColor = this.randomColor();
    }

}

const circlesPlace = document.querySelector('#circles');
const buttonsPlace = document.querySelector('#buttons');




class Colors4 extends Circle {
    
        static colors = ['crimson', 'darkblue', 'darkgreen', 'darkorange'];

        constructor(place) {
            super(place); // call parent constructor
            this.circleDiv.textContent = 'bla';
        }
    
        randomColor() {
            const randomIndex = Math.floor(Math.random() * this.constructor.colors.length);
            return this.constructor.colors[randomIndex];
        }
}


Colors4.init(circlesPlace, buttonsPlace, 6);