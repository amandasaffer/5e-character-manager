Template.registerHelper('selected', function(key, value) {
  return key == value? {selected:'selected'}: '';
});

Template.registerHelper('checkProficiency', function(key, value) {
	for(i = 0; i < key.length; i++) {
		if(key[i] == value) {
			return 'checked';
		}
	}
});

Template.registerHelper('getArrayValue', function(array, index) {
  return array[index];
});

Template.registerHelper('isProficient', function(base, index, modifier, key, value) {
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

Template.registerHelper('addMod', function(num) {
  if(num > 0) {
    num = "+" + num;
  } else if(num < 0) {
    num = "-" + num;
  }
  return num;
});

Template.registerHelper("formatDate", function(date) {
  return moment(new Date(date)).format("M/DD/YY h:mmA");
});
