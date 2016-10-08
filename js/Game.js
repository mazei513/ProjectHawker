/***********************************/
// Game
function Game(n, players) {
	this.round = 0;
	this.step = 0;
	this.phase = 1;
	
	this.maxCities = 0;
	
	this.currentPlayerIndex = 0;
	this.players = arrayCopy(players);
}

Game.prototype.newRound = function() {
	this.round++;
}

Game.prototype.nextStep = function() {
	this.step++;
	this.step %= 5;
}

Game.prototype.setPhase = function(phase) {
	this.phase = phase;
}

Game.prototype.sortPlayers = function(players) {
	return players.sort(function(a,b) {
		return parseFloat(b.cities.length) - parseFloat(a.cities.length);
	});
}

// Game.prototype.startAuction = function() {
// 	// ((Incomplete))
// }

// Game.prototype.endAuction = function() {
// 	// ((Incomplete))
// }

Game.prototype.updateMaxCities = function(players) {
	//((Incomplete))
}

/***********************************/
// Player ((Incomplete))
function Player(name, id) {
	this.name = name;
	this.money = 50;
	this.id = id;
	this.cities = [];
	this.stations = [];
}

Player.prototype.addStation = function(station) {
	this.stations.push(station)
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
	this.station =  station;
	this.players = arrayCopy(players);
	this.latestBid = 0;
	this.bidderIndex = -1;
	this.bidder = new Player()
	this.masterBidder = masterBidder;
	this.currentBidderIndex = 0;
}

Auction.prototype.bid = function(amount) {
	if (amount > this.latestBid) {
		this.latestBid = amount;
		this.bidderIndex = this.currentBidderIndex;
		this.bidder = this.players[this.currentBidderIndex];
		this.currentBidderIndex++;
		this.currentBidderIndex %= this.players.length;
	}
}

Auction.prototype.pass = function() {
	var index = this.currentBidderIndex;
	if (index > -1) {
		this.players.splice(index, 1);
		this.currentBidderIndex %= this.players.length;
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
	this.id = stationIdCounter++;
}

// Global StationMarket List
// Placeholder example stations entered in list
var stationIdCounter = 0;
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
		this.allStations = arrayCopy(StationMarketList);
		this.StationDeck = arrayCopy(StationMarketList);
		this.currentMarket = this.StationDeck.splice(0, 4);
		this.futureMarket = this.StationDeck.splice(0, 4);
		this.p3Market = [];
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
	
	stationDeckCount() {
		return this.StationDeck.length;
	}
	
	p3MarketDeckCount() {
		return this.p3Market.length;
	}
	
		// function to transition the market from phase 2 to phase 3
		this.currentMarket = this.currentMarket.concat(this.futureMarket);
		this.futureMarket = [];
		
		while(this.currentMarket.length > 6) {
			this.currentMarket.pop();
		}
		
		Game.setPhase(3);
	}
	
	marketCheck(Game) {
		if(Game.phase == 1 || Game.phase == 2) {
			if(this.currentMarket.length < 4 || this.futureMarket.length < 4) {
				var tempMarketArray = this.currentMarket.concat(this.futureMarket);
				while(tempMarketArray.length < 8) {
					if(this.deckCount() > 0) {
						tempMarketArray = tempMarketArray.concat(this.drawCard());
					}
					else {
						// Move into phase 3
						this.p2p3Transition();
						return;
					}
				}
				
				tempMarketArray.sort(function(a,b) {
					return parseFloat(a.price) - parseFloat(b.price);
				});
				
				this.currentMarket = tempMarketArray.splice(0,4);
				this.futureMarket = tempMarketArray.splice(0,4);
				console.log(this.currentMarket);
				console.log(this.futureMarket);
			}
		}
		else if(Game.phase == 3) {
			// phase 3 market check go here
			if(this.currentMarket.length < 6) {
				while(this.currentMarket.length < 6) {
					if(p3MarketDeckCount() > 0) {
						this.currentMarket = this.currentMarket.concat(this.drawCard());
					}
					else {
						// do nothing or exit out of this function
						return;
					}
				}
				
				this.currentMarket.sort(function(a,b) {
					return parseFloat(a.price) - parseFloat(b.price);
				});
				
				console.log(this.currentMarket);
			}
		}
	}
	
	add2P3Market() {
		this.p3Market.push(this.futureMarket[this.futureMarket.length-1]);
		this.futureMarket.pop();
		this.marketCheck();
		console.log(this.futureMarket);
		console.log(this.p3Market);
	}

	removeStationFromCurrentMarket(station) {
		var result = this.currentMarket.filter(function( obj ) {
			return obj.id == station.id;
		});

		console.log(result[0]);


		var index = this.currentMarket.indexOf(result[0])
		console.log(index);
		if (index > -1) {
			this.currentMarket.splice(index, 1);
		}
		
		this.marketCheck();
	}

}