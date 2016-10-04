#Project Hawker (v0.1)
This project will be run on Google App Engine for Python. It will not be needed for v1.0.

The game can be tested by just downloading `index.html`, `main.js` and `Game.js`. Refer to the Running Barebones section.

PS: Feel free to correct/commit any changes you think should be in this project. Use the ISSUES section of this GitHub to raise any issues you encounter or any questions you would like answered. Also for any section you are contributing, it is highly recommended to add a couple of lines of comments describing what that function/code is designed to do, either in the file itself or in WIKI section of this GitHub.

##Running with Google App Engine
1. Download the Google App Engine GUI
2. Add this project to Google App Engine using the GUI.
3. Click on the project in the GUI and click on the RUN button to run the project. This will create a local instance of the server.
4. Click on the BROWSE button to open the webpage.

##Running Barebones
1. Put `index.html`, `main.js` and `Game.js` in one folder. 
2. Open `index.html` using a text editor.
3. Modify the line 
```
		<script type="text/javascript" src="/js/Game.js"></script>
		<script type="text/javascript" src="/js/main.js"></script>
``` 
to 
```
		<script type="text/javascript" src="Game.js"></script>
		<script type="text/javascript" src="main.js"></script>
```
4. Open `index.html`, which should open in your default browser.
5. Everytime `index.html` reloads, `main.js` will run.
6. You can print to the console using `console.log(input)`, where input is the variable you would like to print. Any outputs to the console will be displayed in the console, Google to find out how to open the console on your chosen browser.

##File Structure
`Game.js` holds all the classes and objects to be created in this project. `main.js` would be the main file holding the Javascript that is the implementation on the functionality of this project.

## General Practices
- Design the class where when a variable of the class is to be modified, modify it using a function.

Example
				
				function Bank() {
					this.cash = 0;
				}
				Bank.prototype.deposit = function(amount) {
					this.cash += amount;
				}
Usage

				var myBank = new Bank();
				myBank.deposit(1000);

## High Level Design
1. Create Game
2. Create Players
3. while loop with state machine inside (exit condition -> when max number of cities >= 17)
4. Calculate Player/Players with highest number of powered cities
5. if more than one player, calculate money

##State Machine
###Step 1. Determine turn order
- if round zero, random order
- else, most cities, most ex station

###Step 2. Auction stations
- create list of players to bid
- for loop through number of players
    - create var to hold list of players to bid (tmp)
    - while tmp is not empty
        - if current player pass
            - remove that player from tmp
        - else
            - if current player bid > current bid
                - current bid = current player bid
        - increment to next player in tmp

###Step 3. buy resources
- reverse turn order, (tmp2)
- for loop through tmp2
    - while player not pass
        - current player buys resource chosen (add a condition whether player has enough money to buy)

###Step 4. setup cities (buying house)
- for loop through tmp2
    - while player not pass
        - current player buys tier in city
      
Conditions  

1. whether tier in city is occupied
2. whether player has enough money to buy

###Step 5. Payday
- for loop through turn order
    - count number of powered cities of current player (using output of stations, min(output of stations, number of cities))
    - input into function that returns cash to be earned from number of cities
    - add to player’s money variable

##Classes
###1. Game
#### Variables
    1. Round Number
    2. Step Number
    3. Phase Number
    4. Highest Number of Cities
    5. Number of Players
    5. Current Player
#### Functions

###2. Player
#### Variables
    1. Name
    2. Money
    3. Stations owned
    4. Resources
    5. Cities
    6. OutputQuantity
#### Functions

###3. Station
#### Variables
    1. Price
    2. Input (Resource, Quantity)
    3. Output (OutputQuantity)
#### Functions

###4. StationMarket
#### Variables
    1. Array of Stations
#### Functions

###5. Resource
#### Variables
    1. Name
    2. Price
#### Functions

###6. ResourceMarket
#### Variables
    1. Type (Resource)
    2. Quantity
#### Functions

###7. Cities
#### Variables
    1. Array of Tiers and Occupant
        - ie: Tier 1 = Player1
    2. Neighbours (Array of Cities and Setup Cost)
        - ie: [[SS15, 10], [PJ, 5]]

README v1.0