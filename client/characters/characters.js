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

var checkProficiency = function(array, value) {
	for(i = 0; i < array.length; i++) {
		if(array[i] == value) {
			return true;
		}
	}
}

Template.characters.events({
	'click #add-character': function(e) {
		$('#myModal').modal('toggle'); // TODO: rename this modal
	},
	'submit #create-character': function(e) {
		e.preventDefault();

		var character = {
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
			proficiency: 2,
		 	passivePerception: 10,
			abilityScores: ['0', '0', '0', '0', '0', '0'], // TODO: fix this messy init
			abilityModifiers: [],
			proficiencies: [],
			timestamp: new Date()
		}

		Meteor.call('addCharacter', character, function(error, id) {
			if (error) {
				return alert(error.reason);
			}
			$('#myModal').modal('toggle'); // TODO: rename this modal
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
	passivePerception = this.data.passivePerception;

	if(abilityScores.length < 6) {
		$('.gen-proficiency, .save-proficiency').prop('disabled', true);
	}

	Session.set('perceptionMod', $('.Perception-prof').text());
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

		if(abilityScore != '') { // put ability score in array
			abilityScores[scoreIndex] = abilityScore;
			abilityModifiers[scoreIndex] = modifier;
		}

		var obj = {};
		// TODO: length is always 6 now, need another qualifier for this :(
		if(abilityScores.length < 6) { // enable proficiencies
			console.log('disable proficiency checkboxes');
		} else { // otherwise no
			if ( scoreIndex === 4 ) {
				var passive = parseInt(abilityModifiers[4]);
				if( checkProficiency(proficiencies, 'Perception') ) {
					passive = passive + parseInt(proficiencyBonus);
				}
				passivePerception = 10 + passive;
				obj["passivePerception"] = passivePerception;
			}

			$('.gen-proficiency, .save-proficiency').prop("disabled", false);
		}

		obj["abilityScores." + scoreIndex] = abilityScore;
		obj["abilityModifiers." + scoreIndex] = modifier;
		Characters.update(currentCharacterId, {$set: obj});
	},


	'blur [name=proficiency]': function(e) {
		e.preventDefault();
		proficiencyBonus = parseInt( $(e.target).val() );

		if( checkProficiency(proficiencies, 'Perception') ) { // update passive perception
			var passive = parseInt(abilityModifiers[4]) + proficiencyBonus;
			Session.set('perceptionMod', passive);
			passivePerception = 10 + passive;
			var obj = {
				passivePerception: passivePerception,
				proficiency: proficiencyBonus
			};
    } else {
			var obj = { proficiency: proficiencyBonus };
		}

		Characters.update(currentCharacterId, {$set: obj});
	},

	'blur .weapon-input': function(e) {
		var num = $(e.target).closest('.weapon').index('.weapon');
		var weaponIndex = parseInt( $(e.target).data('weapon-index') );
		var data = $(e.target).val();

		var obj = {};
		if (weaponIndex === 0) {
			weapons[num].name = data;
			obj["weapons." + num + ".name"] = data;
		} else if (weaponIndex === 1) {
			weapons[num].atkbonus = data;
			obj["weapons." + num + ".atkbonus"] = data;
		} else {
			weapons[num].damage = data;
			obj["weapons." + num + ".damage"] = data;
		}

		Characters.update(currentCharacterId, {$set: obj});
	},

	'click .add-weapon': function(e) {
		e.preventDefault();
		weapons.push({});
		var obj = { weapons: weapons }; // is there a better way to do this?
		Characters.update(currentCharacterId, {$set: obj});
	},

	'click .delete-weapon': function(e) {
		e.preventDefault();
		var num = $(e.target).closest('.weapon').index('.weapon');
		weapons.splice(num, 1);
		var obj = { weapons: weapons }; // is there a better way to do this?
		Characters.update(currentCharacterId, {$set: obj});
	},

	'blur .trait-name': function(e) { // TODO: maybe combine this to be more like weapons?
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

	'click .delete-trait': function(e) {
		e.preventDefault();
		var num = $(e.target).closest('.trait').index('.trait');
		traits.splice(num, 1);
		var obj = { traits: traits }; // need a better way. only splice the correct one?
		Characters.update(currentCharacterId, {$set: obj});
	},

	'click .save-proficiency, click .gen-proficiency': function(e) {
		var modifier = $(e.target).parent().prev().text();
		var isChecked = $(e.target).is(':checked');
		var prof = cleanProficiency( $(e.target).parent().prev().prev().text() );

		if(isChecked) {
			modifier = parseInt(modifier) + parseInt(proficiencyBonus);
			proficiencies.push(prof);
		} else {
			modifier = parseInt(modifier) - parseInt(proficiencyBonus);
			var profIndex = proficiencies.indexOf(prof);
			proficiencies.splice(profIndex, 1);
		}

		if(modifier > 0) {
			modifier = "+" + modifier;
		}

		if( $(e.target).data('add-proficiency-to') === 'Perception') { // update passive perception
			Session.set('perceptionMod', $('.Perception-prof').text());
			passivePerception = 10 + parseInt(modifier);
			var obj = {
				passivePerception: passivePerception,
				proficiencies: proficiencies
			};
    } else {
			var obj = { proficiencies: proficiencies };
		}

		Characters.update(currentCharacterId, {$set: obj});
	},

	'click .add-feat-trait': function(e) {
		traits.push({});
		var obj = { traits: traits }; // is there a better way to do this?
		Characters.update(currentCharacterId, {$set: obj});
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
			proficiencies: proficiencies,
			timestamp: new Date()
		}

		Characters.update(currentCharacterId, {$set: characterProperties}, function(error) {
	  		if (error) {
	    		alert(error.reason); // display error to user TODO: make errors more robust
	  		} else {
	    		Router.go('characters', {_id: currentCharacterId});
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
		return Characters.find({userId: Meteor.user()._id, name: {"$exists": true }}, {sort: {timestamp : -1}});
	}
});

Template.displayCharacter.rendered = function(e) {
	var proficiencyMod = this.data.proficiency;
	var proficiencies = this.data.proficiencies;
};
