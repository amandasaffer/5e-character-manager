Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        // event.stopPropagation();
        event.preventDefault();
        Template._loginButtons.toggleDropdown();
        Router.go('profileEdit');
    }
});