
var n = 4;
var players = [];
for (var i = 0; i < n; i++) {
	var playerName = "Player " + (i+1).toString();
	var newPlayer = new Player(playerName, i);
	players.push(newPlayer);
}

// Game of 4 Players
var game = new Game(n, players);

// Populate HTML
function initView() {
	$("#nPlayers").html(game.nPlayers);
	updateView();
}
function updateView() {
	// Game
	$("#round").html(game.round);
	
	var stepOutput = "";
	switch(game.step) {
		case 0:
			stepOutput = "1. Determine Turn Order";
			break;
		case 1:
			stepOutput = "2. Auction Stalls";
			break;
		case 2:
			stepOutput = "3. Buy Resources";
			break;
		case 3:
			stepOutput = "4. Setup Stalls in Cities";
			break;
		case 4:
			stepOutput = "5. Payday";
			break;
		default:
			break;
	}
	$("#step").html(stepOutput);
	
	$("#phase").html(game.phase);

	// Player
	var tmpPlayer = players[game.currentPlayer];
	$("#playerName").html(tmpPlayer.name);
	$("#playerMoney").html(tmpPlayer.money);
}

function next() {
	switch(game.step) {
		// Determine Turn Order
		case 0:
			if (game.round == 0) {
				game.nextStep();
			}
			else {
				players = game.sort(players);
			}
			break;
		// Auction Stalls
		case 1:
			// startAuction
			break;
		// Buy Resources
		case 2:
			break;
		// Setup Stalls in Cities
		case 3:
			break;
		// Payday
		case 4:
			break;
		default:
			break;
	}
	updateView();
}