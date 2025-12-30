# DECONSTRUCTION

A 2-8 player Monopoly-styled board game where you are pastors building brand new churches. Walk around the board collecting pieces to construct your church building. Build your church to the grandest size before the rapture ends the game!

## Card Generator

This web application provides a digital card generator for the DECONSTRUCTION board game, allowing players to draw Spirit Cards and Choice Cards during gameplay.

### Features

- **Draw Cards**: Pull random Spirit Cards or Choice Cards from the deck
- **Expansion Packs**: Support for base game and expansion packs (Divine Intervention, COVID, etc.)
- **Card History**: Track recently drawn cards
- **Fame Cards Reference**: Quick reference for all Fame Card abilities
- **Admin Panel**: PIN-protected backend (9743) to manage cards and expansion packs

### How to Use

1. Open `index.html` in a web browser
2. Click "Draw Cards" to access the card drawing interface
3. Toggle which expansion packs you want to include
4. Click "Spirit Card" or "Choice Card" to draw a random card
5. For Choice Cards, click on your chosen option to highlight it

### Admin Access

Enter PIN **9743** to access the admin panel where you can:
- Add, edit, and delete Spirit Cards
- Add, edit, and delete Choice Cards
- Add, edit, and delete Fame Cards
- Create and manage Expansion Packs

---

## Game Rules

### Starting the Game
- All players start on 'Sunday Service'
- Whoever is the most Christian starts the game, rotate clockwise
- Players roll and walk their characters around the circular grid

### Collecting Tokens
Land on a regular recruit space to collect one of the 5 member tokens. Each member token belongs to a different group/colour and gives different points:

| Token Type | Points |
|------------|--------|
| Elder | 5 |
| Grandparents | 4 |
| Family | 3 |
| Staff | 2 |
| Young Person | 1 |

### Building Your Church
- Once you have 10 points from the **same colour**, cash them in to buy a church piece
- This means you only need 2 Elder tokens to buy, but you need 10 Young Persons
- Church pieces lock together - build your church up in any way you like!

### Satan's Movement
- If you roll a 6, Satan gets to move one space on the board
- Satan works like the robber in Settlers of Catan
- If you land on Satan's square, you cannot collect your token or card
- This can work in your favour, preventing bad Spirit or Choice cards!

### Endurance Meter
Each player has a gauge measuring mental and emotional health:
- **0 Endurance**: Cannot cash in any tokens, wait until endurance returns
- **1-3 Endurance**: Play as normal
- **4 Endurance**: Get double the church pieces when buying!

### Board Squares
- 22 Recruit squares
- 6 Spirit squares
- 8 Choice squares

### Spirit Cards
Land on a Spirit square to draw from the Spirit pile. These cards can:
- Force you to collect a Complaint card
- Gain or lose endurance
- Start rumors about other congregations
- Various other effects!

### Choice Cards
Land on a Choice square to draw a Choice card. These present situations requiring hard decisions with different consequences.

### Complaint Cards
- Prevent you from collecting member tokens
- Remove all complaint cards before collecting tokens again
- Clear by removing church pieces OR passing Sunday Service (apologize to the crowd!)

### Fame Cards
- Increase ability to collect more member tokens faster
- When you roll the dice number on your Fame card, gain extra tokens
- Can be lost as quickly as gained!

### Game End
- The game ends when Satan has moved around the entire board (the Rapture!)
- Deconstruct your church and count the pieces
- **Winner**: Most church pieces wins!

### Characters
Each character is a unique denomination with a unique ability usable once during the game.

---

## Expansion Packs

### Divine Intervention
Situations caused by divine intervention

### COVID
Pandemic-related situations to navigate as a church leader

---

## Technical Details

This is a client-side web application using:
- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage for data persistence

No server or build process required - just open `index.html` in a browser!
