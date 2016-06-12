/*
 *  Tongue.js, copyright (c) by Dheeraj Joshi
 *  Distributed under an MIT license
 *
 *  It Helps in transforming javascript code written in local languages.
 *  Please feel free to contribute to this repository.
 */
(function(root, factory) {
	'use strict';

	// Universal Module Definition (UMD)
	if (typeof define === 'function' && define.amd) { // AMD
		define('tongue', ['esprima'], factory);
	} else if (typeof exports === 'object') { // CommonJS, Node
		module.exports = factory(require('esprima'));
	} else { // Browser globals (root is window)
		root.tongue = factory(root.esprima);
	}
})(this, function(esprima) {
	'use strict';

	var code,
		options,
		locale,
		map,
		targetCode,
		keyDiff;

	var translations = (function() {

		var MAP = {};

		MAP.en = {};

		MAP.hi = {
			"break": "तोड़",
			"case": "मामला",
			"catch": "पकड़",
			"class": "कक्षा",
			"const": "लगातार",
			"continue": "जारी",
			"debugger": "खोदना",
			"default": "हरबार",
			"delete": "हटा",
			"do": "कर",
			"else": "वरना",
			"export": "निर्यात",
			"extends": "फैली",
			"finally": "आखिरकार",
			"for": "चलाओ",
			"function": "काम",
			"if": "अगर",
			"import": "लाओ",
			"in": "में",
			"instanceof": "उनके",
			"new": "नया",
			"return": "वापसी",
			"super": "बड़े",
			"switch": "परख",
			"this": "उसका",
			"throw": "फेंक",
			"try": "कोशिश",
			"typeof": "प्रकार",
			"var": "मानलो",
			"void": "शून्य",
			"while": "जबकि",
			"with": "साथ",
			"yield": "प्राप्ति",
			"alert": "सावधान",
			"true": "सही",
			"false": "ग़लत",
			"length": "लंबाई",
			"console": "तकती",
			"log": "छापो"
		};

		MAP.cn = {
			"break": "你打破它",
			"case": "案件",
			"catch": "抓住",
			"class": "类",
			"const": "不变",
			"continue": "继续吧",
			"debugger": "挖出",
			"default": "每次",
			"delete": "去掉",
			"do": "做",
			"else": "除此以外",
			"export": "出口",
			"extends": "扩展",
			"finally": "最后",
			"for": "对于",
			"function": "功能",
			"if": "如果",
			"import": "把它",
			"in": "在",
			"instanceof": "他的",
			"new": "新",
			"return": "返回",
			"super": "大",
			"switch": "判断他",
			"this": "他的东西",
			"throw": "丢它",
			"try": "尝试",
			"typeof": "类型",
			"var": "承担",
			"void": "空虚",
			"while": "而",
			"with": "同",
			"yield": "产量",
			"alert": "警报",
			"true": "真正",
			"false": "假",
			"length": "长度",
			"console": "垫",
			"log": "印"
		};

		MAP.pl = {
			"break": "złam",
			"case": "przypadek",
			"catch": "złap",
			"class": "klasa",
			"const": "stała",
			"continue": "kontynuuj",
			"debugger": "odrobaczacz",
			"default": "domyślnie",
			"delete": "usuń",
			"do": "zrób",
			"else": "inaczej",
			"export": "eksportuj",
			"extends": "rozszerz",
			"finally": "w końcu",
			"for": "dla",
			"function": "funkcja",
			"if": "jeżeli",
			"import": "importuj",
			"in": "w",
			"instanceof": "instancja",
			"new": "nowy",
			"return": "zwróć",
			"super": "super",
			"switch": "przełącznik",
			"this": "to",
			"throw": "rzuć",
			"try": "spróbuj",
			"typeof": "typ",
			"var": "zmienna",
			"void": "otchłań",
			"while": "dopóki",
			"with": "z",
			"yield": "dostarcz",
			"alert": "alarm",
			"true": "prawda",
			"false": "fałsz",
			"length": "długość",
			"console": "konsola",
			"log": "loguj"
		};

		return {
			map: MAP
		};
	})();

	var transMap = translations.map,
		inverseMap = {};

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
			trange = { s: range[0] + keyDiff, e: range[1] + keyDiff },
			curlen,
			rlen;

		// Keyword will only be present when doing reverse transformation
		if (token.type !== 'Identifier' && token.type !== 'Keyword') {
			return;
		}
		if (replaceStr) {
			targetCode = replaceRange(targetCode, trange.s, trange.e, replaceStr);
			curlen = range[1] - range[0];
			rlen = replaceStr.length;
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
		version: '0.1.3',
		transform: transform,
		map: transMap
	};
});