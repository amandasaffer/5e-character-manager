Characters = new Meteor.Collection('characters');

// TODO: move to server
CharacterSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
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
    label: "Proficiency Bonus"
  },
  passivePerception: {
    type: Number,
    label: "Passive Perception"
  },
  abilityScores: {
    type: [String],
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
