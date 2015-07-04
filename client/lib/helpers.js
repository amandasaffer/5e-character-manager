UI.registerHelper('selected', function(key, value) {
  return key == value? {selected:'selected'}: '';
});

UI.registerHelper('checkProficiency', function(key, value) {
	for(i = 0; i < key.length; i++) {
		if(key[i] == value) {
			return 'checked';
		}
	}
});

UI.registerHelper('getArrayValue', function(array, index) {
  return array[index];
});

UI.registerHelper('isProficient', function(base, index, modifier, key, value) {
	var base = base[index];
  var proficiencyScore = base;
	var modifier = parseInt(modifier);
	var base = parseInt(base);

	for(i = 0; i < key.length; i++) {
		if(key[i] == value) {
			proficiencyScore = base + modifier;
      // TODO: Figure out how to access DOM from this helper
      // idea: just look at proficiencies array in the template and addClass based on those values
			if(proficiencyScore > 0) {
				proficiencyScore = "+" + proficiencyScore;
			} else if(proficiencyScore < 0) {
				proficiencyScore = "-" + proficiencyScore;
			}
			break;
		}
	}
	return proficiencyScore;
});

UI.registerHelper('addMod', function(num) {
  if(num > 0) {
    num = "+" + num;
  } else if(num < 0) {
    num = "-" + num;
  }
  return num;
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
