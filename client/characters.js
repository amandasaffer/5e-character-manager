var calculateModifier = function(abilityScore) {
	var modifier = Math.floor((abilityScore - 10) / 2);
	return modifier;
};

var proficiencyBonus,
	firstChar,
	strSave,
	dexSave,
	conSave,
	intSave,
	wisSave,
	chaSave;


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
};

Template.createCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();
		var mod = calculateModifier($(e.target).val());
		var ability = $(e.target).attr('name');

		// find the relevant saving throw
		var matched = $('.saving-throws [name=' + ability + '], .general-proficiences [name=' + ability + ']');

		if(mod > 0) {
			mod = "+" + mod;
		}

		// set modifier
		$(e.target).next().html(mod);
		// set saving throw modifier
		$(matched).text(mod);
	},

	// TODO: update modifiers on blur action
	'blur [name=proficiency]': function(e) {
		e.preventDefault();
		proficiencyBonus = $(e.target).val();
		var firstChar = proficiencyBonus.substr(0,1);

		if(firstChar == "+") {
			proficiencyBonus = proficiencyBonus.substr(1);
		}
	},

	'click .save-proficiency, click .gen-proficiency': function(e) {
		var modifier = $(e.target).parent().prev().text();
		var isChecked = $(e.target).is(':checked');
		
		if( isChecked ) {
			modifier = parseInt(modifier) + parseInt(proficiencyBonus);
		} else {
			modifier = parseInt(modifier) - parseInt(proficiencyBonus);
		}
		
		if(modifier > 0) {
			modifier = "+" + modifier;
		}

		var blah = $(e.target).parent().prev().text(modifier);
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