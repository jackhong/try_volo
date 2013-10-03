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
	require(['app/view/app', 'app/router'], function(AppView, Workspace) {
    console.log(typeof(AppView));
    console.log(Backbone.VERSION);
    console.log(_.VERSION);
    new AppView();
    new Workspace();
    Backbone.history.start();
  });
});
