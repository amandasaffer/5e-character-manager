// Template.insertCharacter.onRendered = function() {
// };

// Template.updateCharacter.onRendered = function() {
// };

Template.registerHelper("currentFieldValue", function (fieldName) {
  return AutoForm.getFieldValue(fieldName) || 'None';
});

Template.insertCharacter.helpers({
	abilities: function () { 
		return [
			{ name: 'Strength', fieldName: 'abilityScores.0' },
			{ name: 'Dexterity', fieldName: 'abilityScores.1' },
			{ name: 'Constitution', fieldName: 'abilityScores.2' },
			{ name: 'Intelligence', fieldName: 'abilityScores.3' },
			{ name: 'Wisdom', fieldName: 'abilityScores.4' },
			{ name: 'Charisma', fieldName: 'abilityScores.5' }
		];
	}
});