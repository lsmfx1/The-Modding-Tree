let modInfo = {
	name: "The Ice Pop Tree",
	id: "Lsmfx1IceGame",
	author: "Frost Endwood",
	pointsName: "warmth",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 6,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.03",
	name: "Grab some things",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.03</h3><br>
		- Added button resizing.<br>
		- Added animation of cooldown.<br>
		- Added timer of cooldown.<br>	
	<h3>v0.02</h3><br>
		- Added fridge layer.<br>
		- Added open fridge function.<br>
		- Added start of looting.<br>
	<h3>v0.01</h3><br>
		- Added heat layer.<br>
		- Added heat buyable.<br>
		- Added heat friction.<br>
		- TEMP Added heat DEBUG.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

//HeatHolderName which can be upgraded
var HeatHolderName = "Body"
var MaximumHeat = new Decimal(50)
var Cold = new Decimal(0.5)

// Determines if it should show points/sec
function canGenPoints(){
	return player.points.lt(MaximumHeat)
}

function rechargeThings(){
	var thing = setInterval(function(){ setBuyableAmount("f", "21", getBuyableAmount("f", "21").minus(1)) }, 5)
}

// Calculate points/sec!
function getPointGen() {
	var gain = new Decimal(1).mul(player["h"].points)
	var total = gain.sub(Cold)
	var postTotal = player.points.add(total)
	
	if(total.lt(0))
		return total
	if(postTotal.gte(MaximumHeat) || !canGenPoints())
		return MaximumHeat.sub(player.points)
	if(player.points.eq(MaximumHeat))
		return new Decimal(0)
	return total
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [ "Your " + HeatHolderName + " allows a maximum warmth of " + MaximumHeat
]



// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}