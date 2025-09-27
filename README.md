# Scary Forest III
*A terminal-based choose-your-own-adventure game built with node.js and prompt-sync.*



## Overview
**Scary Forest III** is a text-based choose-your-own-adventure game that runs in the terminal. The player’s goal is to defeat three monstrous beasts to cure the dying Father Tree.

The adventure begins with a daring escape from a monster, followed by a river ride, branching paths, and epic boss battles. Along the way, the player encounters **Quick-Time Events** and branching storylines that respond to their choices.

**The game combines:**
- Branching Storylines based on the player class and decisions
- Quick-Time Events implemented within a synchronous environment
- Player progression mechanics like stats, inventory, and combat

<br/>

## Technical Challenges
This project is powered by Node.js using the prompt-sync package for synchronous input. Because `prompt-sync` blocks the event loop, traditional asynchronous solutions like `setTimeout` were not possible. Instead, we developed custom workarounds using `Date.now()` for time-based events.

<br/>

## Core Game Objects
We began by defining two main object types:
- Player Object holds
  - Health
  - Defense
  - Weapon Type
  - Inventory
  - Ingredients
- Monster Object holds for each boss
  - Health
  - Attack
  - Defense

This structure gives us a consistent system to handle combat and progression.

<br/>

## Branched Tutorial Paths
Players choose a class (e.g., Archer, Rogue), which determines their *tutorial route*.
Branching was implemented using simple conditional logic:

```js
if (class === "archer") { 
  // Run the Archer's Tutotial
}
if (class === "rogue") { 
  // Run the Rogue's Tutotial
}
```
This allowed up to set up unique story introductions while keeping logic modular.

<br/>

## Quick-Time Events
The greatest challenge faced was building a system for Quick-Time Events in a synchronous environment.

```js
function quicktime(event, action, time) {
  let start = Date.now();
  const userInput = prompt(`Press the letter "${action}" : `);
  if (userInput === action && (Date.now() - start < time * 1000)) {
    return true
  } else { 
    return false 
  }
}
```

**Our Solution:**
- Define a `quicktime()` function with:
  - Event Description (To provide the user with an explaination for the quick-time story)
  - Required Action (To define a user input to succeed the quick-time event)
  - Time Limit (Sets a timespan to accomplish the event. A great tool for increasing difficulty)
- On event start, record `Date.now()`
- When the user responds, calculate the time that elapsed `Date.now() - startTime`
- If elapsed > time limit -> fail. Otherwise -> succeed.
This bypasses the blocking nature of `prompt-sync` while still giving a sense of urgency!

<br/>

## Multi-Staged Quick-Time Event Chains
When players encounter multiple quick-time events, we needed a way to track concurrent successes/failures across a chain of events.

```js
let success = quickTime(`Quick! Grab your paddle`, `grab`, 6) // Returns true/false
if (success === true) { 

  success = quickTime(`Quick! Padding as hard as you can!`, `grab`, 6) // Returns true/false
  if (success === true) {
    // repeat
  }
}
```

**Our Approach:**
- Use a `success` flag
- Chain Quick-Time Events with `if (success)` conditions
- On failure, set `success = false` which skips the remaining checks
- At the end, apply penalities for failure, and rewards for success

<br/>

## Branching Story Functions
Throughout the story, the user is faced with branching stories. The challenge we faced was ensuring that all branches were attempted, regardless of their starting path.

```js
function bearFight() {
  // Fight Sequence
  player.bossCompletion.push("bear")        // Add bear to completion array
  if (player.bossCompletion[0] != "wolf") { // If wolf hasn't been beat
    wolfFight()                             // Fight the wolf.
  }
}
function wolfFight() {
  // Fight Sequence
  player.bossCompletion.push("wolf")        // Add wolf to completion array
  if (player.bossCompletion[0] != "bear") { // If bear hasn't been beat
    bearFight()                             // Fight the bear.
  }
}
```

**To manage branching paths:**
- Each path was wrapped inside a function
- After a path completes, we:
  1. Marked it as complete
  2. Checked if the other path is unfinished
  3. If yes, send the player to the other path
This makes sure that both paths were always experiences, regardless of their order.

<br/>

## Stat Integration
Initially, the **defense stat** wasn't considered.
So, instead of manually calculating reductions in every battle, we built a help function!

```js
function loseHealth(damage) {
    characterObjects.health -= damage / characterObjects.defense
    console.log(`Health is now ${characterObjects.health}`)
}
```
**Through this function, we were able to:**
- Pass damage amounts
- Reduce damage intake with defense
- Reflect final damage towards user's HP
This centralized the combat logic, and simplified further development.

<br/>

## Recursive Functions
When faced with a complex prompt system like in *the merchant* section, we had to incorporate a Recursive Function so that the user can loop through the prompt selection as many times as needed.

```js
function merchant() {
  const userInput = prompt('What would you like to buy?');
  if (userInput === "Armor") {
    // Give the user Armor
    merchant(); // Loop back through the merchant function so they can keep shopping.
  } else if (userInput === "Leave") {
    // By not calling the `merchant()` function, the user exits the recursive loop.
  } else {
    // A non-valid input was provided. Log an error, and prompt the user again
    merchant(); // Loop back through the merchant function so they can keep shopping.
  }
}
```
**This recursive function does the following:**
- Retrieves the user's input
- Based on their input...
  - **Valid Purchase** -> Gives user item, then restarts the function so they can keep shopping
  - **Leave Request** -> By not re-initiating the function, the user exits the recursive loop and continues on their journey
  - **Invalid Input** -> Informs user of bad-input, and re-issues a shop new prompt.

<br/>

## Fight Logic
For the final boss fight, we initiated a continuous fight cycle. This cycles leverages recursive functions, recursive functions within recursive functions, and complex conditional statements.
<br/>

##### Boss Loop
```js
function bossFight() {
  // Fight Information
  const userInput = prompt("What would you like to do?");
  if (userInput === "Attack") {
    // Code to Attack
  } else if (userInput === "Inventory") {
    checkInventory() // Starts a inner recursive loop for the inventory selection
  } else if (userInput === "Ranged Attack" && character.class === "Archer") {
    // Attack specific to archer
    bossFight() // Restarts boss loop
  } else {
    // No valid input provided
    bossFight() // Restarts boss loop
  }
}
```
This recursive loop checks for the user input. Depending on their input, they do one of the following actions:
1. Attack Cycle, then restarts the boss-fight loop
2. Enter the Inventory Loop, to select healing potions, and show items.
3. Class-Specific actions, then restarts the boss-fight loop
4. Catches invalid inputs, then restarts the boss-cycle loop
<br/>

##### Fight Loop
```js
function bossFight() {
  if (userInput === "Attack") {
    // Damage Boss
    if (boss.health > 0) { // Is boss still alive after the attack?
      // Boss attacks user
      if (user.health > 0) { // Is user still alive after being attacked?
        bossFight() // User restarts fight cycle - Recursive Loop
      } else { // User ran out of health
        loseSequence() // You lose
      }
    } else { // Boss ran out of health
      winSequence() // You win
    }
  }
}
```
The Fight loop does a few nice things for us.
1. Deals damage to the boss
2. Deals damage to the user
3. Checks if the boss is dead, then sends them to the win screen
4. Checks if the user is dead, then sends them to the lose screen
<br/>

##### Inventory Loop
```js
function bossFight() {
  if (userInput === "Inventory") {
    function checkInventory() {
      // Lists the items in the user's inventory, and outlines actions user can take.
      const newUserInput = prompt("What would you like to do?");
      if (newUserInput === "Use Potion" && user.inventory.positions > 0) { // User inputs "Use Potion, and there is a potion to consume.
        // User consumes Potion
        checkInventory() // Restarts the Inventory loop so they can keep selecting items.
      } else if (newUserInput === "Leave") {
        bossFight() // Exits the checkInventory loop, but continues the fight loop.
      } else { // Invalid User Input
        checkInventory() // Restarts the Inventory loop
      }
    }
    checkInventory() // Initiates the Inventory Recursive Loop
  }
}
```
Lastly, this lovely little recursive function accepts user inputs, and does the following:
1. Uses potion **if** there are enough potions to use
2. Checks for invalid inputs
3. Returns the user back to the fight sequence
<br/>
<br/>
---

> [!NOTE]
> This Project was developed by:
> [Cedric Robitaille](https://github.com/CedricRobitaille)
> [Felix Romero](https://github.com/FelixR77)
> [John Shear]()
