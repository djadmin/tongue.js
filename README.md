# tongue.js
Helps writing JavaScript code in any supported spoken language.

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
```"alert(1);"```

Currently Supported language - Hindi

