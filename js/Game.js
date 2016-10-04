/***********************************/
// Game
function Game(n) {
	this.round = 0;
	this.step = 0;
	this.phase = 1;
	this.maxCities = 0;
	this.nPlayers = n;
	this.currentPlayer = 0;
}

Game.prototype.newRound = function() {
	this.round++;
}
Game.prototype.newStep = function() {
	this.step++;
	this.step %= 5;
}

Game.prototype.updateMaxCities = function(players) {
	//((Incomplete))
	this.maxCities += 1;
}
/***********************************/
// Player ((Incomplete))
function Player(name) {
	this.name = name;
	this.money = 50;
}
/***********************************/

// Custom array copy function needed due to having array of objects
function arrayCopy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}

// Station object
function Station(price, upkeepResource, upkeepCost, production) {
	this.price = price;
	this.upkeepResource = upkeepResource;
	this.upkeepCost = upkeepCost;
	this.production = production;
}

// Global StationMarket List
// Placeholder example stations entered in list
var StationMarketList = [new Station(3, 'Noodle', 2, 1), new Station(4, 'Rice', 2, 1)];

// StationMarket class
class StationMarket {
	constructor() {
		this.StationDeck = arrayCopy(StationMarketList);
	}
	
	restartDeck() {
		this.StationDeck = arrayCopy(StationMarketList);
	}
	
	drawCard() {
		var card = Math.floor(Math.random(this.StationDeck.length));
		return this.StationDeck.splice(card, 1);
	}
	
	deckCount() {
		return this.StationDeck.length;
	}
}