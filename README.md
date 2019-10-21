# native-url

This module provides the node [url](http://nodejs.org/api/url.html) api layer over the `whatwg-url` class.

**1.45 KB Gzipped**.

Works both on the server and client.

## Install

`npm i native-url`

## Usage

```
const url = require('native-url');

```

## Apis

Refer the [node url](https://nodejs.org/api/url.html#url_legacy_url_api) docs for detailed api documentation

### url.parse(urlStr, [parseQueryString], [slashesDenoteHost])

Takes a URL string, parses it, and returns a URL object.

### url.format(urlObj)

Take a parsed URL object, and returns a URL string.

### url.resolve(from, to)

Resolves a target url wrt the base url
