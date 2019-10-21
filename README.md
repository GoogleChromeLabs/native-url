# native-url

A lightweight implementation of Node's [url](http://nodejs.org/api/url.html) interface atop the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).

**1.45 KB Gzipped**, works in both Node.js and [modern browsers](https://caniuse.com/#feat=mdn-api_url).

## Installation

```sh
npm i native-url
```

## Usage

```
const url = require('native-url');

url.parse('https://example.com').host // example.com
url.parse('/?a=b', true).query // { a: 'b' }
```

## API

Refer Node's [legacy url documentation](https://nodejs.org/api/url.html#url_legacy_url_api) for detailed API documentation.

### `url.parse(urlStr, [parseQueryString], [slashesDenoteHost])`

Parses a URL string and returns a URL object representation:

```js
url.parse('https://example.com')
// {
//   href: 'http://example.com/',
//   protocol: 'http:',
//   slashes: true,
//   host: 'example.com',
//   hostname: 'example.com',
//   query: {},
//   search: null,
//   pathname: '/',
//   path: '/'
// }

url.parse('/foo?a=b', true).query.a  // "b"
```

### `url.format(urlObj)`

Given a parsed URL object, returns its corresponding URL string representation:

```js
url.format({ protocol: 'https', host: 'example.com' });
// "https://example.com"
```

### `url.resolve(from, to)`

Resolves a target URL based on the provided base URL:

```js
url.resolve('/a/b', 'c');
// "/a/b/c"
url.resolve('/a/b', '/c#d');
// "/c#d"
```
