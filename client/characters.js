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
	'submit form': function(e) {
		e.preventDefault();

		var character = {
			name: $(e.target).find('[name=charname]').val(),
			class: $(e.target).find('[name=class]').val(),
			level: $(e.target).find('[name=level]').val(),
			background: $(e.target).find('[name=background]').val(),
			race: $(e.target).find('[name=race]').val(),
			alignment: $(e.target).find('[name=alignment]').val()
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
	'submit form': function(e) {
		e.preventDefault();

		var currentCharacterId = this._id;

		var characterProperties = {
	  		name: $(e.target).find('[name=charname]').val(),
			class: $(e.target).find('[name=class]').val(),
			level: $(e.target).find('[name=level]').val(),
			background: $(e.target).find('[name=background]').val(),
			race: $(e.target).find('[name=race]').val(),
			alignment: $(e.target).find('[name=alignment]').val()
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