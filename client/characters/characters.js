var calculateModifier = function(abilityScore) {
	var modifier = Math.floor((abilityScore - 10) / 2);
	return modifier;
};

var addPositiveMod = function(num) {
	if(num > 0) {
		num = '+' + num;
	}
	return num;
}

var cleanProficiency = function(text) {
	text = text.replace('(STR)','');
	text = text.replace('(DEX)','');
	text = text.replace('(CON)','');
	text = text.replace('(INT)','');
	text = text.replace('(WIS)','');
	text = text.replace('(CHA)','');

	if(/\s+$/.test(text)) {
		text = text.substr(0, text.length - 1);
	}
	return text;
}

// TODO: combine functions
var checkProficiency = function(array, value) {
	for(i = 0; i < array.length; i++) {
		if(array[i] == value) {
			return true;
		}
	}
}

var inArray = function(array, value) {
	for(i = 0; i < array.length; i++) {
		if(array[i] == value) {
			return true;
		}
	}
}

Template.characters.helpers({
	characters: function() {
		return Characters.find({userId: Meteor.user()._id, name: {"$exists": true }}, {sort: {createdAt: -1}});
	}
});