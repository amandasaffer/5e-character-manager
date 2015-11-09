// Template.insertCharacter.onRendered = function() {
// };

// Template.updateCharacter.onRendered = function() {
// };

Template.registerHelper("currentFieldValue", function (fieldName) {
  return AutoForm.getFieldValue(fieldName) || 'None';
});