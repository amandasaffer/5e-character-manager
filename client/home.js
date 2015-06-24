Template.home.rendered = function(e) {
	// TODO: DISPLAY ACCOUNT INFO IF LOGGED IN
	$('.navbar').addClass('home-page');
	$('.navbar-brand').addClass('reset-home');
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

	// TODO: NOT WORKING
	'submit #create-new-account' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
          }

        });

      return false;
    }
});

// TODO: NOT WORKING
Template.loginForm.events({
	'submit #login-form' : function(e, t){
		e.preventDefault();
		
		// retrieve the input field values
		var email = t.find('#login-email').value
		, password = t.find('#login-password').value;

		// Trim and validate your fields here.... 

		// If validation passes, supply the appropriate fields to the
		// Meteor.loginWithPassword() function.
		Meteor.loginWithPassword(email, password, function(err){
			if (err)
			  // The user might not have been found, or their passwword
			  // could be incorrect. Inform the user that their
			  // login attempt has failed. 
			else
			  // The user has been logged in.
			});
		return false; 
	}
})