define([
	'tongue',
	'codemirror',
	'codemirror/mode/javascript/javascript',
	'codemirror/addon/selection/active-line'
], function (tongue, CodeMirror) {
	'use strict';

	var locale;

	function initEditor() {
		return CodeMirror.fromTextArea(document.getElementById("code"), {
			lineNumbers: true,
			styleActiveLine: true,
			mode: 'javascript',
			indentUnit: 4
		});
	}

	var dfn; // HACK for remove debounced event listener
	function debounce(func, wait, immediate) {
		var timeout;
		dfn = function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if ( !immediate ) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait || 200);
			if ( callNow ) {
				func.apply(context, args);
			}
		};
		return dfn;
	};

	function setLocale(val) {
		var code = editor.getValue();
		var eng = tongue.transform(code, { locale: locale });
		locale = window.locale = val || 'hi'; // CodeMirror looks for locale on window
		var targetCode = tongue.transform(eng, { targetLocale: locale });
		editor.setValue(targetCode.trim());
	}

	function setInitialValue() {
		var elem = document.getElementById('sample-code-' + locale);
		var sampleCode = elem && elem.innerHTML || '';
		sampleCode = sampleCode.trim();
		editor.setValue(sampleCode);
	}

	function compile () {
		var code = editor.getValue();
		var tranformed = tongue.transform(code, { locale: locale });
		eval(tranformed);
	}

	function enableAutoRun() {
		editor.on('change', debounce(compile, 500));
		var executeBtn = document.getElementById('execute');
		executeBtn.style.visibility = 'hidden';
	}

	function disableAutoRun() {
		editor.off('change', dfn);
		var executeBtn = document.getElementById('execute');
		executeBtn.style.visibility = 'visible';
	}

	function setTheme(option) {
		if (option === 'dark') {
			editor.setOption('theme', 'monokai');
		} else {
			editor.setOption('theme', 'default');
		}

	}

	function addEventListeners() {
		// Theme Option
		document.getElementById('theme').addEventListener('change', function () {
			if (this.checked) {
				setTheme('dark');
			} else {
				setTheme('light')
			}
		});

		// Auto Run Option
		document.getElementById('autorun').addEventListener('change', function () {
			if (this.checked) {
				enableAutoRun();
			} else {
				disableAutoRun();
			}
		});

		// Execute Code
		document.getElementById('execute').addEventListener('click', function () {
			compile();
		});

		// Log cleaner
		document.getElementById('logClear').addEventListener('click', function () {
			document.getElementById('logger').innerHTML = '';
		})

		// Set Locale
		document.getElementById('setLocale').addEventListener('change', function () {
			setLocale(this.value);


		});
	}

	// Set default locale
	locale = window.locale = 'hi';

	var editor = initEditor();
	window.editor = editor;
	addEventListeners();
	setInitialValue();
	setTheme('dark');
	enableAutoRun();
	compile();

});

(function () {
	var consoleRef = console;
    var old = console.log;
    var logger = document.getElementById('logger');
    var template = '\
    	<span class="log">\
	        <i class="fa fa-terminal"></i>\
	        <span class="log-msg">{placeholder}</span>\
	    </span>';
	// Override console.log()
    console.log = function (message) {
        var log;
        if (typeof message == 'object') {
            log = (JSON && JSON.stringify ? JSON.stringify(message) : message);
        } else {
            log = message;
        }
        logger.innerHTML += template.replace('{placeholder}', log);

        // Fallback
        old.apply(consoleRef, arguments); // console reference is necessary
    };

    var clear = function () {
    	logger.innerHTML = "";
    };
})();