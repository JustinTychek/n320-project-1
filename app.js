//sets the initial current player
let currentPlayer = 1;

//sets the initial size of the pig
let size = 0;

//height and width of the pig svg
let heightWidth = 200;

//retrieve ids from the html and make them variables
let playerDiv = document.getElementById("playerDiv");
let playerBtn = document.getElementById("playerBtn");
let dieResponse = document.getElementById("dieResponse");
let btnContainer = document.getElementById("btnContainer");
let pigSvg = document.getElementById("pig-svg");
let burgers = document.getElementsByClassName("burger");
let info = document.getElementById("info");

//class that decides which player is in control
class Player {
  constructor() {}

  //switch between the players
  swapPlayer() {
    currentPlayer++;
    if (currentPlayer == 3) {
      currentPlayer = 1;
    }

    //change the html to display the current player
    playerDiv.innerHTML = "Player " + currentPlayer + "'s turn";
  }
}

//sets random values for multiple methods in different classes
class Randomizer {
  constructor(items) {
    this.items = items;
  }

  //returns a random entry in the array
  randomize() {
    return this.items[Math.floor(Math.random() * this.items.length)];
  }

  //returns a random number set between two values
  randomNumb(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

//class that allows the player to roll a die for the color of hamburger they choose
class Die extends Randomizer {
  constructor(element) {
    //colors that can be displayed when the dice is rolled
    super(["#059bd4", "#d32027", "#6e58a5", "#000000"]);
    this.outputElement = element;
  }

  //roll the dice to decide which color hamgburger to pick
  roll() {
    let choice = this.randomize();
    //displays the color in a div
    this.outputElement.innerHTML = "";
    this.outputElement.style.backgroundColor = "transparent";
    setTimeout(() => {
      this.outputElement.style.backgroundColor = choice;
    }, 300);

    if (choice == "#000000") {
      setTimeout(() => {
        this.outputElement.innerHTML = "Skip!";
      }, 300);
    }
  }
}

//class that controls the size of the pig and what happens once the pig pops
class Pig {
  constructor(maxSize, randomize) {
    randomize = new Randomizer();
    maxSize = randomize.randomNumb(15, 25);
    this.maxSize = maxSize;
  }

  //have the size of the pig increase whenever it is clicked
  increaseSize() {
    size++;

    heightWidth = heightWidth + 8;
    pigSvg.style.height = heightWidth + "px";
    pigSvg.style.width = heightWidth + "px";

    //once the size reaches the max size, the player in control loses
    if (size >= this.maxSize) {
      playerDiv.style.fontSize = 35 + "px";
      playerDiv.style.justifyContent = "center";
      playerDiv.style.display = "flex";
      playerDiv.innerHTML = "Player " + currentPlayer + " Loses!";
      playerDiv.style.width = 100 + "%";
      playerDiv.style.marginTop = -63 + "px";

      //give the player the option to restart the game onces someone loses
      playerBtn.innerHTML = "Restart";
      playerBtn.setAttribute("onClick", "window.location.reload()");
      btnContainer.style.justifyContent = "center";
      btnContainer.style.display = "flex";

      pigSvg.style.display = "none";
    }
  }
}

//Class that creates hamburgers which can be flipped to reveal a number
class Hamburger {
  constructor(color, element) {
    this.color = color;
    this.element = element;
    // this.number = number;
  }

  //flips the burger when clicked to reveal the number underneath
  flip(evt) {
    //change the html of the burger svg
    let burger = document.querySelectorAll(".burger");

    let currentBurg = evt.target;
    currentBurg.style.backgroundSize = 0 + "px";
    currentBurg.style.fontSize = 30 + "px";
    currentBurg.style.borderRadius = 50 + "%";
    currentBurg.style.paddingTop = 10 + "px";
    currentBurg.style.backgroundColor = "#e0e0e0";
    currentBurg.innerHTML = this.numb;
  }

  //sets the color of the hamburger
  setColor() {
    burger.style.fill = this.color;
  }
}

//extention of the burger class that holds the high number values
class HighBurg extends Hamburger {
  constructor(randomize, numb) {
    super("#d32027");
    randomize = new Randomizer();
    //set the range of numbers to high values
    numb = randomize.randomNumb(4, 7);
    this.numb = numb;
  }
}

//extention of the burger class that holds the medium number values
class MedBurg extends Hamburger {
  constructor(randomize, numb) {
    super("#6e58a5");
    randomize = new Randomizer();
    //set the range of numbers to medium values
    numb = randomize.randomNumb(3, 5);
    this.numb = numb;
  }
}

//extention of the burger class that holds the low number values
class LowBurg extends Hamburger {
  constructor(randomize, numb) {
    super("#059bd4");
    randomize = new Randomizer();
    //set the range of numbers to low values
    numb = randomize.randomNumb(1, 3);
    this.numb = numb;
  }
}

//tweenlite animations

//burger animations
for (let i = 0; i < burgers.length; i++) {
  TweenLite.from(burgers[i], {
    duration: 0.8,
    x: 150,
    alpha: 0,
    delay: i * 0.1,
  });
}

//pig animation
TweenLite.from(pigSvg, {
  duration: 1.4,
  y: 250,
  alpha: 0,
});

//die and player info animation
TweenLite.from(info, {
  duration: 1.4,
  y: -150,
  alpha: 0,
});

//create objects from the classes
let myDie = new Die(document.getElementById("dieResponse"));
let myPlayer = new Player();
let myPig = new Pig();

let highBurgs = [
  new HighBurg(),
  new HighBurg(),
  new HighBurg(),
  new HighBurg(),
  new HighBurg(),
];

let medBurgs = [
  new MedBurg(),
  new MedBurg(),
  new MedBurg(),
  new MedBurg(),
  new MedBurg(),
];

let lowBurgs = [
  new LowBurg(),
  new LowBurg(),
  new LowBurg(),
  new LowBurg(),
  new LowBurg(),
];
