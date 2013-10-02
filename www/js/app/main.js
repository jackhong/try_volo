define(function (require) {
	// Load any app-specific modules
	// with a relative require call,
	// like:
	// var util = require('./util');
	require(['app/test'], function(Bob) {
		console.log('Hello world');
		Bob.test();
	});

	/*require(['app/collections/todos'], function(Todos) {
		console.log(JSON.stringify(Todos));

	});*/
	require(['app/view/app'], function(AppView) {
    console.log(typeof(AppView));
    new AppView();
  });
});
