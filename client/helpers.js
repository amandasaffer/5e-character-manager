UI.registerHelper('selected', function(key, value) {
  return key == value? {selected:'selected'}: '';
});

UI.registerHelper('isProficient', function(base, modifier, key, value) {
	var proficiencyScore = base;

	// if value is at any index in key, 
	// then add modifier to base and return that number
	for(i=0; i<=key.length; i++) {
		if(key[i] == value) {
			proficiencyScore = base + modifier;
			if(proficiencyScore > 0) {
				proficiencyScore = "+" + proficiencyScore + "**";
			}

			if(proficiencyScore < 0) {
				proficiencyScore = "-" + proficiencyScore + "**";
			}

			break;
		}
	}
	return proficiencyScore;
});