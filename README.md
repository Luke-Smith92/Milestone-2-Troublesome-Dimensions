# Milestone-2-Troublesome-Dimensions

![Am I Responsive](assets/images/am-i-responsive.png)

---

## Project Overview

**Troublesome Dimensions** is an interactive browser-based fantasy card battle game. Players enter a fractured multiverse where dimensional rifts have unleashed creatures and heroes from different realms.

The user selects a hero card and battles against an AI opponent using a simple turn-based combat system. Each card has unique attacks and health values, creating variation in gameplay.

This project focuses on building a strong front-end experience using **HTML, CSS, and JavaScript**, with clear structure, interactive gameplay, and responsive design.

---

## UX (User Experience)

### Target Audience

- Casual gamers  
- Fantasy and RPG fans  
- Users looking for quick browser-based gameplay  
- Beginner users who prefer simple mechanics  

---

### User Goals

- Understand the purpose of the site immediately  
- Enter the game easily from the homepage  
- Select a character and begin a battle  
- Receive clear feedback (win/lose outcome)  
- Try different cards and outcomes  

---

## User Stories

### First-Time User

- I want to understand what the game is about  
- I want clear instructions on how to start  
- I want an obvious way to enter the game  

### Returning User

- I want to try different hero cards  
- I want to improve my outcomes in battle  
- I want a quick and smooth experience  

### Frequent User

- I want more variety in gameplay  
- I want to unlock or collect additional cards  
- I want expanded features in future updates  

---

## Features

### Existing Features

- Homepage with lore explanation and clear call-to-action  
- Interactive portal entry system  
- Card selection screen  
- Turn-based battle system  
- Health (HP) bar mechanics  
- AI opponent logic  
- Coin system using local storage  
- Store system (basic functionality)  
- Breaking News panel for world-building and immersion  
- Responsive layout for different screen sizes  

---

### Future Features

- User login system  
- Save progress to a database  
- Multiplayer battles  
- Expanded card system with abilities/effects  
- Sound effects and animations  
- Improved store system with upgrades/items  

---

## Gameplay Instructions

1. Click the **Enter portal** button on the homepage  
2. Select a hero card from your available cards  
3. Begin the battle against the AI opponent  
4. Click attack buttons to deal damage  
5. Monitor health bars for both characters  
6. Win by reducing the AI's HP to zero  
7. Lose if your HP reaches zero  
8. Return and try again with different strategies  

---

## Technologies Used

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  
- LocalStorage (for saving coins and progression)  

---

## Testing

The project was tested throughout development to ensure functionality and usability.

### Functionality Testing

- Navigation between views works correctly  
- Portal button correctly loads the game  
- Card selection loads available cards  
- Battle system calculates damage correctly  
- AI responds correctly during battle  
- HP bars update dynamically  
- Store purchases update correctly  
- Coins persist using local storage  

---

## Bugs and Fixes

### Battle System Lock Issue

**Issue:**  
After implementing the coin reward system, the battle controls stopped responding once a match ended. The user was unable to continue interacting with the game.

**Cause:**  
The battle state was controlled using a `locked` flag:

```javascript
battle.locked = true;

### Responsive Testing

- Tested on different screen sizes  
- Layout adjusts correctly on smaller screens  
- Navigation remains usable on mobile devices  

---

## Performance

Performance was considered during development:

- Optimised image usage  
- Minimal external dependencies  
- Efficient DOM updates for gameplay  

---

## Deployment

This project is deployed using **GitHub Pages**.

Live site:  
https://luke-smith92.github.io/Troublesome-Dimensions/

---

## Credits

### Content

- Game concept and development by Luke Smith  

### Media

- Images sourced from **Pixabay** and other free-use platforms  

### Acknowledgements

- Assistance and guidance provided through AI support tools  