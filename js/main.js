
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

	displayPlayer(players[game.currentPlayerIndex]);
}

function displayPlayer(player) {
	// Player
	$("#playerName").html(player.name);
	$("#playerMoney").html(player.money);
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

	showMarket();
	updateView();
}

function showMarket() {
	// Show the station cards
	$("#marketSection").show();

	// Display Current Market Cards
	var stations = stationMarket.currentMarket;
	var html = "";
	for (var i = 0; i < stations.length; i++) {
		html += generateStationCardHTML(stations[i]);
	}
	$("#currentMarket").html(html);

	// Display Future Market Cards
	stations = stationMarket.futureMarket;
	html = "";
	for (var i = 0; i < stations.length; i++) {
		html += generateStationCardHTML(stations[i]);
	}
	$("#futureMarket").html(html);
}

// Create HTML for Station
function generateStationCardHTML(station) {
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
	var html = generateStationCardHTML(chosenStation);

	$("#marketSection").hide();

	// Create Auction Section
	createAuctionSectionHTML(chosenStation);
	$("#auctionSection").show();

	currentAuction = new Auction(chosenStation, players, players[0]);
}

function createAuctionSectionHTML(station) {
	var html = generateStationCardHTML(station);
	var price = station.price;
	var bidHTML = "\
		<div class='col-sm-6 col-md-8'> \
			<h4 style='text-align: center;'>Current Bid</h4> \
			<h3 style='text-align: center' id='latestBidAmount'>" + price + "</h3> \
			<h4 style='text-align: center; font-style: italic;' id='bidderName'>(N/A)</h4> \
			<form class='form'> \
				<div class='form-group'> \
				<label for='bidAmount'>Your Bid Amount</label> \
				<input type='number' class='form-control' id='bidAmount' min=" + price + " value=" + price + "> \
				</div> \
				<div class='row'> \
					<div class='col-xs-6'> \
						<button class='btn btn-success' type='button' onclick='placeBid()' style='width:100%;'>Confirm</button> \
					</div> \
					<div class='col-xs-6'> \
						<button class='btn btn-danger' type='button' onclick='passBid()' style='width:100%;'>Pass</button> \
					</div> \
				</div> \
			</form> \
		</div> \
	";

	$("#auctionStationCard").html(html+bidHTML);
}


function placeBid() {
	var amount = parseInt($("#bidAmount").val());
	currentAuction.bid(amount);


	$("#latestBidAmount").html(currentAuction.latestBid);
	$("#bidAmount").val(currentAuction.latestBid+1);
	$("#bidAmount").attr('min', currentAuction.latestBid+1);
	$("#bidderName").html(currentAuction.bidder.name);
	updateView();
	displayPlayer(currentAuction.players[currentAuction.currentBidderIndex]);
}

function passBid()
 {

	currentAuction.pass();
	updateView();
	displayPlayer(currentAuction.players[currentAuction.currentBidderIndex]);

	if (currentAuction.players.length == 1) {
		console.log("AUCTION WON");
		
		// remove from current market
		stationMarket.removeStationFromCurrentMarket(currentAuction.station);

		// Add station to player
		var playerID = currentAuction.players[0].id;
		players[playerID].addStation(currentAuction.station);
		players[playerID].money -= currentAuction.latestBid; // TO BE MODIFIED TO PLACE INCREMENT AS PART OF FUNCTION

		$("#auctionSection").hide();
		showMarket();
	}
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