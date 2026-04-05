# Milestone-2-Troublesome-Dimensions

![Am I Responsive](assets/images/screenshots/am-i-responsive.png)

---

## Project Overview

**Troublesome Dimensions** is an interactive browser-based fantasy card battle game. Players enter a fractured multiverse where dimensional rifts have unleashed creatures and heroes from different realms.

The user selects a hero card and battles against an opponent using a simple turn-based combat system. Each card has unique attacks and health values, creating variation in gameplay.

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

### Homepage

![Home Page](assets/images/screenshots/home-page.png)

- Lore-based introduction to the game  
- Clear call-to-action portal  
- Breaking News panel for immersion  

---

### Card Selection

![Card Selection](assets/images/screenshots/card-selection.png)

- Displays available hero cards  
- Locked/unlocked system  
- Easy selection to start battle  

---

### Battle System

![Battle Screen](assets/images/screenshots/battle-screen.png)

- Turn-based combat  
- Attack buttons with damage values  
- HP bar system for both player and opponent  

---

### Store

![Store](assets/images/screenshots/store.png)

- Purchase card packs using coins  
- Unlock new characters  

---

### 404 / Login Page

![404 Page](assets/images/screenshots/login-404page.png)

- Custom themed 404 page  
- Keeps design consistent with the game  

---

## Wireframes

Wireframes were not formally created for this project.  

Instead, the layout and structure were designed directly in the browser using an iterative development approach. This allowed for continuous visual adjustments and improvements based on testing and usability.

However, the design followed a clear structure:

- Left panel: Game lore / introduction  
- Center: Main portal interaction (call-to-action)  
- Right panel: News / additional content  
- Separate views for:
  - Card selection  
  - Battle screen  
  - Store  

Future development would include creating low-fidelity wireframes during the planning phase to better visualise layout and user flow before implementation.

---

## Gameplay Instructions

1. Click the **Enter portal** button on the homepage  
2. Select a hero card from your available cards  
3. Begin the battle against the opponent  
4. Click attack buttons to deal damage  
5. Monitor health bars for both characters  
6. Win by reducing the opponent's HP to zero  
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

To assess functionality, usability, and responsiveness, both manual and automated testing methods were used.

### Manual Testing

![Mobile View](assets/images/screenshots/mobile-screen.png)

- Navigation between all views  
- Card selection and battle flow  
- Attack functionality and HP updates  
- Win/loss conditions and coin rewards  
- Button responsiveness  
- Mobile and tablet layout testing  

---

### Automated Testing

- Chrome DevTools  
- Lighthouse  
- HTML Validator  
- CSS Validator  

---

## HTML Validation

![HTML Validation](assets/images/screenshots/html-check.png)

- No critical errors  
- Minor warnings reviewed and corrected where appropriate  

---

## CSS Validation

![CSS Validation](assets/images/screenshots/css-check.png)

- No critical errors found  
- Minor warnings related to modern CSS features  

---

## JavaScript Validation

![JS Validation](assets/images/screenshots/js-validation.png)

JavaScript code was tested using **JSHint** to identify potential issues and improve code quality.

The results showed:

- No critical errors affecting functionality  
- Warnings related to ES6 syntax (supported by modern browsers)  
- Suggestions for decimal formatting (e.g. using 0.95 instead of .95)  
- Minor compatibility notes for older JavaScript versions  

These warnings do not impact the functionality of the application and were reviewed during development.

---

## Performance Testing

### Responsive Testing

![Desktop View](assets/images/screenshots/pc-screen.png)

- Layout tested across multiple screen sizes  
- Mobile, tablet, and desktop compatibility confirmed  
- No major layout breaks identified during testing  

---

### Mobile Performance

![Mobile Performance](assets/images/screenshots/mobile-performance.png)

---

### Desktop Performance

![Desktop Performance](assets/images/screenshots/pc-performance.png)

---

### Results

- Performance: 99 (Mobile) / 100 (Desktop)  
- Accessibility: 100  
- Best Practices: 100  
- SEO: 90  

The results demonstrate that the application is highly optimised, loads quickly, and performs consistently across both mobile and desktop devices.

---

## Bugs and Fixes

### Battle Image Sizing Issue

![Battle Screen Fix](assets/images/screenshots/battle-screen.png)

- Images appeared too large and were cut off  
- Issue caused by incorrect CSS selector  
- Fixed using `#battle .card img`  
- Applied `object-fit: contain`  

---
## Future Improvements

There are several areas where this project could be expanded and enhanced in the future:

### Gameplay Enhancements

- Introduce a wider variety of hero cards with unique abilities, strengths, and weaknesses  
- Add special abilities or status effects (e.g. poison, stun, healing) to increase strategy  
- Implement a progression system where players can level up cards or unlock new content  

---

### Visual and Design Improvements

- Upgrade card visuals from static 2D images to more immersive designs, such as animated or 3D-style elements  
- Add visual effects during battles (e.g. attack animations, transitions, particle effects)  
- Improve UI polish with smoother transitions and enhanced feedback for user actions  

---

### World Building and Lore

- Expand the storyline of the multiverse with deeper lore and background for each faction or character  
- Introduce a campaign or story mode to give players a sense of progression and purpose  
- Add dynamic "Breaking News" updates tied to gameplay events  

---

### Technical Improvements

- Implement a full user authentication system (login/register)  
- Store user progress using a database instead of LocalStorage  
- Improve code structure by modularising JavaScript into separate files  

---

### Feature Expansion

- Add multiplayer functionality (player vs player battles)  
- Expand the store system with more packs, upgrades, and items  
- Introduce achievements or rewards to increase replayability  

---

These improvements would enhance both the user experience and the overall depth of the application, transforming it from a simple browser-based game into a more complete and engaging product.

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

- Images sourced from Pixabay and other free-use platforms  


### Acknowledgements

- Assistance and guidance provided through various learning resources  
- Code Institute course materials and Discord community support  
- Online research using Google  
- AI tools used to support debugging, problem-solving, and code explanations  