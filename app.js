class Pig {}

class Player {}

class Randomizer {
  constructor(items) {
    //store the user set of items
    this.items = items;
  }

  //returns a random entry in the array
  randomize() {
    return this.items[Math.floor(Math.random() * this.items.length)];
  }
}

class Die extends Randomizer {
  constructor(element) {
    // super(["blue", "red", "purple", "none"]);
    super(["#036ffc", "#fc031c", "#9500ff", "#000000"]);
    this.outputElement = element;
  }

  roll() {
    let choice = this.randomize();
    // this.outputElement.innerHTML = choice;
    this.outputElement.style.backgroundColor = choice;
  }
}

class Hamburger {}

let myDie = new Die(document.getElementById("dieResponse"));
