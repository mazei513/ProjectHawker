
var n = 4;
var players = [];
for (var i = 0; i < n; i++) {
	var playerName = "Player " + (i+1).toString();
	var newPlayer = new Player(playerName, i);
	players.push(newPlayer);
}

// Game of 4 Players
var game = new Game(n, players);

// Create StationMarket
var stationMarket = new StationMarket();
/****************************************************************/
// Functions for game

// Populate HTML
function initView() {
	$("#nPlayers").html(game.players.length);
	updateView();

	$("#marketSection").hide();
	$("#auctionSection").hide();
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
	var tmpPlayer = players[game.currentPlayerIndex];
	$("#playerName").html(tmpPlayer.name);
	$("#playerMoney").html(tmpPlayer.money);
}

// 'State Machine'
function startGame() {
	$("#startGameButton").hide();

	// Determine Turn Order
	if (game.round == 0) {
		game.nextStep();
	}
	else {
		players = game.sort(players);
	}

	// Show the station cards
	$("#marketSection").show();

	// Display Current Market Cards
	var stations = stationMarket.currentMarket;
	var html = "";
	for (var i = 0; i < stations.length; i++) {
		console.log(stations[i]);
		html += generateHTML(stations[i]);
	}
	$("#currentMarket").html(html);

	// Display Future Market Cards
	stations = stationMarket.futureMarket;
	html = "";
	for (var i = 0; i < stations.length; i++) {
		console.log(stations[i]);
		html += generateHTML(stations[i]);
	}
	$("#futureMarket").html(html);

	updateView();
}

// Create HTML for Station
function generateHTML(station) {
	var stationPriceBadgeHTML = "<h4 class='stationPriceBadge'>" + station.price.toString() + "</h4>";
	var resourcesHTML = "<p id='stationUpkeep'>Resources Needed : " +station.upkeepResource + " x" + station.upkeepCost.toString() + "</p>"
	var productionHTML = "<p id='stationProduction'>Production : " +station.production.toString() + "</p>"

	var html = " \
		<div class='col-sm-6 col-md-3'>\
			<div class='thumbnail'>\
	"
	+ stationPriceBadgeHTML +
	"\
				<img style='width: 100%; height: 200px; padding-left: 10px; padding-right: 10px;'>\
				<div class='caption'>\
	"
	+ resourcesHTML + productionHTML +
	"\
					<p>\
						<button class='btn btn-primary stationCardButton' onclick='startAuction(" + station.id.toString() + ")'>Choose</button>\
					</p>\
				</div>\
			</div>\
		</div>\
	";

	return html;
}

var currentAuction;
function startAuction(stationID) {
	var chosenStation = stationMarket.allStations[stationID];
	var html = generateHTML(chosenStation);

	$("#marketSection").hide();
	$("#auctionSection").show();

	currentAuction = new Auction(chosenStation, players, players[0]);
}

function placeBid() {
	var amount = parseInt($("#bidAmount").val());
	currentAuction.bid(amount);
	
	game.currentPlayerIndex = currentAuction.currentBidderIndex;// TO BE MODIFIED TO PLACE INCREMENT AS PART OF FUNCTION

	$("#latestBidAmount").html(currentAuction.latestBid);
	$("#bidAmount").val(currentAuction.latestBid+1);
	$("#bidAmount").attr('min', currentAuction.latestBid+1);
	$("#bidderName").html(currentAuction.bidder.name);
	updateView();
}

function passBid() {

}

// Disable submit form when enter pressed
$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});