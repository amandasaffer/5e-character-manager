Template.groups.greeting = function () {
  return "Bonjour & hello!";
};

Template.groups.events({
  'click .fa-minus-circle': function(e) {
    e.preventDefault();
    var currentId = this._id;
  	Groups.remove(currentId);
  }
});

Template.addGroup.events({
  'click #add-group': function(e){
    e.preventDefault();
    var groupName = $('#groupName').val();

    Groups.insert({
      name: groupName,
      userId: Meteor.userId()
    });

    $('#groupName').val('');
  }
});

if (Meteor.isClient) {
  Template.groups.helpers({
    groups: function() {
      return Groups.find();
    }
  });
}

