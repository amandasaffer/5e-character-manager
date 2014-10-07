var calculateModifier = function(abilityScore) {
	var modifier = Math.floor((abilityScore - 10) / 2);
	return modifier;
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

Template.createCharacter.events({
	'blur .ability': function(e) {
		e.preventDefault();
		var mod = calculateModifier($(e.target).val());

		if(mod > 0) {
			mod = "+" + mod;
		}

		$(e.target).next().html(mod);
		// console.log(mod);
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
			strAbility: $(e.target).find('[name=str]').val(),
			strMod: $(e.target).find('#strMod').html(),
			dexAbility: $(e.target).find('[name=dex]').val(),
			dexMod: $(e.target).find('#dexMod').html(),
			conAbility: $(e.target).find('[name=con]').val(),
			conMod: $(e.target).find('#conMod').html(),
			intAbility: $(e.target).find('[name=int]').val(),
			intMod: $(e.target).find('#intMod').html(),
			wisAbility: $(e.target).find('[name=wis]').val(),
			wisMod: $(e.target).find('#wisMod').html(),
			chaAbility: $(e.target).find('[name=cha]').val(),
			chaMod: $(e.target).find('#chaMod').html()
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

		if(mod > 0) {
			mod = "+" + mod;
		}

		$(e.target).next().html(mod);
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
			strAbility: $(e.target).find('[name=str]').val(),
			strMod: $(e.target).find('#strMod').html(),
			dexAbility: $(e.target).find('[name=dex]').val(),
			dexMod: $(e.target).find('#dexMod').html(),
			conAbility: $(e.target).find('[name=con]').val(),
			conMod: $(e.target).find('#conMod').html(),
			intAbility: $(e.target).find('[name=int]').val(),
			intMod: $(e.target).find('#intMod').html(),
			wisAbility: $(e.target).find('[name=wis]').val(),
			wisMod: $(e.target).find('#wisMod').html(),
			chaAbility: $(e.target).find('[name=cha]').val(),
			chaMod: $(e.target).find('#chaMod').html()
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