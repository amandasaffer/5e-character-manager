Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	// wait on the characters subscription to load
	waitOn: function() {
		return Meteor.subscribe('characters');
	}
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('groups', {path: '/groups', layoutTemplate: 'dashboardLayout'});
  this.route('addGroup', {path: '/groups/addgroup'});
  this.route('characters', {});
  this.route('insertCharacter', {
    path: '/characters/create',
  });
  this.route('updateCharacter', {
    path: '/characters/:_id/edit',
    data: function() { return Characters.findOne(this.params._id); }
  });
	this.route('manageCharacter', {
    path: '/characters/:_id/manage',
    data: function() { return Characters.findOne(this.params._id); }
  });
  this.route('displayCharacter', {
  	path: '/characters/:_id',
  	data: function() { return Characters.findOne(this.params._id); }
  });
});


var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('home');
    pause(); // change to this.next(); eventually
  }
}

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('characters');
    pause(); // change to this.next(); eventually
  }
};

// require login for every page but home
Router.onBeforeAction(requireLogin, {except: ['home']});
// if logged in when visiting home page, re-route to character dashboard
Router.onBeforeAction(goToDashboard, {only: ['home']});
// TODO: figure out why loading template has navbar and how to fix
Router.onBeforeAction('loading');

// if(Meteor.isServer) {
// 	Roles.addUsersToRoles('6ZHyFrf9bwDkJ3cEi', 'admin');
// }
