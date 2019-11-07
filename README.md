# native-url

A lightweight implementation of Node's [url](http://nodejs.org/api/url.html) interface atop the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).

**~1.6 KB Gzipped**, works in both Node.js and [modern browsers](https://caniuse.com/#feat=mdn-api_url).

### Stats from a basic hello world application

- Normal Build: _13.4 kB_
- With native-url: _5.95 kB_

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
url.parse('https://example.com');
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

url.parse('/foo?a=b', true).query.a; // "b"
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

## Using it with webpack

When you use the `url` module, webpack bundles [`node-url`](https://github.com/defunctzombie/node-url) for the browser. You can alias webpack to use `native-url` instead:

By aliasing the `url` module to `native-url` in your build tool, you can save around 7.5kB.

In you `webpack.config.js`

```
{
  alias: {
    url: 'native-url'
  }
}
```

**The result is functionally equivalent in Node 7+ and all modern browsers (Chrome 61+, Firefox 60+, Safari 10+, Edge 16+ and anything else with ES Modules support).**

## Using it with older browsers

`native-url` relies on the [whatwg-url](https://developer.mozilla.org/en-US/docs/Web/API/URL) class to work. For browsers that do not support `URL` a [polyfill](https://www.npmjs.com/package/url-polyfill) can be added.

Fortunately, there is an easier way to address this problem. All [browsers that support `type=module` scripts](https://caniuse.com/#feat=url) have the `URL` class implemented. So you can load the url-polyfill to target only nomodule browsers

`<script nomodule src="url-polyfill.js"></script>`
