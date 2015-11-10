Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });

  this.route('groups', {
    path: '/groups',
    waitOn: function() {
      return Meteor.subscribe('groups');
    }
  });
  this.route('addGroup', {
    path: '/groups/addgroup',
  });

  this.route('characters', {
    path: '/characters',
    waitOn: function() {
      return Meteor.subscribe('usersCharacters');
    }
  });
  this.route('insertCharacter', {
    path: '/characters/create'
  });
  this.route('updateCharacter', {
    path: '/characters/:_id/edit',
    data: function() { 
      return Characters.findOne(this.params._id); 
    }
  });
  this.route('displayCharacter', {
  	path: '/characters/:_id',
  	data: function() { 
      return Characters.findOne(this.params._id); 
    }
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('home');
  } else {
    this.next();
  }
}

var goToDashboard = function() {
  if (Meteor.user()) {
    Router.go('characters');
  } else {
    this.next();
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
