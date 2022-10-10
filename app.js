//sets the initial current player
let currentPlayer = 1;

//sets the initial size of the pig
let size = 0;

//height and width of the pig svg
let hw = 250;

//retrieve ids from the html and make them variables
let playerDiv = document.getElementById("playerDiv");
let playerBtn = document.getElementById("playerBtn");
let btnContainer = document.getElementById("btnContainer");
let pigSvg = document.getElementById("pig-svg");

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
    super(["#036ffc", "#fc031c", "#9500ff", "#000000"]);
    this.outputElement = element;
  }

  //roll the dice to decide which color hamgburger to pick
  roll() {
    let choice = this.randomize();
    //displays the color in a div
    this.outputElement.style.backgroundColor = choice;
  }
}

//class that controls the size of the pig and what happens once the pig pops
class Pig {
  constructor(maxSize, randomize) {
    randomize = new Randomizer();
    maxSize = randomize.randomNumb(15, 25);
    this.maxSize = maxSize;
    console.log(maxSize);
  }

  //have the size of the pig increase whenever it is clicked
  increaseSize() {
    size++;
    console.log(size);

    hw = hw + 8;
    pigSvg.style.height = hw + "px";
    pigSvg.style.width = hw + "px";

    //once the size reaches the max size, the player in control loses
    if (size >= this.maxSize) {
      playerDiv.style.fontSize = 50 + "px";
      playerDiv.style.justifyContent = "center";
      playerDiv.style.display = "flex";
      playerDiv.innerHTML = "Player " + currentPlayer + " Loses!";
      playerDiv.style.width = 100 + "%";

      //give the player the option to restart the game onces someone loses
      playerBtn.innerHTML = "Restart";
      playerBtn.setAttribute("onClick", "window.location.reload()");
      btnContainer.style.justifyContent = "center";
      btnContainer.style.display = "flex";
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
  flip() {
    //change the html of the burger svg
    let burger = document.getElementById("burger");
    // this.element.innerHTML = this.numb;
    // burger.style.backgroundImage = "";
    burger.innerHTML = this.numb;
    console.log("clicked burger");
  }

  //sets the color of the hamburger
  setColor() {
    burger.style.fill = this.color;
  }
}

//extention of the burger class that holds the high number values
class HighBurg extends Hamburger {
  constructor(randomize, numb) {
    super("#c90000");
    randomize = new Randomizer();
    //set the range of numbers to high values
    numb = randomize.randomNumb(4, 7);
    this.numb = numb;
    console.log("high " + numb);
  }
}

//extention of the burger class that holds the medium number values
class MedBurg extends Hamburger {
  constructor(randomize, numb) {
    super("#6a00c7");
    randomize = new Randomizer();
    //set the range of numbers to medium values
    numb = randomize.randomNumb(3, 5);
    this.numb = numb;
    console.log("med " + numb);
  }
}

//extention of the burger class that holds the low number values
class LowBurg extends Hamburger {
  constructor(randomize, numb) {
    super("#0894ff");
    randomize = new Randomizer();
    //set the range of numbers to low values
    numb = randomize.randomNumb(1, 3);
    this.numb = numb;
    console.log("low " + numb);
  }
}

//create objects from the classes
let myDie = new Die(document.getElementById("dieResponse"));
let myPlayer = new Player();
let myPig = new Pig();
let highBurg1 = new HighBurg();
let medBurg1 = new MedBurg();
let lowBurg1 = new LowBurg();

// let highBurg1 = new HighBurg(document.getElementById("burger"));
