// Template.insertCharacter.onRendered = function() {
// };

// Template.updateCharacter.onRendered = function() {
// };

Template.registerHelper("currentFieldValue", function (fieldName) {
  return AutoForm.getFieldValue(fieldName) || 'None';
});

Template.registerHelper("fieldHasValue", function (fieldName) {
  return AutoForm.getFieldValue(fieldName);
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

Template.infoPanel.helpers({
	fieldValue: function() {
		return AutoForm.getFieldValue(this.fieldName, 'insertCharacter');
	},
	paragraph: function() {
		return 'Lorem ipsum dolor sit amet, consec tetur adipisicing elit sed do lorem ipsum dolor sit amet eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
	}
});