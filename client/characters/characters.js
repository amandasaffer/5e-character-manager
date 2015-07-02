var calculateModifier = function(abilityScore) {
	var modifier = Math.floor((abilityScore - 10) / 2);
	return modifier;
};

var addPositiveMod = function(num) {
	if(num > 0) {
		num = '+' + num;
	}
	return num;
}


var cleanProficiency = function(text) {
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
}

applyProficiencyScores = function(abilityScoreModifier, proficiencyBonus, scoreIndex) {
	abilityScoreModifier = parseInt(abilityScoreModifier);
	var pureModifier = abilityScoreModifier;
	proficiencyBonus = parseInt(proficiencyBonus);

	// for unchecked elements, use base ability score modifier
	abilityScoreModifier = addPositiveMod(abilityScoreModifier);
	var matched = $('.saving-throws [data-score-index=' + scoreIndex + '], .general-proficiencies [data-score-index=' + scoreIndex + ']');
	$(matched).text(abilityScoreModifier);

	// for checked elements, apply proficiency bonus as well
	var combinedModifier = pureModifier + proficiencyBonus;
	combinedModifier = addPositiveMod(combinedModifier);

  $('input.gen-proficiency:checked, input.save-proficiency:checked').each(function() {
  	// only apply modifier during loop if ability (str, dex, etc.) matches the proficiency
  	if ($(this).parent().prev().data('score-index') === scoreIndex) {
  		$(this).parent().prev().text(combinedModifier);
  	}
  });

  if( $('.perception-prof').text().length > 0 ) {
  	var addPerception = parseInt($('.perception-prof').text());
  	$('input[name=passive-percep]').val(10 + addPerception);
  }
	return;
};

Template.characters.events({
	'click #add-character': function(e) {
		$('#myModal').modal('toggle');
	},
	'submit #create-character': function(e) {
		e.preventDefault();

		var character = {
			// TODO: update
			name: $(e.target).find('[name=charname]').val(),
			class: '',
			level: 1,
			background: '',
			race: '',
			alignment: '',
			ac: '',
			initiative: '',
			speed: '',
			hitPoints: '',
			hitDice: '',
			weapons: [{}],
			equipment: '',
			traits: [{}],
			proficiency: '+2',
		 	passivePerception: '10',
			// TODO: fix initialization of this. it's messy
			abilityScores: ['0', '0', '0', '0', '0', '0'],
			abilityModifiers: [],
			proficiencies: []
		}

		Meteor.call('addCharacter', character, function(error, id) {
			if (error) {
				return alert(error.reason);
			}
			$('#myModal').modal('toggle');
	  });
	}
});

Template.manageCharacter.rendered = function() {
	proficiencyBonus = this.data.proficiency;
	abilityScores = this.data.abilityScores;
	abilityModifiers = this.data.abilityModifiers;
	proficiencies = this.data.proficiencies;
	weapons = this.data.weapons;
	traits = this.data.traits;
	currentCharacterId = this.data._id;

	if(abilityScores.length < 6) {
		$('.gen-proficiency, .save-proficiency').prop('disabled', true);
	}
};

Template.manageCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();
		var abilityScore = $(e.target).val();
		var modifier = calculateModifier(abilityScore);
		var scoreIndex = $(e.target).data('score-index');

		if(modifier > 0) {
			modifier = '+' + modifier;
		}

		// put ability score in array
		if(abilityScore != '') {
			abilityScores[scoreIndex] = abilityScore;
			abilityModifiers[scoreIndex] = modifier;
		}

		// enable proficiency checkboxes if all ability scores are filled out
		if(abilityScores.length < 6) {
			console.log('disable proficiency checkboxes');
		} else {
			$('.gen-proficiency, .save-proficiency').prop("disabled", false);
		}

		var obj = {};
		obj["abilityScores." + scoreIndex] = abilityScore;
		obj["abilityModifiers." + scoreIndex] = modifier;
		Characters.update(currentCharacterId, {$set: obj});
	},

	'blur [name=proficiency]': function(e) {
		e.preventDefault();
		proficiencyBonus = $(e.target).val();

		if ( abilityScores.length < 6 ) {
			console.log('not all ability scores are filled out. do not apply proficiency bonuses yet.');
		} else {
			$('.base-modifier').each(function(scoreIndex, obj) {
				var getMod = $(this).text();
		     	applyProficiencyScores(getMod, proficiencyBonus, scoreIndex);
		    });
		}

		var obj = { proficiency: proficiencyBonus }; // working!!
		Characters.update(this._id, {$set: obj});
	},

	// TODO: BROKEN. refactor. look at .ability for tips
	'blur .weapon input': function(e) {
		// get the weapon number (first or second)
		var weaponNumber = parseInt( $(e.target).closest('.weapon').data('weapon-number') );

		// get the value name and data associated
		var weaponIndex = parseInt( $(e.target).data('weapon-index') );
		var theData = $(e.target).val();

		// if object doesn't exist, initialize it
		if(weapons.length - 1 < weaponNumber) {
			weapons[weaponNumber] = {};
		}

		if (weaponIndex === 0) {
			weapons[weaponNumber].name = $(e.target).val();
		} else if (weaponIndex === 1) {
			weapons[weaponNumber].atkbonus = $(e.target).val();
		} else {
			weapons[weaponNumber].damage = $(e.target).val();
		}
	},

	'blur .trait-name': function(e) {
		var traitName = $(e.target).val();
		var num = $(e.target).closest('.trait').index();
		traits[num].name = traitName;

		var obj = {};
		obj["traits." + num + ".name"] = traitName;
		Characters.update(currentCharacterId, {$set: obj});
	},

	'blur .trait-description': function(e) {
		var description = $(e.target).val();
		var num = $(e.target).closest('.trait').index();
		traits[num].description = description;

		var obj = {};
		obj["traits." + num + ".description"] = description;
		Characters.update(currentCharacterId, {$set: obj});
	},

	// TODO: refactor
	'click .save-proficiency, click .gen-proficiency': function(e) {
		var modifier = $(e.target).parent().prev().text();
		var isChecked = $(e.target).is(':checked');

		var thisProficiency = $(e.target).parent().prev().prev().text();
		thisProficiency = cleanProficiency(thisProficiency);

		if( isChecked ) {
			modifier = parseInt(modifier) + parseInt(proficiencyBonus);
			proficiencies.push(thisProficiency);
		} else {
			modifier = parseInt(modifier) - parseInt(proficiencyBonus);
			var profIndex = proficiencies.indexOf(thisProficiency);
			proficiencies.splice(profIndex, 1);
		}

		if(modifier > 0) {
			modifier = "+" + modifier;
		}
		// if the ability score modifier ISN'T zero, apply proficiencies
		if($(e.target).parent().prev().text().length != 0) {
			$(e.target).parent().prev().text(modifier);
		}

		// TODO: This code block is reused. Make it a function later??
		if( $(e.target).data('add-proficiency-to') === 'perception') {
	    	var addPerception = parseInt($('.perception-prof').text());
	    	$('input[name=passive-percep]').val(10 + addPerception);
	    }
	},

	'click .add-feat-trait': function(e) {
		traits.push({});
		var obj = { traits: traits };
		Characters.update(currentCharacterId, {$set: obj});
	},

	// TODO: implement this
	// 'click .add-weapon': function(e) {
	// 	weapons.push({});
	// 	var obj = { weapons: weapons };
	// 	Characters.update(currentCharacterId, {$set: obj});
	// },

	'submit form': function(e) {
		e.preventDefault();
		var currentCharacterId = this._id;

		var characterProperties = {
			name: $(e.target).find('[name=charname]').val(),
			class: $(e.target).find('[name=class]').val(),
			level: $(e.target).find('[name=level]').val(),
			background: $(e.target).find('[name=background]').val(),
			race: $(e.target).find('[name=race]').val(),
			alignment: $(e.target).find('[name=alignment]').val(),
			ac: $(e.target).find('[name=ac]').val(),
			initiative: $(e.target).find('[name=initiative]').val(),
			speed: $(e.target).find('[name=speed]').val(),
			hitPoints: $(e.target).find('[name=hitpoints]').val(),
			hitDice: $(e.target).find('[name=hitdice]').val(),
			weapons: weapons,
			equipment: $(e.target).find('[name=equipment]').val(),
			traits: traits,
			proficiency: proficiencyBonus,
		 	passivePerception: $('input[name=passive-percep]').val(),
			abilityScores: abilityScores,
			abilityModifiers: abilityModifiers,
			proficiencies: proficiencies
		}

		Characters.update(currentCharacterId, {$set: characterProperties}, function(error) {
	  		if (error) {
	    		// display the error to the user
	    		alert(error.reason);
	  		} else {
	    		Router.go('displayCharacter', {_id: currentCharacterId});
	  		}
		});
	},

	'click .delete-character': function(e) {
		e.preventDefault();

		if (confirm("Delete this character?")) {
	  		var currentCharacterId = this._id;
	  		Characters.remove(currentCharacterId);
	  		Router.go('characters');
		}
	}
});

Template.characters.helpers({
	characters: function() {
		// only characters with a name field go in this list
		return Characters.find({userId: Meteor.user()._id, name: {"$exists": true }});
	}
});

Template.editCharacter.helpers({
	class: function() {
		return this.class;
	}
});

Template.createCharacter.rendered = function() {
	var profValue = $('[name=proficiency]').val('+2');
	proficiencyBonus = 2;
	abilityScores = [];
	abilityModifiers = [];
	proficiencies = [];
	weapons = [];
	traits = [];
	traitCount = 1;

	$('.gen-proficiency, .save-proficiency').prop("disabled", true);
};

Template.editCharacter.rendered = function() {
	proficiencyBonus = this.data.proficiency;
	abilityScores = this.data.abilityScores;
	abilityModifiers = this.data.abilityModifiers;
	proficiencies = this.data.proficiencies;
	weapons = this.data.weapons;
	traits = this.data.traits;
	traitCount = this.data.traits.length;
};


Template.displayCharacter.rendered = function(e) {
	var proficiencyMod = this.data.proficiency;
	var proficiencies = this.data.proficiencies;
};
