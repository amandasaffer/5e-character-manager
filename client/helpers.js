UI.registerHelper('selected', function(key, value) {
  return key == value? {selected:'selected'}: '';
});

UI.registerHelper('isProficient', function(base, modifier, key, value) {
	console.log(key);
	console.log(value);
	console.log(modifier);
	console.log(base);
	return 0;

	// if value is at any index in key, 
	// then add modifier to base and return that number
});