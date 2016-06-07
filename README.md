# tongue.js [![npm version](https://badge.fury.io/js/tongue.svg)](https://www.npmjs.com/package/tongue) [![Build Status](https://travis-ci.org/djadmin/tongue.js.svg?branch=master)](https://travis-ci.org/djadmin/tongue.js)
Helps writing multilingual JavaScript. Tongue.js transforms JavaScript written in any language to any target language.

Try it out using [tongue.js REPL](https://djadmin.in/tongue.js/)
## Usage

```js
tongue.transform(code, options);
```

## Options

`code` : source code written in any langauge

`locale`: language code of the source. Eg: 'hi'

`map`: provide any custom translations for the locale

`targetLocale`: target language code

## Example
```js
tongue.transform('मानलो ल = 1;', {locale: 'hi'});
```
returns

```"var ल = 1;"```

### Another Example
```js
tongue.transform('警报(1);', {locale: 'cn', map: {'alert': '警报'}});
```
returns
```
"alert(1);"
```

## Note

tongue.js supports both AMD and CommonJS module styles.

## Contributions
Your contributions are always welcome!

## License
Copyright (c) 2016 Dheeraj Joshi
Licensed under the [MIT license](http://opensource.org/licenses/MIT).
