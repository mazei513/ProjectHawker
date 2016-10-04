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