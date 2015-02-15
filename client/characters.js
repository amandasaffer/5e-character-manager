var calculateModifier = function(abilityScore) {
	var modifier = Math.floor((abilityScore - 10) / 2);
	return modifier;
};

var proficiencyBonus,
	strSavingThrow,
	dexSavingThrow,
	conSavingThrow,
	intSavingThrow,
	wisSavingThrow,
	chaSavingThrow,
	acrobaticsProf,
	animalhandlingProf,
	arcanaProf,
	athleticsProf,
	deceptionProf,
	historyProf,
	insightProf,
	intimidationProf,
	investigationProf,
	medicineProf,
	natureProf,
	perceptionProf,
	performanceProf,
	persuasionProf,
	religionProf,
	sleightofhandProf,
	stealthProf,
	survivalProf;


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

Template.createCharacter.rendered = function() {
	var profValue = $('[name=proficiency]').val('+0');
	$('')
	proficiencyBonus = 0;
	abilityScores = [];
};

Template.createCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();

		// define starting variables
		var mod = calculateModifier($(e.target).val());
		var ability = $(e.target).attr('name');
		var abilityScore = $(e.target).val();
		var scoreIndex = $(e.target).data('score-index');

		// find relevant saving throw elements and store their selector strings
		var matched = $('.saving-throws [data-score-index=' + scoreIndex + '], .general-proficiencies [data-score-index=' + scoreIndex + ']');

		// if modifier number is positive, add plus sign to indicate
		if(mod > 0) {
			mod = "+" + mod;
		}

		if($(e.target).val() != '') {
			// set ability score modifier
			$(e.target).next().html(mod);
			// set other affected modifiers (saving throws, general proficiencies)
			// TODO: What to do if user updates ability scores after proficiency is checked?
			$(matched).text(mod);
		}

		if(abilityScore.length > 0) {
			abilityScores[scoreIndex] = abilityScore;
		}
	},

	'blur [name=proficiency]': function(e) {
		e.preventDefault();

		// if there was no proficiency bonus, set the proficiency bonus
		if(proficiencyBonus == 0) {
			oldProficiency = 0;
			proficiencyBonus = $(e.target).val();
			
		// if there was already a proficiency bonus, store the old value and the difference between the two	
		} else {
			oldProficiency = proficiencyBonus;
			proficiencyDifference = $(e.target).val() - proficiencyBonus;
			proficiencyBonus = $(e.target).val();
		}

		// if the first character is a +, remove it
		var firstChar = proficiencyBonus.substr(0,1);
		if(firstChar == "+") {
			proficiencyBonus = proficiencyBonus.substr(1);
		}

		// get checked proficiencies (if any) when bonus is modified, 
		// automatically add bonus to it.
		var selected = [];
	    $('input.gen-proficiency:checked, input.save-proficiency:checked').each(function() {
	      selected.push($(this).data('add-proficiency-to'));
	    });	

		if ( abilityScores.length < 6 ) {
			console.log('not all ability scores are filled out. do not apply proficiency bonuses yet');
		} else {
			// if not changing from zero, get difference and apply
			if(oldProficiency != 0) {
				// get all checked elements (selected array)
				console.log('modified proficiency bonus from another number. apply difference of ' + proficiencyDifference)
				console.log(selected);
				
				// loop through the array and add proficiencyDifference to existing modifiers
				$('input.gen-proficiency:checked').each(function() {
			    	var existingMod = $(this).parent().prev().text();
			    	var updateMod = parseInt(existingMod) + parseInt(proficiencyDifference);

			    	if(updateMod > 0) {
						updateMod = "+" + updateMod;
					}

			    	$(this).parent().prev().text(updateMod);
			    });
			// else, just apply proficiency bonus straight up
			} else {
				// loop through the array and add proficiencyDifference to existing modifiers
				$('input.gen-proficiency:checked, input.save-proficiency:checked').each(function() {
			    	var existingMod = $(this).parent().prev().text();
			    	var updateMod = parseInt(existingMod) + parseInt(proficiencyBonus);

			    	if(updateMod > 0) {
						updateMod = "+" + updateMod;
					}

			    	$(this).parent().prev().text(updateMod);
			    });
			}
		}
		
	},

	// TODO: What to do if user updates proficiency in middle of updating ability scores?
	'click .save-proficiency, click .gen-proficiency': function(e) {
		var modifier = $(e.target).parent().prev().text();
		var isChecked = $(e.target).is(':checked');
		
		if( isChecked ) {
			// currently checked
			modifier = parseInt(modifier) + parseInt(proficiencyBonus);
		} else {
			// currently unchecked
			modifier = parseInt(modifier) - parseInt(proficiencyBonus);
		}
		
		if(modifier > 0) {
			modifier = "+" + modifier;
		}

		// if the ability score modifier ISN'T zero, apply proficiencies
		if($(e.target).parent().prev().text().length != 0) {
			$(e.target).parent().prev().text(modifier);
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
			
			proficiency: proficiencyBonus,

			strAbility: $(e.target).find('[name=str]').val(),
			strMod: $(e.target).find('#strMod').html(),
			strSave: $(e.target).find('#strSave').html(),

			dexAbility: $(e.target).find('[name=dex]').val(),
			dexMod: $(e.target).find('#dexMod').html(),
			dexSave: $(e.target).find('#dexSave').html(),

			conAbility: $(e.target).find('[name=con]').val(),
			conMod: $(e.target).find('#conMod').html(),
			conSave: $(e.target).find('#conSave').html(),

			intAbility: $(e.target).find('[name=int]').val(),
			intMod: $(e.target).find('#intMod').html(),
			intSave: $(e.target).find('#intSave').html(),

			wisAbility: $(e.target).find('[name=wis]').val(),
			wisMod: $(e.target).find('#wisMod').html(),
			wisSave: $(e.target).find('#wisSave').html(),

			chaAbility: $(e.target).find('[name=cha]').val(),
			chaMod: $(e.target).find('#chaMod').html(),
			chaSave: $(e.target).find('#chaSave').html()

		}

		Meteor.call('addCharacter', character, function(error, id) {
			if (error) {
				return alert(error.reason);
			}

	      Router.go('displayCharacter', {_id: id});
	    });
	}
});

Template.editCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();
		var mod = calculateModifier($(e.target).val());
		var ability = $(e.target).attr('name');

		// find the relevant saving throw
		var matched = $('.saving-throws [name=' + ability + ']');

		if(mod > 0) {
			mod = "+" + mod;
		}

		// set modifier
		$(e.target).next().html(mod);
		// set saving throw modifier
		$(matched).text(mod);
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
			
			proficiency: proficiencyBonus,

			strAbility: $(e.target).find('[name=str]').val(),
			strMod: $(e.target).find('#strMod').html(),
			strSave: $(e.target).find('#strSave').html(),

			dexAbility: $(e.target).find('[name=dex]').val(),
			dexMod: $(e.target).find('#dexMod').html(),
			dexSave: $(e.target).find('#dexSave').html(),

			conAbility: $(e.target).find('[name=con]').val(),
			conMod: $(e.target).find('#conMod').html(),
			conSave: $(e.target).find('#conSave').html(),

			intAbility: $(e.target).find('[name=int]').val(),
			intMod: $(e.target).find('#intMod').html(),
			intSave: $(e.target).find('#intSave').html(),

			wisAbility: $(e.target).find('[name=wis]').val(),
			wisMod: $(e.target).find('#wisMod').html(),
			wisSave: $(e.target).find('#wisSave').html(),

			chaAbility: $(e.target).find('[name=cha]').val(),
			chaMod: $(e.target).find('#chaMod').html(),
			chaSave: $(e.target).find('#chaSave').html()
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

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this character?")) {
	  		var currentCharacterId = this._id;
	  		Characters.remove(currentCharacterId);
	  		Router.go('characters');
		}
	}
});