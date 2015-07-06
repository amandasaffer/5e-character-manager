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
    return userId && doc.userId === userId;
  },

  remove: function(userId, doc) {
  	// let owner remove
    return userId && doc.userId === userId;
  }
});

// TODO: implement deny rules: https://www.discovermeteor.com/blog/allow-deny-a-security-primer/
// Characters.deny({
//   update: function(userId, doc, fields) {
//   	// owner shouldn't be able to update certain fields
//     if (_.contains(fields, "createdAt") || _.contains(fields, "userId")) {
//       return true;
//     }
//   },
// });

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
