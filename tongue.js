/*
 *	Tongue.js, copyright (c) by Dheeraj Joshi
 *	Distributed under an MIT license
 *
 *	It Helps in writing javascript code in any local language.
 *	Please feel free to contribute to this repository.
 */
(function (root, factory) {
	'use strict';

	// Universal Module Definition (UMD)
	if (typeof define === 'function' && define.amd) {	// AMD
        define(['esprima'], factory);
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

	var translations = Translations.map;

	// Helpers
	function invert(obj) {
		var inverted = {};
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				inverted[obj[i]] = i;
			}
		}
		return inverted;
	};

	function replaceRange(str, start, end, substitute) {
		return str.substring(0, start) + substitute + str.substring(end);
	};

	// Parser
	function parse(token) {
		var str = token.value,
			replaceStr = map[str],
			range = token.range,
			trange = {s: range[0] + keyDiff, e: range[1] + keyDiff},
			curlen,
			rlen;

			if (token.type !== 'Identifier') return;
			if (replaceStr) {
				targetCode = replaceRange(targetCode, trange.s,  trange.e, replaceStr);
				curlen = range[1] - range[0], rlen = replaceStr.length;
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
		code = src, options = options;
		locale = (options && options.locale) || 'en';
		map = invert((options && options.map) || translations[locale]);

		scan();

		return targetCode;
	};

	return {
		version: '0.1.0',
		transform: transform
	};
});