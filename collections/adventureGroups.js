Groups = new Meteor.Collection('groups');

Groups.allow({
  insert: function(userId, doc) {
  	// let logged in user insert
    if (userId) {
      return true;
    }
  },

  update: function(userId, doc) {
  	// let collection owner modify
    return doc.userId === userId;
  },

  remove: function(userId, doc) {
  	// let collection owner remove
    return doc.userId === userId;
  }
})
