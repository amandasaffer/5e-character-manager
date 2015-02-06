Groups = new Meteor.Collection('groups');

Groups.allow({
  insert: function(userId, doc) {
  	// let logged in user insert
    if (userId) {
      return true;
    }
  },

  update: function(userId, doc) {
    var loggedInUser = Meteor.user();
    if(Roles.userIsInRole(loggedInUser, 'admin')) {
      return true;
    }

    return doc.userId === userId;
  },

  remove: function(userId, doc) {
    var loggedInUser = Meteor.user();
    if(Roles.userIsInRole(loggedInUser, 'admin')) {
      return true;
    }

    return doc.userId === userId;
  }
})
