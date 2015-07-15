Meteor.subscribe('groups');
Meteor.subscribe('characters');
Meteor.subscribe('user-characters');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Template.dashboard_layout.events({
  'click .groups': function(e) {
    Router.go('groups');
  },
  'click .characters': function(e) {
    Router.go('characters');
  },
});
