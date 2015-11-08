Schemas = {};

weapon = new SimpleSchema({
  name: {
    type: String
  },
  atkBonus: {
    type: String
  },
  damage: {
    type: String
  }
});

Schemas.Characters = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },
  level: {
    type: Number,
    min: 1,
    max: 99 // is this necessary?
  },
  background: {
    type: String,
    allowedValues: [
      'Acolyte',
      'Charlatan',
      'Criminal',
      'Entertainer',
      'Folk Hero',
      'Guild Artisan',
      'Hermit',
      'Noble',
      'Outlander',
      'Sage',
      'Sailor',
      'Soldier',
      'Urchin'
    ]
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
    type: [weapon],
    optional: true,
    maxCount: 3
  },
  equipment: {
    type: String,
    optional: true,
    autoform: {
      rows: 3
    }
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
  proficiencyBonus: {
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
    type: [ Number ],
    minCount: 6,
    maxCount: 6,
    min: 0
  },
  proficiencies: {
    type: [ String ],
    autoform: {
      rows: 3
    }
  },
  updatedAt: {
    type: Date,
    label: 'Created',
    autoValue: function () {
      return new Date();
    }
  },
  userId: {
    type: String,
    autoValue: function() {
      return this.userId;
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