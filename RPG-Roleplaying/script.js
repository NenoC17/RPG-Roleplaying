// LET tells JS you're declaring a variable
// Can be assigned a value
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;

// The player's inventory in the game will be able to hold multiple items.
// An array can be used to hold multiple values.
// For example: let order = ["first", "second", "third"];
let inventory = ["stick"]; //"dagger", "sword" (will add later)

/* This array will be storing objects. Objects are similar to arrays, but with a few differences. 
 One difference is that objects use properties, or keys, to access and modify data.
 Objects are indicated by curly braces 
*/

/* Object properties are written as key: value pairs, where key is the name of the property (or the key),
  and value is the value that property holds. They are also separated by commas. For example, here is 
  an object with a key of name set to Quincy Larson.
  {
    name: "Quincy Larson"
  } 

  If it has more than one word, property name would need to be surrounded in quotes
  For example: 
  "favorite color": "purple"
*/

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }

]

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
]


const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },

  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },

  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },

  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },

  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },

  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  }


];

// JavaScript interacts with the HTML using the Document Object Model, or DOM. 

/* The DOM is a tree of objects that represents the HTML. You can access the HTML 
 using the document object, which represents your entire HTML document.
 One method for finding specific elements in your HTML is using the querySelector() method.
 The querySelector() method takes a CSS selector as an argument and returns the first element 
 that matches that selector. For example, to find the <h1> element in your HTML, you would write:
 let h1 = document.querySelector("h1");
 Note that h1 is a string and matches the CSS selector you would use.
*/

// Since button1 isn't going to be reassign, you should use CONST to declare instead of LET
// Will tell JS to throw an error if it is accidently reassigned

// **ALWAYS BEST PRACTICE THAT THE VARIABLE MATCHES THEIR IDs**
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");

/* In the case where a variable have already been declared, a new
 variable name would need to be used, but value should
 be kept the same
*/
const monsterHealthText = document.querySelector("#monsterHealth");

// Functions are special tools that allow you to run sections of code at specific times.
// Declare functions using "function" keyword
// Example: function functionName() {}



function goTown() {
  update(locations[0]);
}

// Going to store
function goStore() {
 update(locations[1]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health; 
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }

}

function buyWeapon() {
 if (currentWeapon < weapons.length - 1) {
  if (gold >= 30) {
    gold -= 30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = "You now have a " + newWeapon  + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "You do not have enough gold to buy a weapon."
  }
 } else {
  text.innerText = "You already have the most powerful weapon!";
  button2.innerText = "Sell weapon for 15 gold";
  button2.onclick = sellWeapon;
 }
}

function sellWeapon () {
  if (inventory.length > 1) {
    gold += 15
  goldText.innerText = gold;
  let currentWeapon = inventory.shift();
  text.innerText = "You sold a " + currentWeapon + ".";
  text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}




// Going inside cave

function goCave() {
  update(locations[2]);
}

// Going to fight

/*To access the inline style of an element and to  
change the visibility of an element you'll use the following:
(insert element).style.display = '(insert display type)';
*/
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

/*Math.random() generates a random number from 0(inclusive) to 1(exclusive). And
Math.floor() rounds a given number down to the nearest integer
*/
function attack() {
  text.innerText =  'The ' + monsters[fighting].name + ' attacks.';
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    function lose() {
      
    }
  } else if (monsterHealth <= 0) {
    defeatMonster();
    if(fighting === 2) {
      winGame();
    } else {
      defeatMonster()
    }
  }
}

function defeatMonster() {
  update(locations[4]);
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
}

function lose() {
  update(locations[5]);
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}


function fightDragon() {
  fighting = 2;
  goFight();
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  let inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown()
}

// initalize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


/* The innerText property controls the text that appears in an HTML element. 
For example:
const info = document.querySelector("#info");
info.innerText = "Hello World";
This code would change the element assigned to the info variable to have the text Hello World. */
