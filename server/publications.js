// publish all groups for now
Meteor.publish('groups', function() {
	return Groups.find();
});

// publish all characters for now
Meteor.publish('characters', function() {
	return Characters.find();
});

Meteor.publish('usersCharacters', function() {
	return Characters.find({userId: this.userId});
});

// TODO: publish a user's own groups
Meteor.publish('groupsBelongedTo', function() {
	return Characters.find({userId: this.userId});
});