// publish all groups for now
Meteor.publish('groups', function() {
	return Groups.find();
});

// publish all characters for now
Meteor.publish('characters', function() {
	return Characters.find();
});

Meteor.publish('usersCharacters', function(user) {
	return Characters.find({userId: user});
});

// TODO: publish a user's own groups
Meteor.publish('groupsBelongedTo', function(user) {
	return Characters.find({userId: user});
});