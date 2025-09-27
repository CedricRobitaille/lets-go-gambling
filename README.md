# Scary Forst III
*A terminal-based choose-your-own-adventure game built with node.js and prompt-sync.*

---

### Overview
**Scary Forest III** is a text-based choose-your-own-adventure game that runs in the terminal. The player’s goal is to defeat three monstrous beasts to cure the dying Father Tree.

The adventure begins with a daring escape from a monster, followed by a river ride, branching paths, and epic boss battles. Along the way, the player encounters **Quick-Time Events** and branching storylines that respond to their choices.

**The game combines:**
- Branching Storylines based on the player class and decisions
- Quick-Time Events implemented within a synchronous environment
- Player progression mechanics like stats, inventory, and combat

---

### Technical Challenges
This project is powered by Node.js using the prompt-sync package for synchronous input. Because `prompt-sync` blocks the event loop, traditional asynchronous solutions like `setTimeout` were not possible. Instead, we developed custom workarounds using `Date.now()` for time-based events.

---

### Development Process

### Core Game Objects
We began by defining two main object types:
1. Player Object
  - Holds health, defense, weapon type, inventory, and ingredients
2. Monster Object
  - Holds health, attack, and defense for each boss

This structure gives us a consistent system to handle combat and progression.

---

### Branched Tutorial Paths
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

---

### Quick-Time Events
The greatest challenge faced was building a system for Quick-Time Events in a synchronous environment.

**Our Solution:**
- Define a `quicktime()` function with:
  - Event Description (To provide the user with an explaination for the quick-time story)
  - Required Action (To define a user input to succeed the quick-time event)
  - Time Limit (Sets a timespan to accomplish the event. A great tool for increasing difficulty)
- On event start, record `Date.now()`
- When the user responds, calculate the time that elapsed `Date.now() - startTime`
- If elapsed > time limit -> fail. Otherwise -> succeed.
This bypasses the blocking nature of `prompt-sync` while still giving a sense of urgency!

---

### Multi-Staged Quick-Time Event Chains
When players encounter multiple quick-time events, we needed a way to track concurrent successes/failures across a chain of events.

**Our Approach:**
- Use a `success` flag
- Chain Quick-Time Events with `if (success)` conditions
- On failure, set `success = false` which skips the remaining checks
- At the end, apply penalities for failure, and rewards for success

---

### Branding Story Functions
Throughout the story, the user is faced with branching stories. The challenge we faced was ensuring that all branches were attempted, regardless of their starting path.

**To manage branching paths:**
- Each path was wrapped inside a function
- After a path completes, we:
  1. Marked it as complete
  2. Checked if the other path is unfinished
  3. If yes, send the player to the other path
This makes sure that both paths were always experiences, regardless of their order.

---

### Stat Integration
Initially, the **defense stat** wasn't considered.
So, instead of manually calculating reductions in every battle, we built a help function!

```js
function loseHealth(damage) {
    characterObjects.health -= damage / characterObjects.defense
    console.log(`Health is now ${characterObjects.health}`)
}
```
Through this function, we were able to:
- Pass damage amounts
- Reduce damage intake with defense
- Reflect final damage towards user's HP
This centralized the combat logic, and simplified further development.

---

