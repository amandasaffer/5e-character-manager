UI.registerHelper('selected', function(key, value) {
  return key == value? {selected:'selected'}: '';
});