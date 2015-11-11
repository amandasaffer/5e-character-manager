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

Template.registerHelper('cleanProficiency', function(text) {
  text = text.replace('(STR)','');
  text = text.replace('(DEX)','');
  text = text.replace('(CON)','');
  text = text.replace('(INT)','');
  text = text.replace('(WIS)','');
  text = text.replace('(CHA)','');

  if(/\s+$/.test(text)) {
    text = text.substr(0, text.length - 1);
  }
  return text;
});

Template.registerHelper('getArrayValue', function(array, index) {
  return array[index];
});

Template.registerHelper('inArray', function(array, value) {
  for(i = 0; i < array.length; i++) {
    if(array[i] == value) {
      return true;
    }
  }
});

Template.registerHelper('calculateModifier', function(score) {
  var modifier = Math.floor((score - 10) / 2);
  return modifier;
});

Template.registerHelper('positiveMod', function(num) {
  if(num > 0) {
    num = '+' + num;
  }
  return num;
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

UI.registerHelper('excerpt', function(e, limit) {
  var str = e;
  if (str.length < limit) {
    return str;
  } else {
    return str.substr( 0, limit ) + "...";
  }
});

Template.registerHelper("formatDate", function(date) {
  return moment(new Date(date)).format("M/DD/YY h:mmA");
});
