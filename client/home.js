Template.home.rendered = function(e) {
	$('.navbar').addClass('home-page');
	Session.setDefault('homeStatus', 'default');
};

Template.home.helpers({
	default: function() {
		return Session.get('homeStatus') === 'default';
	},

	notMember: function() {
		return Session.get('homeStatus') === 'notMember';
	},

	alreadyMember: function() {
		return Session.get('homeStatus') === 'alreadyMember';
	}
});

Template.intro.events({
	'click .signup': function(e) {
		// $('.container').fadeOut();
		Session.set('homeStatus', 'notMember');
	},

	'click .login': function(e) {
		// $('.container').fadeOut();
		Session.set('homeStatus', 'alreadyMember');
	}
});

Template.createAccount.events({
	'click .go-back': function(e) {
		Session.set('homeStatus', 'default');
	},
});