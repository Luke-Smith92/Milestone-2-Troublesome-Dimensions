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

## Testing Procedures

To assess the functionality, usability, and responsiveness of the web application, a combination of both manual and automated testing methods was used.

### Manual Testing

Manual testing was carried out throughout development to ensure that all features worked as expected from a user perspective.

This included:
- Navigating between all pages (Home, Select, Battle, Store, Login/404)
- Selecting cards and initiating battles
- Testing attack functionality and HP reduction
- Verifying win/loss conditions and coin rewards
- Checking that buttons and navigation links respond correctly
- Ensuring layouts remain usable across different screen sizes

Manual testing was essential for identifying real user experience issues such as layout problems, button responsiveness, and gameplay flow.

---

### Automated Testing

Automated testing tools were used to evaluate code quality and performance.

These included:
- Browser Developer Tools (Chrome DevTools)
- Lighthouse performance testing
- HTML and CSS validation tools

These tools helped identify:
- Performance improvements
- Accessibility considerations
- Code structure issues
- Responsive layout behaviour

---

### Why Both Methods Were Used

A combination of manual and automated testing was chosen because each method serves a different purpose.

- Manual testing focuses on real user interaction and usability
- Automated testing focuses on performance, code quality, and technical validation

Using only manual testing would not highlight performance or code issues, while relying solely on automated tools would not fully test the user experience.

By combining both approaches, the application was tested thoroughly to ensure it is functional, user-friendly, and performs well across different devices.
---
## HTML Validation

HTML code was tested using the W3C Markup Validation Service.

The results showed no critical errors. A small number of informational messages and warnings were identified, including:

- Use of trailing slashes on void elements (e.g. `<meta />`)
- Redundant role attribute on the `<footer>` element

These issues do not affect functionality but were reviewed and adjusted to follow best practices.

### JavaScript Validation

During development, JavaScript was checked using built-in linters within the development environment.

A number of warnings were identified:

- Use of modern ES6 syntax such as `const` and `let`
- Decimal formatting warnings (e.g. `.95` instead of `0.95`)

These warnings do not affect functionality, as modern browsers fully support ES6 syntax.  
Decimal formatting was noted as a stylistic recommendation rather than a functional issue.

Where appropriate, values were updated to improve readability and follow best practices.

## Bugs and Fixes

### Battle System Lock Issue

**Issue/Cause:**  
After implementing the coin reward system, the battle controls stopped responding once a match ended. The user was unable to continue interacting with the game.
The battle state was controlled using a `locked` flag:

**Issue/Cause:**  
### Bug: Battle Page Image Sizing
- Images appeared too large and were partially cut off during battles
- Issue caused by incorrect CSS selector not matching dynamically generated elements
- Resolved by targeting `#battle .card img`
- Updated styling to use `object-fit: contain` for proper scaling
- Images now display consistently across all battle cards




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