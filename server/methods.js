Meteor.methods({
  addCharacter: function(characterAttributes) {
    var user = Meteor.user();

    // TODO: add more robust errors
    // ensure user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to log in to create characters.");
    }

    var character = _.extend(characterAttributes, {
      userId: user._id,
      owner: user.username,
      updated: new Date()
    });

    var characterId = Characters.insert(character);
    return characterId;
  },

  updateCharacter: function(currentCharacterId, characterProperties) {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to log in to create characters.");
    }

    characterProperties.updated = new Date();

    var characterId = Characters.update(currentCharacterId, {$set: characterProperties});
    return characterId;
  }
});
