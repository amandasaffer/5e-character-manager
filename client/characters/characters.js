Template.characters.helpers({
	characters: function() {
		return Characters.find({userId: Meteor.user()._id, name: {"$exists": true }}, {sort: {createdAt: -1}});
	}
});

Template.characters.events({
	'click #create': function(e) {
		Router.go('insertCharacter');
	}
});