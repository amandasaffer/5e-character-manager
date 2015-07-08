// publish all groups for now
Meteor.publish('groups', function() {
	return Groups.find();
});

// publish all characters for now
Meteor.publish('characters', function() {
	return Characters.find();
});

// publish all the current user's characters
Meteor.publish('user-characters', function () {
	return Characters.find({userId: this.userId}, {sort: {name: -1}});
});
