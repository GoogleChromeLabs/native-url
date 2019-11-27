/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import parse from './parse';
import format from './format';
import { BASE_URL, PROTOCOL, HOST } from './constants';

const resolveProtocolRegex = /^([a-z0-9.+-]*:\/\/\/)([a-z0-9.+-]:\/*)?/i;
const slashedProtocols = /https?|ftp|gopher|file/;

export function resolve(fromUrl, toUrl) {
  let parsedFrom = typeof fromUrl === 'string' ? parse(fromUrl) : fromUrl;
  fromUrl = typeof fromUrl === 'object' ? format(fromUrl) : fromUrl;
  let parsedTo = parse(toUrl);
  let prefix = '';

  // Handle incomplete urls without slashes Eg: foo:a/b
  if (parsedFrom.protocol && !parsedFrom.slashes) {
    prefix = parsedFrom.protocol;

    fromUrl = fromUrl.replace(parsedFrom.protocol, '');
    prefix += toUrl[0] === '/' || fromUrl[0] === '/' ? '/' : '';
  }

  if (prefix && parsedTo.protocol) {
    prefix = '';
    if (!parsedTo.slashes) {
      prefix = parsedTo.protocol;
      toUrl = toUrl.replace(parsedTo.protocol, '');
    }
  }

  // Handle http:///xyz urls
  const protocolMatch = fromUrl.match(resolveProtocolRegex);
  if (protocolMatch && !parsedTo.protocol) {
    // protocolMatch[2] handles - file:///C:/DEV/Haskell/lib/HXmlToolbox-3.01/examples/
    prefix = protocolMatch[1] + (protocolMatch[2] || '');
    fromUrl = fromUrl.substr(prefix.length);

    // :/// -> :// If toUrl is of the form //xyz
    if (/^\/\/[^/]/.test(toUrl)) prefix = prefix.slice(0, -1);
  }

  const normalizedFromUrl = new URL(fromUrl, BASE_URL + '/');
  let resolved = new URL(toUrl, normalizedFromUrl)
    .toString()
    .replace(BASE_URL, '');

  // Remove/replace the protocol if the URL class has added it
  let actualProtocol = parsedTo.protocol || parsedFrom.protocol;
  actualProtocol += parsedFrom.slashes || parsedTo.slashes ? '//' : '';
  if (!prefix && actualProtocol) {
    resolved = resolved.replace(PROTOCOL, actualProtocol);
  } else if (prefix) {
    resolved = resolved.replace(PROTOCOL, '');
  }

  // Remove unwanted trailing slash
  if (
    !slashedProtocols.test(resolved) &&
    !~toUrl.indexOf('.') &&
    fromUrl.slice(-1) !== '/' &&
    toUrl.slice(-1) !== '/' &&
    resolved.slice(-1) === '/'
  ) {
    resolved = resolved.slice(0, -1);
  }

  // If prefix remove the leading slash
  if (prefix) {
    resolved = prefix + (resolved[0] === '/' ? resolved.substr(1) : resolved);
  }

  return resolved;
}

export function resolveObject(fromUrl, toUrl) {
  return parse(resolve(fromUrl, toUrl));
}
