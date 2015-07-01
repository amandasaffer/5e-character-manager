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
	'click #create-character': function(e) {
		Router.go('createCharacter');
	}
});

Template.characters.helpers({
	mycharacters: function() {
		return Characters.find({userId: Meteor.user()._id});
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

Template.createCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();
		var abilityScore = $(e.target).val();
		var modifier = calculateModifier(abilityScore);
		var scoreIndex = $(e.target).data('score-index');

		if(modifier > 0) {
			modifier = '+' + modifier;
		}

		if( abilityScores.length < 6 || abilityScores[scoreIndex] != abilityScore ) {
			applyProficiencyScores(modifier, proficiencyBonus, scoreIndex);
		} else {
			console.log('loop will run');
			$('.base-modifier').each(function(scoreIndex, obj) {
				var getMod = $(this).text();
		     	applyProficiencyScores(getMod, proficiencyBonus, scoreIndex);
		    });
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

		// set ability score modifier
		$(e.target).next().html(modifier);
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
	},

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

	'blur .trait input, blur .trait textarea': function(e) {
		// get the trait number (first or second)
		var traitNumber = traitCount - 1;

		// get the value name and data associated
		var traitIndex = parseInt( $(e.target).data('trait-index') );
		var theData = $(e.target).val();

		// if object doesn't exist, initialize it
		if(traits.length - 1 < traitNumber) {
			traits[traitNumber] = {};
		}

		if (traitIndex === 0) {
			traits[traitNumber].name = $(e.target).val();
		} else {
			traits[traitNumber].description = $(e.target).val();
		}

		console.log(traits);
	},

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

		console.log(proficiencies);

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
		traitCount = traitCount + 1;
		console.log(traitCount);
		var newTrait = $("#charTrait").clone();

		newTrait.children().find('input, textarea').each(function(){
		   $(this).val('');
		});

		newTrait.removeAttr('id');
		newTrait.data('trait-count', traitCount);
		$(newTrait).appendTo('#traits');

		if(traitCount > 2) {
			$('.add-feat-trait').css('margin-top', '50px');
		} else {
			$('.add-feat-trait').css('margin-top', '10px');
		}
	},

	'submit form': function(e) {
		e.preventDefault();

		var character = {
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
			// TODO: saving throws are included but need to parse them
			proficiencies: proficiencies
		}

		Meteor.call('addCharacter', character, function(error, id) {
			if (error) {
				return alert(error.reason);
			}
	      Router.go('displayCharacter', {_id: id});
	    });
	}
});

Template.displayCharacter.rendered = function(e) {
	var proficiencyMod = this.data.proficiency;
	var proficiencies = this.data.proficiencies;

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


Template.editCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();

		// define starting variables
		var scoreIndex = $(e.target).data('score-index');
		var abilityScore = $(e.target).val();
		var modifier = calculateModifier(abilityScore);

		if(modifier > 0) {
			modifier = '+' + modifier;
		}

		if( abilityScores.length < 6 || abilityScores[scoreIndex] != abilityScore ) {
			applyProficiencyScores(modifier, proficiencyBonus, scoreIndex);
		} else {
			$('.base-modifier').each(function(scoreIndex, obj) {
			var getMod = $(this).text();
	     	applyProficiencyScores(getMod, proficiencyBonus, scoreIndex);
	    });
		}

		// put ability score in array
		if(abilityScore != '') {
			abilityScores[scoreIndex] = abilityScore;
			abilityModifiers[scoreIndex] = modifier;
		}

		if(abilityScores.length < 6) {
			console.log('disable proficiency checkboxes');
		} else {
			$('.gen-proficiency, .save-proficiency').prop("disabled", false);
		}

		// set ability score modifier
		$(e.target).next().html(modifier);

	},

	'blur [name=proficiency]': function(e) {
		e.preventDefault();
		proficiencyBonus = $(e.target).val();


		if ( abilityScores.length < 6 ) {
			console.log('not all ability scores are filled out. do not apply proficiency bonuses yet.');
		} else {
			// update proficiency modifiers
			$('.base-modifier').each(function(scoreIndex, obj) {
				var getMod = $(this).text();
	     	applyProficiencyScores(getMod, proficiencyBonus, scoreIndex);
	    });

			// update passive perception if it applies
			for(i=0; i<proficiencies.length; i++) {
				if(proficiencies[i] === 'Perception') {
					var addPerception = parseInt($('[data-add-proficiency-to="Perception"]').parent().prev().text());
					$('input[name=passive-percep]').val(10 + addPerception);
					break;
				}
			}
		}
	},

	'blur .weapon input': function(e) {
		var weaponNumber = parseInt( $(e.target).closest('.weapon').data('weapon-number') );
		var weaponIndex = parseInt( $(e.target).data('weapon-index') );
		if(weapons.length - 1 < weaponNumber) {
			weapons[weaponNumber] = [];
		}
		weapons[weaponNumber][weaponIndex] = $(e.target).val();
	},

	'blur .trait input, blur .trait textarea': function(e) {
		var traitNumber = traitCount - 1;
		var traitIndex = parseInt( $(e.target).data('trait-index') );
		var theData = $(e.target).val();

		// if object doesn't exist, initialize it
		if(traits.length - 1 < traitNumber) {
			traits[traitNumber] = {};
		}

		if (traitIndex === 0) {
			traits[traitNumber].name = theData;
		} else {
			traits[traitNumber].description = theData;
		}
	},

	'click .save-proficiency, click .gen-proficiency': function(e) {
		var modifier = $(e.target).parent().prev().text();
		var isChecked = $(e.target).is(':checked');

		var thisProficiency = $(e.target).parent().prev().prev().text();
		thisProficiency = cleanProficiency(thisProficiency);

		if( isChecked ) {
			// checked after click
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

		// TODO: make this code block a function and re-use in create template
		if( $(e.target).data('add-proficiency-to') === 'Perception') {
    	var addPerception = parseInt( $(e.target).parent().prev().text() );
    	$('input[name=passive-percep]').val(10 + addPerception);
    }
	},

	'click .add-feat-trait': function(e) {
		traitCount = traitCount + 1;
		var newTrait = $("#charTrait").clone();

		newTrait.children().find('input, textarea').each(function(){
		   $(this).val('');
		});

		newTrait.removeAttr('id');
		newTrait.data('trait-count', traitCount);

		$(newTrait).appendTo('#traits');

		// TODO: determine if this is needed for the edit template
		// if(traitCount > 3) {
		// 	$('.add-feat-trait').css('margin-top', '50px');
		// } else {
		// 	$('.add-feat-trait').css('margin-top', '10px');
		// }
	},

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
