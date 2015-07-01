UI.registerHelper('selected', function(key, value) {
  return key == value? {selected:'selected'}: '';
});

UI.registerHelper('checkProficiency', function(key, value) {
	for(i=0; i<key.length; i++) {
		if(key[i] == value) {
			return 'checked';
		}
	}
});

UI.registerHelper('getAbilityScore', function(abilityScores, index) {
  return abilityScores[index];
});

UI.registerHelper('getAbilityModifier', function(abilityModifiers, index) {
  return abilityModifiers[index];
});

UI.registerHelper('isProficient', function(base, index, modifier, key, value) {
	var base = base[index];
  var proficiencyScore = base;
	var modifier = parseInt(modifier);
	var base = parseInt(base);

	// if value is at any index in key, then add modifier to base and return that number
	for(i=0; i<key.length; i++) {
		if(key[i] == value) {
			proficiencyScore = base + modifier;
      // TODO: Figure out how to access DOM to show user which stats they are proficient in
			if(proficiencyScore > 0) {
				proficiencyScore = "+" + proficiencyScore /* + "***" */;
			} else if(proficiencyScore < 0) {
				proficiencyScore = "-" + proficiencyScore /* + "***" */;
			}
			break;
		}
	}

	return proficiencyScore;
});

UI.registerHelper('standardized', function(key) {
  if (key === 'classes') {
    return standardCharacter.classes;
  } else if (key === 'backgrounds') {
    return standardCharacter.backgrounds;
  } else if (key === 'races') {
    return standardCharacter.races;
  } else if (key === 'alignments') {
    return standardCharacter.alignments;
  } else if (key === 'abilityScores') {
    return standardCharacter.abilityScores;
  } else if (key === 'saveProficiencies') {
    return standardCharacter.saveProficiencies;
  } else if (key === 'skillProficiencies') {
    return standardCharacter.skillProficiencies;
  }
});
