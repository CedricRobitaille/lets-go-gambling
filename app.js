/**
 * Overview of the game state / flow
 * ==================================================================================================
 * 
 * 1. Game Start Screen
 * Start [y/n]
 * 
 * Main Screen
 *       SLOT MACHINE
 * ⇅⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇄ 
 * ⇅                     ⇅
 * ⇅  🍒 🍇 🍋 🍉 🧡  ⇅
 * ⇅  🍒 🍇 🍋 🍉 🧡  ⇅
 * ⇅  🍒 🍇 🍋 🍉 🧡  ⇅
 * ⇅                     ⇅
 * ⇅⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇅ 
 * ⇅         SPIN        ⇅ 
 * ⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇅   Money: $100
 * What do you want to do??
 * 
 * < Shop | Spin | Leave >
 * > 
 * 
 * ===================================================================================================
 * 
 * Spin Screen
 *                         
 *       SLOT MACHINE
 * ⇅⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇆⇄ 
 * ⇅                     ⇅
 * ⇅  🍒 🍇 🍋 🍉 🧡  ⇅
 * ⇅  🍒 🍇 🍋 🍉 🧡  ⇅
 * ⇅  🍒 🍇 🍋 🍉 🧡  ⇅
 * ⇅                     ⇅
 * ⇅⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇅
 * ⇅         SPIN        ⇅  
 * ⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇄⇅   Money: $100
 *  You Have x Spins Left!
 * 
 * Spin Again (y/n)
 * > 
 * 
 * ===================================================================================================
 * 
 * Shop Screen
 * 
 *   ◜━━━━━━━━━━━━━◝
 *  ╱◡◡◡  SHOP ◡◡◡╲
 * ◡◡◡◡◡◡◡◡◡◡◡◡◡
 *   │              │
 *   │  1   2   3   │
 *   │ 🥠  🎃  🏆  │
 * ━━━━━━━━━━━━━━━━━━━━  Money: $100
 * │                  │
 * [Item name] : $20 - What it does
 * [Item name] : $22 - What it does
 * [Item name] : $12 - What it does
 * Exit - Return to Slot Machine
 * 
 * >
 * 
 */




const prompt = require('prompt-sync')();

const symbols = ["🍒", "🍇", "🍋", "🔔", "🍀", "🪙", "💎"];
const slotMachine = [
  [symbols[6], symbols[6], symbols[6], symbols[6], symbols[6]],
  [symbols[6], symbols[6], symbols[6], symbols[6], symbols[6]],
  [symbols[6], symbols[6], symbols[6], symbols[6], symbols[6]]
]

const powerups = ["🥠", "🎃", "🏆"];

const inventory = {
  money: 0,
  spinCount: 0,
  luck: 1, // 1 = Base Luck, 2 = Moderate Luck, 4 = VERY LUCKY
  abilities: [],
}

const abilities = {
  luckUp: function() {

  },
}

const screenMessages = [
  `\n       KACHUNK`,
  `${inventory.spinCount} Spins Remaining!\n\nReady to Spin? (y/n)`,
  `What do you want to do?\n\n< Shop | Spin | Leave >`,
  `\nHow many spins?\n3 ($5) | 5 ($12)`
]




/**
 * Function to synchronously timeout the program. Used for adding delays to actions.
 * @param {number} delay - Length of delay in ms (1000th of a second)
 */
const sleep = function (delay) {
  const start = Date.now();
  while (Date.now() - start < delay) {
    // Busy-wait: blocks everything
  }
}


/** Function that returns a weighted array of slot characters
 *  @returns {array} Assorted symbols
 */ 
const weightedSelection = () => {
  const weightedArr = [];

  for (let i = 0; i < slotMachine[2].length; i++) { //
    let totalWeight = 0; // Logs the sum of all weights
    // Sets the weights
    for (let i = 0; i < symbols.length; i++) { // Goes through every element, adding more weight to the weight total.
      totalWeight += 1 / Math.pow(i + 1.125, 2-inventory.luck) // Weight is calculated by powerings the index (with a little boost) to the power of the luck stat
    }
    let rand = Math.random() * totalWeight;
    for (let i = 0; i < symbols.length; i++) { // Go through every element
      const weight = 1 / Math.pow(i + 1.125, 2-inventory.luck); // Uses the same weight calculation as seen above
      if (rand < weight) {
        weightedArr.push(symbols[i]);
        break;
      }
      rand -= weight;
    }
  }
  return weightedArr;
}










/** 
 *  Function to Spin the Wheel
 *  
 */ 
const slotMachineHome = () => {


  const spinWheel = (quantity) => {
    // Does the actual spinning


    const spin = () => {
      // System to cycle through the spin
      const rand = Math.random() * 5 + 25; // 10 + (0-5) is the cycle duration
      for (let i = 1; i < rand; i++) { // Cycles through the spin a random amount

        sleep(Math.pow(i, 2) / 1.5); // Sets a synchronous delay. Each spin cycle gets longer until it stops.
        console.clear();
        // Below edits the slot machine's array to slide upwards (with a random array generated at the bottom elem)
        for (let row = 0; row < 3; row++) {
          if (row != 2) { // For the top 2 rows, just slide the lower row's contents up one!
            slotMachine[row] = structuredClone(slotMachine[row + 1]) // Must be a structured slot, otherwise, you're just copying the array pointer.
          } else {
            slotMachine[row] = weightedSelection(); // For the bottom row, get an array of emojis, weighted through the luck stat.
          }
        }
        displaySlot(0);
      }
      console.clear();
      displaySlot(1);
    }



    const spinInput = () => { // Accepts user input before spinning
      let input = prompt("> ") // user input
      if (input.toLowerCase() === "y") { // If user says yes
        inventory.spinCount --; // Remove a spin from spin count
        spin(); // Spins the wheel
      } else if (input.toLowerCase() === "n") { //
        // ======================== FUTURE CHANGE!!!!
        // If the user does not want to spin again (refund spins), we need to prompt them for confirmation, then give a refund.
        slotMachineHome(); // goes home.
      } else { // Non-accepted input detected
        spinInput(); // restarts the spin input
      }
    }


    // Input and Display when you return to the Spin Screen
    console.clear(); // Resets viewport
    displaySlot(1); // "Ready to spin?"
    for (let i = 0; i < quantity; i++) { // Grants (quantity) spins. Request spin input before spinning
      spinInput();
      if (i === quantity-1) {
        console.clear();
        spinBuy();
      }
    }

  }

  const spinBuy = () => { // 
    console.clear();
    displaySlot(3)
    let input = prompt("> ");
    if (input.toLowerCase() === "3") {
      spinWheel(3);
    } else if (input.toLowerCase() === "5") {
      spinWheel(5);
    } else if (input.toLowerCase() === "leave") {

    } else {
      console.clear();
      slotMachineHome();
    }
  }

  displaySlot(2)
  let input = prompt("> ");
  if (input.toLowerCase() === "spin") {
    spinBuy(3);
  } else if (input.toLowerCase() === "shop") {

  } else if (input.toLowerCase() === "leave") {

  } else {
    console.clear();
    slotMachineHome();
  }
}











/**
 * Function to load logic structure for each location.
 * @param {string} location - Available locations: menu, slots, shop
 */
const location = (location) => {
  switch (location) {
    case "menu":

      break;
    case "slotsMachine":
      break;
    case "shop":
      break;
  }
}








const displaySlot = (slotMessage) => {
  slotMessage = screenMessages[slotMessage];
  const line1 = slotMachine[0].join(" ")
  const line2 = slotMachine[1].join(" ")
  const line3 = slotMachine[2].join(" ")
  console.log(`
⇅⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆
⇅                  ⇅
⇅  ${line1}  ⇅
⇅  ${line2}  ⇅
⇅  ${line3}  ⇅
⇅                  ⇅
⇅⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆
⇅       SPIN       ⇅  
⇅⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇆ ⇅   Money: $100
${slotMessage}`)
}


console.clear();
slotMachineHome();