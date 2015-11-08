// TODO: resolve
// Template._loginButtonsLoggedInDropdown.events({
//     'click #login-buttons-edit-profile': function(event) {
//         // event.stopPropagation();
//         event.preventDefault();
//         Template._loginButtons.toggleDropdown();
//         Router.go('profileEdit');
//     }
// });


Template.header.events({
	'click .reset-home': function(e) {
		Session.set('homeStatus', 'default');
	}
});