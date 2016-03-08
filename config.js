(function () {
	'use strict';

	// RequireJS configuration
	require.config({
		packages: [{
			name: "codemirror",
			location: "bower_components/codemirror/",
			main: "lib/codemirror"
		}],
		paths: {
			esprima: 'bower_components/esprima/esprima',
			tongue: 'dist/tongue'
		},
		shim: {
			tongue: {
				deps: ['esprima']
			}
		}
	});

	require(['repl']);
})();