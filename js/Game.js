/***********************************/
// Game
function Game(n, players) {
	this.round = 0;
	this.step = 0;
	this.phase = 1;
	
	this.maxCities = 0;
	
	this.currentPlayer = 0;
	this.players = players;
}

Game.prototype.newRound = function() {
	this.round++;
}

Game.prototype.nextStep = function() {
	this.step++;
	this.step %= 5;
}

Game.prototype.sortPlayers = function(players) {
	return players.sort(function(a,b) {
		return parseFloat(b.cities.length) - parseFloat(a.cities.length);
	});
}

Game.prototype.startAuction = function() {
	// ((Incomplete))
}

Game.prototype.endAuction = function() {
	// ((Incomplete))
}

Game.prototype.updateMaxCities = function(players) {
	//((Incomplete))
	this.maxCities += 1;
}

/***********************************/
// Player ((Incomplete))
function Player(name, id) {
	this.name = name;
	this.money = 50;
	this.id = id;
	this.cities = [];
}

Player.prototype.addCity = function(city) {
	this.cities.push(city);
}

/***********************************/
// Cities ((Incomplete))
function City(name) {
	this.name = name;
}

/***********************************/
// Auction ((Incomplete))
function Auction(station, players, masterBidder) {
	// this.station =  station;
	this.players = players;
	this.latestBid = 0;
	this.bidder = new Player();
	this.masterBidder = masterBidder;
}

Auction.prototype.bid = function(bid, player) {
	if (bid > this.latestBid) {
		this.latestBid = bid;
		this.bidder = player;
	}
}

Auction.prototype.pass = function(player) {
	var index = this.players.indexOf(player);
	if (index > -1) {
		array.splice(index, 1);
	}
}

/***********************************/
// Custom array copy function needed due to having array of objects
function arrayCopy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? arrayCopy(v) : v;
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
var StationMarketList = [	new Station(3, 'Noodle', 2, 1),
							new Station(4, 'Rice', 2, 1),
							new Station(5, 'Chicken', 1, 1),
							new Station(6, 'Tofu', 4, 1),
							new Station(7, 'Rice', 4, 2),
							new Station(8, 'Chicken', 3, 2),
							new Station(9, 'Tofu', 3, 1),
							new Station(10, 'Noodle', 4, 2),
							new Station(11, 'Water', 0, 1)
							];

// StationMarket class
class StationMarket {
	constructor() {
		this.StationDeck = arrayCopy(StationMarketList);
		this.currentMarket = this.StationDeck.splice(0, 4);
		this.futureMarket = this.StationDeck.splice(0, 4);
	}
	
	// Resets the deck
	restartDeck() {
		this.StationDeck = [];
		this.currentMarket = [];
		this.futureMarket = [];
		this.StationDeck = arrayCopy(StationMarketList);
		this.currentMarket = this.StationDeck.splice(0, 4);
		this.futureMarket = this.StationDeck.splice(0, 4);
	}
	
	drawCard() {
		var card = Math.floor(Math.random()*this.StationDeck.length);
		return this.StationDeck.splice(card, 1);
	}
	
	deckCount() {
		return this.StationDeck.length;
	}
}