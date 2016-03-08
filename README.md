# tongue.js
Helps writing JavaScript code in any supported spoken language.

[tongue.js REPL](https://djadmin.in/tongue.js/)
## Usage

```js
tongue.transform(code, options);
```

## Options

`code` : source code written in any langauge

`locale`: language code of the source. Eg: 'hi'

`map`: provide any custom translations for the locale


## Example
```js
tongue.transform('मानलो ल = 1;', {locale: 'hi'};
```
returns

```"var ल = 1;"```

### Another Example
```js
tongue.transform('सावधान(1);', {locale: 'hi', map: {'alert': 'सावधान'}})};
```
returns
```
"alert(1);"
```

### tongue.js supports both AMD and CommonJS module styles.

#### Currently Supported language - Hindi

## Contributions
Your contributions are always welcome!

## License
Copyright (c) 2016 Dheeraj Joshi
Licensed under the [MIT license](http://opensource.org/licenses/MIT).
