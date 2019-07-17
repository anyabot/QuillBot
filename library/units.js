var units = {	
	"abel": {
		"name": "Abel",
		"gender": "Male",
		"rarity": "Gold",
		"class": "Dragon Rider",
		"aff": {
			"a1": "HP+324",
			"a2": "None",
			"a3": "Not implemented"
			},
		"skill": {
			"normal": {
				"stages": 1,
				"name": "Heat Breath",
				"effect": "For 30 seconds, attack increases by 1.5x. Attacks become ranged (250) and ignore defense.",
				"resue": 60,
				"initial": 40
				},
			"awakened": {
				"stages": 1,
				"name": "Explode Breath",
				"effect": "Attack increases by 1.6x. Releases a defense-ignoring fireball with a massive AoE.",
				"resue": 40,
				"initial": 26.7
				},
			},
		"ability": {
			"pre-aw ability": "No Ability",
			"aw ability": "Endurance Up : HP increases by 20%."
			}
		},
	"ada": {
		"name": "Ada",
		"gender": "Female",
		"rarity": "Platinum",
		"class": "Rouge",
		"aff": {
			"a1": "HP+432",
			"a2": "ATK+144",
			"a3": "PEV+24%"
			},
		"skill": {
			"normal": {
				"stages": 1,
				"name": "Cursed Bloodline",
				"effect": "For 30 seconds, attack, defense, and HP increase by 1.5x.",
				"resue": 60,
				"initial": 30
				},
			"awakened": {
				"stages": 1,
				"name": "Cursed Blood Awakening",
				"effect": "For 35 seconds, attack, defense, and HP increase by 1.5x + chance (10%) of causing instant death.",
				"resue": 80,
				"initial": 40
				}
			},
		"ability": {
			"pre-aw ability": "No Ability",
			"aw ability": "Endurance Up : HP increases by 20%."
			}
		},
	"adelaide": {
		"name": "Adelaide",
		"gender": "Female",
		"rarity": "Black",
		"class": "Grand Knight",
		"aff": {
			"a1": "HP+900",
			"a2": "ATK+90",
			"a3": "DEF+90"
			},
		"skill": {
			"normal": {
				"stages": 1,
				"name": "Guard Reversal",
				"effect": "For 20 seconds, HP and defense increase by 1.8x. Allied ranged units gain 1.3x increased attack. Counterattacks block enemies for 50% of their ATK.",
				"resue": 30,
				"initial": 1
				},
			"awakened": {
				"stages": 1,
				"name": "Offense and Defense Reversal Command",
				"effect": "For 15 seconds, HP and attack increase by 1.8x. Attacks become ranged (260). Enemies within range have 90% reduced defense and MR.",
				"resue": 40,
				"initial": 5
				}
			},
		"ability": {
			"pre-aw ability": "Vanguard Firing Command I : Damage received from all enemies is reduced by 10%. While on the active team, all allied Ranged units gain Range +5.",
			"aw ability": "Vanguard Firing Command II : Damage received from all enemies is reduced by 20%. While on the active team, all allied Ranged units gain Range +10."
			}
		},
 }  
 exports.units = units
