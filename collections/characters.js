Characters = new Meteor.Collection('characters');

CharacterSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    // max: 200
  },
  class: {
    type: String,
    label: "Class"
  },
  level: {
    type: Number,
    label: "Level"
  },
  background: {
    type: String,
    label: "Background"
  },
  race: {
    type: String,
    label: "Race"
  },
  alignment: {
    type: String,
    label: "Alignment"
  },
  ac: {
    type: String,
    label: "Armor Class",
    optional: true
  },
  initiative: {
    type: String,
    label: "Initiative",
    optional: true
  },
  speed: {
    type: String,
    label: "Speed",
    optional: true
  },
  hitPoints: {
    type: String,
    label: "Hit Points",
    optional: true
  },
  hitDice: {
    type: String,
    label: "Hit Dice",
    optional: true
  },
  weapons: {
    type: [Object],
    label: "Weapons",
    optional: true
  },
  equipment: {
    type: String,
    label: "Equipment",
    optional: true
  },
  traits: {
    type: [Object],
    label: "Traits",
    optional: true
  },
  proficiency: {
    type: Number,
    label: "Proficiency"
  },
  passivePerception: {
    type: Number,
    label: "Passive Perception"
  },
  abilityScores: {
    type: [Number],
    label: "Ability Scores",
    minCount: 1
  },
  abilityModifiers: {
    type: [String],
    label: "Ability Modifiers",
    minCount: 1
  },
  proficiencies: {
    type: [String],
    label: "Proficiencies"
  },
  timestamp: {
    type: Date,
    label: "Timestamp"
  }
});

// var whitelist = ['name', 'class', 'level', 'background', 'race', 'alignment', 'ac', 'initiative', 'speed', 'hitPoints', 'hitDice', 'weapons', 'equipment', 'traits', 'proficiency', 'passivePerception', 'abilityScores', 'abilityModifiers', 'proficiencies', 'timestamp'];

Characters.allow({
  insert: function(userId, doc) {
  	// let logged in user insert
    if (userId) {
      return true;
    }
  },

  update: function(userId, doc) {
  	// let owner modify & make sure that they can't insert random fields
    return userId && doc.userId === userId;
  },

  remove: function(userId, doc) {
  	// let owner remove
    return userId && doc.userId === userId;
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
