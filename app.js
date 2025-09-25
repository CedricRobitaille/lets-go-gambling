/**
 * Overview of the game state / flow
 * ==================================================================================================
 * 
 * 1. Game Start Screen
 * Start [y/n]
 * 
 * Main Screen
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

const inventory = {
  money: 0,
  luck: 1,
  abilities: [],
}

const abilities = {
  luckUp: function() {

  },
}





/**
 A function to synchronously timeout the program. Used for adding delays to actions.
 * @param {number} delay - Length of delay in ms (1000th of a second)
 */
const sleep = function (delay) {
  const start = Date.now();
  while (Date.now() - start < delay) {
    // Busy-wait: blocks everything
  }
}


//
const spinWheel = (quantity) => {
  const spin = () => {
    console.clear()
    console.log("\n\nKACHUNK")
    sleep(2000);
    console.clear()
    
    console.log(slotMachine)
  }

  let input;
  for (let i = 0; i < quantity; i++) {
    console.log("Spin again?")
    input = prompt("> ")
    if (input === "Y") {
      spin();
    }
  }

}






spinWheel(3);

