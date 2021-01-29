addLayer("h", {
    name: "heat", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CC0000",
    resource: "heat", // Name of prestige currency
    //baseAmount() {return getBuyableAmount(this.layer, 11)}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    /*gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = player[this.layer].points
        return mult
    },*/
    row: 0, // Row the layer is in on the tree (0 is the first row)
    /*hotkeys: [
        {key: "h", description: "H: Reset for Heat", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],*/
    buyables: {
        rows: 3,
        cols: 2,
        11: {
            cost(x) { return new Decimal(0) },
            display() { if(getBuyableAmount(this.layer, 21).gte(20)) return "Gain 1 Heat" 
            else return "Use Sources Below to gain heat" },
            canAfford() { return getBuyableAmount(this.layer, 21).gte(20) },
            buy() {
                player[this.layer].points = player[this.layer].points.add(1)
                setBuyableAmount(this.layer, 21, new Decimal(0))
            }
        },
        21: {
            cost(x) { return new Decimal(0) },
            display() { if(player[this.layer].points.gte(3)) return "MAXED\r\nDon't ruin your fingers now" 
                            else return "Rub hands together\r\nFriction: " + getBuyableAmount(this.layer, this.id) + "/20" },
            canAfford() { return player[this.layer].points.lt(3) && getBuyableAmount(this.layer, this.id).lt(20) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            }
        },
        31: {
            cost(x) { return new Decimal(0) },
            display() { return "DEBUG: EAT ICE" },
            canAfford() { return true },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(1)
            }
        },
        32: {
            cost(x) { return new Decimal(0) },
            display() { return "DEBUG: EAT COAL" },
            canAfford() { return true },
            buy() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        }
    },
    prestigeButtonText() { if(getBuyableAmount(this.layer, 11).gte(20)) return "Gain 1 Heat" 
                            else return "Use Sources Below to gain heat" },
    getResetGain() { return new Decimal(1)}, //Will be more when other systems are implimented
    getNextAt() { return new Decimal(20)},
    canReset() { return getBuyableAmount(this.layer, 11).gte(20) },
    onPrestige() {  },
    prestigeNotify() { return true },

    tabFormat: [
        "main-display",
        ["display-text", () => "Without Heat you will be unable to do anything else"],
        //"prestige-button",
        ["buyable", 11],
        ["buyable", 21],
        ["row", [["buyable", 31],["buyable", 32]]]
    ],
    layerShown(){return true},
})
