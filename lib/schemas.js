Schemas = {};

Schemas.Characters = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },
  level: {
    type: Number,
    max: 99 // is this necessary?
  },
  background: {
    type: String,
  },
  race: {
    type: String,
    allowedValues: [
      'Dwarf',
      'Elf',
      'Halfling',
      'Human',
      'Dragonborn',
      'Gnome',
      'Half-Elf',
      'Half-Orc',
      'Tiefling'
    ]
  },
  alignment: {
    type: String,
    allowedValues: [
      'Lawful Good',
      'Neutral Good',
      'Chaotic Good',
      'Lawful Neutral',
      '(True) Neutral',
      'Chaotic Neutral',
      'Lawful Evil',
      'Neutral Evil',
      'Chaotic Evil'
    ]
  },
  ac: {
    type: Number
  },
  initiative: {
    type: Number // TODO: use simple schema's clean method to convert from string
  },
  speed: {
    type: Number
  },
  hitPoints: {
    type: Number
  },
  hitDice: {
    type: String
  },
  weapons: {
    type: [ String ],
    optional: true
  },
  equipment: {
    type: String,
    optional: true
  },
  traits: {
    type: [ Object ],
    minCount: 1
  },
  'traits.$.name': {
    type: String,
    max: 100
  },
  'traits.$.description': {
    type: String,
    autoform: {
      rows: 3
    }
  },
  proficiency: {
    type: Number, // TODO: use simple schema's clean method to convert from string
    defaultValue: 2,
    // TODO: set up autovalue
  },
  passivePerception: {
    type: Number,
    defaultValue: 10,
    // TODO: set up autovalue. maybe not. research passive perception modifiers
  },
  abilityScores: {
    type: [ Object ],
    minCount: 1,
    maxCount: 1
  },
  'abilityScores.$.scores': {
    type: [ Number ],
    defaultValue: [0, 0, 0, 0, 0, 0], // TODO: fix this messy init
    minCount: 6,
    maxCount: 6
  },
  'abilityScores.$.modifiers': {
    type: [ Number ],
    // TODO: set up autovalues
    minCount: 6,
    maxCount: 6
  },
  // abilityModifiers: {
  //   type: [ String ],
  //   minCount: 6,
  //   maxCount: 6
  // },
  proficiencies: {
    type: [ String ]
  },
  createdAt: {
    type: Date,
    label: 'Created',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Schemas.Groups = new SimpleSchema({
  name: {
    type: String,
    max: 100
  }
});

// Characters.helpers({
//   photoUrl: function() {
//     return '<img style="width: 50px;" src="/cfs/files/images/' + this.image + '">';
//   }
// });

Characters.attachSchema(Schemas.Characters);
Groups.attachSchema(Schemas.Groups);