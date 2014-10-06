Meteor.subscribe('groups');
Meteor.subscribe('characters');
Meteor.subscribe('user-characters');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
