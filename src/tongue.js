/*
 *	Tongue.js, copyright (c) by Dheeraj Joshi
 *	Distributed under an MIT license
 *
 *	It Helps in transforming javascript code written in local languages.
 *	Please feel free to contribute to this repository.
 */
(function (root, factory) {
	'use strict';

	// Universal Module Definition (UMD)
	if (typeof define === 'function' && define.amd) {	// AMD
		define('tongue', ['esprima'], factory);
	} else if (typeof exports === 'object') {	// CommonJS, Node
		module.exports = factory(require('esprima'));
	} else { // Browser globals (root is window)
		root.tongue = factory(root.esprima);
	}
})(this, function (esprima) {
	'use strict';

	var code,
		options,
		locale,
		map,
		targetCode,
		keyDiff;

	var translations = (function () {

		var MAP = {};

		MAP.en = {};

		MAP.hi = {
			"alert": "सावधान",
			"show": "निर्देश",
			"true": "सही",
			"function": 'काम',
			"var": 'मानलो',
			"if": 'अगर',
			"console": 'दिलासा',
			"log": 'लघुगणक',
			"new": 'नया',
			"for": 'चलाओ',
			"length": 'लंबाई'
		};

		MAP.cn = {
			"alert": '警报',
			"show": '显示',
			"true": '真正',
			"function": '功能',
			"var": '承担',
			"if": '如果',
			"console": '终奌站',
			"log": '打印',
			"new": '新',
			"for": '对于',
			"length": '长度'
		};

		return {
			map: MAP
		};
	})();

	var transMap = translations.map, inverseMap = {};

	// Helpers
	function invert(obj) {
		var inverted = {};
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				inverted[obj[i]] = i;
			}
		}
		return inverted;
	}

	function replaceRange(str, start, end, substitute) {
		return str.substring(0, start) + substitute + str.substring(end);
	}

	// Generate Reverse Mapping
	for (var loc in transMap) {
		inverseMap[loc] = invert(transMap[loc]);
	}

	// Parser
	function parse(token) {
		var str = token.value,
			replaceStr = map[str],
			range = token.range,
			trange = {s: range[0] + keyDiff, e: range[1] + keyDiff},
			curlen,
			rlen;

			if (token.type !== 'Identifier') { return; }
			if (replaceStr) {
				targetCode = replaceRange(targetCode, trange.s,  trange.e, replaceStr);
				curlen = range[1] - range[0]; rlen = replaceStr.length;
				keyDiff = keyDiff + (rlen - curlen);
			}
	}

	// Tokenizer
	function scan() {
		var tokens = esprima.tokenize(code, { range: true });
		targetCode = code;
		keyDiff = 0;
		tokens.forEach(parse);
	}

	// Transpiler
	function transform(src, options) {
		code = src;
		options = options || {};
		locale = options.locale || 'en';
		map = options.map ? invert(options.map) : inverseMap[locale];
		// Support reverse transformation from English to other languages
		// TODO: Add support for transforming from A to B where A, B is other than English
		if (options.targetLocale) {
			map = transMap[options.targetLocale];
		}
		// start scanning
		try {
			scan();
		} catch (e) {
			return false;
		}

		return targetCode;
	}

	return {
		version: '0.1.1',
		transform: transform,
		map: transMap
	};
});