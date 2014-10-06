Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	// wait on the characters subscription to load
	waitOn: function() { 
		return Meteor.subscribe('characters'); 
	}
});

// map some routes motherfucker
Router.map(function() {
  this.route('home', {path: '/'});
  this.route('groups', {path: '/groups'});
  this.route('addGroup', {path: '/groups/addgroup'});
  this.route('characters');
  this.route('createCharacter', {path: '/characters/create'});
  this.route('editCharacter', {
    path: '/characters/:_id/edit',
    data: function() { return Characters.findOne(this.params._id); }
  });
  this.route('displayCharacter', {
  	path: '/characters/:_id',
  	data: function() { return Characters.findOne(this.params._id); }
  });
});


// turn on the loading template before the route completes
Router.onBeforeAction('loading');

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
}

// require login for every page but home
Router.onBeforeAction(requireLogin, {except: ['home']});

if(Meteor.isServer) {
	Roles.addUsersToRoles('6ZHyFrf9bwDkJ3cEi', 'admin');
}

if (Meteor.isClient) { 
	Accounts.ui.config({ 
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});
}