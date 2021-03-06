// global object that allows app to reference all the standard classes, backgrounds, races, and alignments
standardCharacter = {
  classes: [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard'
  ],
  backgrounds: [
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
  ],
  races: [
    'Dwarf',
    'Elf',
    'Halfling',
    'Human',
    'Dragonborn',
    'Gnome',
    'Half-Elf',
    'Half-Orc',
    'Tiefling'
  ],
  alignments: [
    'Lawful Good',
    'Neutral Good',
    'Chaotic Good',
    'Lawful Neutral',
    '(True) Neutral',
    'Chaotic Neutral',
    'Lawful Evil',
    'Neutral Evil',
    'Chaotic Evil'
  ],
  abilityScores: [
    { name: 'Strength', abbrev: 'STR', index: 0 },
    { name: 'Dexterity', abbrev: 'DEX', index: 1 },
    { name: 'Constitution', abbrev: 'CON', index: 2 },
    { name: 'Intelligence', abbrev: 'INT', index: 3 },
    { name: 'Wisdom', abbrev: 'WIS', index: 4 },
    { name: 'Charisma', abbrev: 'CHA', index: 5 }
  ],
  saveProficiencies: [
    { name: 'Strength', abbrev: 'STR', index: 0 },
    { name: 'Dexterity', abbrev: 'DEX', index: 1 },
    { name: 'Constitution', abbrev: 'CON', index: 2 },
    { name: 'Intelligence', abbrev: 'INT', index: 3 },
    { name: 'Wisdom', abbrev: 'WIS', index: 4 },
    { name: 'Charisma', abbrev: 'CHA', index: 5 }
  ],
  skillProficiencies: [
    { name: "Acrobatics", attribute: "DEX", index: 1 },
    { name: "Animal Handling", attribute: "WIS", index: 4 },
    { name: "Arcana", attribute: "INT", index: 3 },
    { name: "Athletics", attribute: "STR", index: 0 },
    { name: "Deception", attribute: "CHA", index: 5 },
    { name: "History", attribute: "INT", index: 3 },
    { name: "Insight", attribute: "WIS", index: 4 },
    { name: "Intimidation", attribute: "CHA", index: 5 },
    { name: "Investigation", attribute: "INT", index: 3 },
    { name: "Medicine", attribute: "WIS", index: 4 },
    { name: "Nature", attribute: "INT", index: 3 },
    { name: "Perception", attribute: "WIS", index: 4 },
    { name: "Performance", attribute: "CHA", index: 5 },
    { name: "Persuasion", attribute: "CHA", index: 5 },
    { name: "Religion", attribute: "INT", index: 3 },
    { name: "Sleight of Hand", attribute: "DEX", index: 1 },
    { name: "Stealth", attribute: "DEX", index: 1 },
    { name: "Survival", attribute: "WIS", index: 4 }
  ]
}
