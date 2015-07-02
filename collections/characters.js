Characters = new Meteor.Collection('characters');

Characters.allow({
  insert: function(userId, doc) {
  	// let logged in user insert
    if (userId) {
      return true;
    }
  },

  update: function(userId, doc) {
  	// let owner modify
    return doc.userId === userId;
  },

  remove: function(userId, doc) {
  	// let owner remove
    return doc.userId === userId;
  }
});

Meteor.methods({
  addCharacter: function(characterAttributes) {
    var user = Meteor.user();

    // ensure user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to log in to create characters.");
    }

    // ensure the character has a name
    if (!characterAttributes.name) {
      throw new Meteor.Error(422, "Please enter a name for your character.");
    }

    var character = _.extend(characterAttributes, {
      userId: user._id,
      owner: user.username,
      updated: new Date().getTime()
    });

    var characterId = Characters.insert(character);
    return characterId;
  }
});
