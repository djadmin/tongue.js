var assert = require('assert');
var tongue = require('./src/tongue');
var path = require('path');

describe('tongue', function() {
	it('version should be same as defined in package.json', function () {
		var pkg = require(path.join(__dirname, 'package.json'));
		assert.equal(pkg.version, tongue.version);
	});

	it('should transform custom map given for the locale', function () {
		var res = tongue.transform('सावधान(1);', {locale: 'hi', map: {'alert': 'सावधान'}});
		assert.equal(res, "alert(1);");
		res = tongue.transform('मानलो ल = 1;', {locale: 'hi'});
		assert.equal(res, "var ल = 1;");
	});

	it('should convert program into target locale', function () {
		var res = tongue.transform('alert(1);', {targetLocale: 'hi'});
		assert.equal(res, "सावधान(1);");
	})
});
