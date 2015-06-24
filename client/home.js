Template.home.rendered = function(e) {
	$('.navbar').addClass('home-page');
	$('.navbar-brand').addClass('reset-home');
	Session.set('homeStatus', 'default');
	Session.setDefault('homeStatus', 'default');
};

// TODO: look up when to use this vs rendered
// Template.home.onCreated = function(e) {
// 	$('.navbar').removeClass('home-page');
// 	Session.setDefault('homeStatus', 'default');
// };

Template.home.onDestroyed = function(e) {
	// TODO: destroyed doesn't work when redirecting away from template (after login)
	$('.navbar').removeClass('home-page');
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

	'submit #create-new-account' : function(e, t) {
      e.preventDefault();
      var user = t.find('#account-user').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({username: user, password : password}, function(err){
          if (err) {
            alert('error');
          } else {
            Router.go('characters');
          }

        });

      return false;
    }
});

Template.loginForm.events({
	'click .go-back': function(e) {
		Session.set('homeStatus', 'default');
	},

	'submit #login-form' : function(e, t){
		e.preventDefault();
		
		// retrieve the input field values
		var user = t.find('#login-user').value
		, password = t.find('#login-password').value;

		// Trim and validate your fields here.... 

		// If validation passes, supply the appropriate fields to the
		// Meteor.loginWithPassword() function.
		Meteor.loginWithPassword(user, password, function(err){
			if (err) {
			  alert('error!');
			}
			else {
			  // The user has been logged in.
			}
		});
		return false; 
	}
})